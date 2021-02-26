import React from 'react'
import axios from 'axios'
import {Upload, Modal, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons'

import Notifications from '../../../commons/Notifications'


function ImageUpload(props) {
    const [previewVisible, setPreviewVisible] = React.useState(false)
    const [previewImage, setPreviewImage] = React.useState('')
    const [previewTitle, setPreviewTitle] = React.useState('')
    const [imagePath, setImagePath] = React.useState(props.image);
    const [fileList, setFileList] = React.useState(props.default === '' ? [] : props.default.map((v,i)=> {
        return {
            uid: i + 1,
            name: v.split("/")[3],
            status: 'done',
            url: v
        }        
    }))

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    }

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewVisible(true)
        setPreviewImage(file.url || file.preview)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    } 

    const handleCancel = () => setPreviewVisible(false);
      
  
    const options = {
        onPreview: (file) => {handlePreview(file)},
        onRemove: file => {
        axios.delete(file.url).then((response) => {
            if(response.data.success) {
                const index = fileList.indexOf(file);
                const newFileList = fileList.slice();
                const newImagePath = imagePath.slice();
                newImagePath.splice(index, 1);
                newFileList.splice(index, 1);
                setFileList(newFileList);
                setImagePath(newImagePath);
            }
            Notifications(response.data);
        });
        },    
        listType: "picture-card",
        beforeUpload:  (file) => {
            const isFileType = (file.type === "image/jpeg") || (file.type === "image/png");
            if(isFileType) {
            const formData = new FormData();
            formData.append('file', file);
            axios.post("/api/images", formData).then(response => {
                const newData = {
                        uid: fileList.length + 1,
                        name: file.name,
                        status: 'done',
                        url: `/api/images/${response.data.url}`
                }
                const newImagePath = [...imagePath, newData.url];
                setFileList([...fileList, newData]);
                setImagePath(newImagePath)
                props.setImage({image: newImagePath});
                
            })
            } else message.error('jpeg나 png인 이미지 파일 형식만 업로드 가능합니다.');
            
            return false;
        },
        fileList
    };
    
    return (
        <div>
            <Upload {...options}>
            {fileList.length < 3 && (
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                </div>
            )}
            </Upload>
        
            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="preview" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    )
}

export default React.memo(ImageUpload)
