import React from 'react'
import axios from 'axios'
import { useForm, Controller } from "react-hook-form";

import { Button, Space, message, Tooltip } from 'antd';
import {AppstoreOutlined, ArrowDownOutlined} from '@ant-design/icons'

import { Editor } from 'react-draft-wysiwyg';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import Notifications from '../../../commons/Notifications'
import Form from './Form';



import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';


function Edit(props) {
    const { handleSubmit, control, errors } = useForm();
    const [errorCheck, setErrorCheck] = React.useState({
        title :  { error: false, msg: null},
        info :  { error: false, msg: null},
        color :  { error: false, msg: null},
        style :  { error: false, msg: null},
        area :  { error: false, msg: null},
        division :  { error: false, msg: null},
        section :  { error: false, msg: null}
    });
    const [editorState, setEditorState] = React.useState(() => EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(props.row.content).contentBlocks)));
    const [image, setImage] = React.useState({});
    const [editorImage, setEditorImage] = React.useState([]);

    const onSubmit = data => {
        data['_id'] = props.row._id
        data[Object.keys(image)[0]] = Object.values(image)[0];
        axios.patch(`/api/cases/${props.row._id}`, data).then(response => {
            if(response.data.success) {
                const oldData = props.dataSource;
                const newData = oldData.map(r => {
                    (r._id === data._id) ? console.log('equal') : console.log('not equal');
                    return (r._id === data._id) ? data : r
                })
                
                props.setDataSource([...newData]);
                props.setView('list');
                props.setRow({});
            }
            Notifications(response.data);
        });
    }
    
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    const uploadImageCallBack =  (file) => {
        return new Promise(
          (resolve, reject) => {
            const isFileType = (file.type === "image/jpeg") || (file.type === "image/png");
            if (isFileType) {
                let uploadedImages = editorImage;
                const formData = new FormData();
                formData.append('file', file);
                axios.post("/api/images", formData).then((response) => {
                    const imageObject = { file: file, localSrc: `/api/images/${response.data.url}`}
                    uploadedImages.push(imageObject);
                    setEditorImage(uploadedImages)
                    resolve({ data: { link: imageObject.localSrc } });
                })        
            } else {
                reject(message.error('jpeg나 png인 이미지 파일 형식만 업로드 가능합니다.'))
            }
            
          }
        );
    }
    
    React.useEffect(() => {
        setImage({image : props.row.image});
    }, [props.row.image])

    React.useEffect(() => {
        const newData = {
            title : errors.title ? { error: true, msg: '입력해주세요' } : { error: false, msg: null},
            info : errors.info ? { error: true, msg: '입력해주세요' } : { error: false, msg: null},
            color : errors.color ? { error: true, msg: '입력해주세요' } : { error: false, msg: null},
            style : errors.style ? { error: true, msg: '입력해주세요' } : { error: false, msg: null},
            area : errors.area ? { error: true, msg: '입력해주세요' } : { error: false, msg: null},
            division : errors.division ? { error: true, msg: '입력해주세요' } : { error: false, msg: null},
            section : errors.section ? { error: true, msg: '입력해주세요' } : { error: false, msg: null}
        }

        setErrorCheck(newData);
   
    }, [errors.title,errors.info,errors.color,errors.style,errors.area,errors.division,errors.section])
    
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div id="admin-cases-edit-buttons">
                <Space>
                    <Tooltip title="목록">
                        <Button onClick={()=>{props.setView('list')}} shape="round" icon={<AppstoreOutlined />} />
                    </Tooltip>
                    <Tooltip title="저장">
                        <Button htmlType="submit" shape="round" icon={<ArrowDownOutlined />} />
                    </Tooltip>
                </Space>
            </div>
            
            <div id="admin-cases-edit-container">
                <div id="admin-cases-edit-content">
                        {/* Form Data */}
                        <div id="admin-cases-edit-form">
                            {Object.keys(image).length !== 0 && 
                                <Form control={control} errors={errors} errorCheck={errorCheck} image={image} setImage={setImage} default={props.row} />
                            }
                        </div>

                        {/* Editor */}
                        <div id="admin-cases-edit-editor">
                            <Controller name="content" control={control} defaultValue={props.row.content}  render={({onChange}) => (
                                <Editor
                                    toolbar={{ 
                                        options: ['inline',  'fontSize', 'list', 'textAlign', 'colorPicker', 'emoji', 'image', 'history'],
                                        inline: { options: ['bold', 'italic', 'underline', 'strikethrough'] },
                                        list: { inDropdown: true}, 
                                        textAlign: { inDropdown: true },
                                        history: { inDropdown: false },
                                        image: { uploadCallback: uploadImageCallBack, previewImage: true, 
                                                defaultSize: {height: '400',width: '500'},
                                                inputAccept: 'image/jpeg,image/jpg,image/png'}
                                    }} 
                                    toolbarStyle={{ border: '2px solid #f1f1f1', padding: '6px 5px 0', borderRadius: '4px'}}
                                    placeholder="내용을 작성해주세요."
                                    localization={{ locale: 'ko' }}
                                    editorState={editorState}
                                    onChange={() => onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
                                    onEditorStateChange={onEditorStateChange}
                                />
                            )} />
                        </div>
                </div>
            </div>
        </form>
        </>
    )
}

export default React.memo(Edit)
