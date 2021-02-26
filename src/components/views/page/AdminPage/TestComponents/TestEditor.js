import React from 'react'
import { useForm, Controller } from "react-hook-form";

import { Button, Space, Row, Col } from 'antd';

import { Editor } from 'react-draft-wysiwyg';
import {EditorState} from 'draft-js';
import { convertToHTML } from 'draft-convert';
import Form from './TestForm';
// import DOMPurify from 'dompurify';

import './style.css';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';


                          
function TestEditor(props) {
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
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
    const [convertedContent,setConvertedContent] = React.useState()
    const [image, setImage] = React.useState({});
   
    const onSubmit = data => {
        data[Object.keys(image)[0]] = Object.values(image)[0];
        
        console.log(JSON.parse(JSON.stringify(data)));
        /* const oldData = [...props.dataSource];
        const newData = JSON.parse(JSON.stringify(data));
     
        
        props.setDataSource([...oldData, newData]);
        props.setView('list'); */
    }
    
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        convertContentToHTML();
    };

    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
    }
   
   /*  const createMarkup = (html) => {
        return  {
          __html: DOMPurify.sanitize(html)
        }
    } */
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
            <div style={{ width: '80%'}}>
                <Row>
                    <Col span={24} style={{border: "2px solid #e6e6e6", borderRadius: "1rem",  padding: '5px'}}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col span={24} style={{padding: '0.3rem'}}>
                                    <Form control={control} errors={errors} errorCheck={errorCheck} setImage={setImage} />
                                </Col>
                            </Row>

                            {/* Editor */}
                            <Controller name="content" control={control} defaultValue=""  render={({onChange}) => (
                                <Editor
                                    editorStyle={{backgroundColor: "white", border: '1px solid #f1f1f1', padding: '5px', borderRadius: '2px', minHeight: '60vh', maxHeight: '60vh', overflow: 'auto'}}
                                    // 툴바 설정
                                    toolbar={{ list: { inDropdown: true }, textAlign: { inDropdown: true },
                                                link: { inDropdown: true }, history: { inDropdown: false }
                                            }} 
                                    toolbarStyle={{ border: '2px solid #f1f1f1', padding: '5px', borderRadius: '2px' }}
                                    placeholder="내용을 작성해주세요."
                                    localization={{ locale: 'ko' }}
                                    editorState={editorState}
                                    onChange={() => onChange(convertedContent)}
                                    onEditorStateChange={(editorState) => onEditorStateChange(editorState)}
        
                                />
                            )} />

                            <Space>
                                <input type="submit" />
                                <Button onClick={()=>{props.setView('list')}}>
                                    목록
                                </Button>
                            </Space>
                        </form>
                    </Col>
                    {/* <Col span={24} style={{border: "2px solid #e6e6e6", borderRadius: "2px",  padding: '5px'}}>
                        <div dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
                    </Col> */}
                </Row>
            </div>
            
        </>

    )
}

export default React.memo(TestEditor)