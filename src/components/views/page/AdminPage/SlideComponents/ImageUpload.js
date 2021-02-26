import React from 'react'
import axios from 'axios'
import {Upload, Modal, message, InputNumber, Button, Tooltip, Space, Form} from 'antd';

import {PlusOutlined, CheckOutlined} from '@ant-design/icons'

import Notifications from '../../../commons/Notifications'


function ImageUpload(props) {
    /**
     * props : 
     * dataSource : Object { no: Number : 1, image : Array, limit: Number : 1 }
     * setDataSource : function
     */
    const [previewVisible, setPreviewVisible] = React.useState(false)
    const [previewImage, setPreviewImage] = React.useState('')
    const [previewTitle, setPreviewTitle] = React.useState('')

    const [limit, setLimit] = React.useState(props.dataSource.limit);
    const [imagePath, setImagePath] = React.useState(props.dataSource.image);
    const [fileList, setFileList] = React.useState(props.dataSource.image.length === 0 ? [] : props.dataSource.image.map((v,i)=> {
        return {
            uid: i + 1,
            name: v.split("/")[3],
            status: 'done',
            url: v
        }        
    }))
    

    const onSubmit = data => {
        data['image'] = imagePath;
       
        axios.post('/api/slides', data).then(response => {
            if(response.data.success) {
                props.setDataSource(response.data.data)
                window.scrollTo(0, 0);
            }
            Notifications(response.data);
        });

    }

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
                })
            } else message.error('jpeg나 png인 이미지 파일 형식만 업로드 가능합니다.');
            
            return false;
        },
        fileList
    };
    
    return (
        <div style={{width: '100%'}}>
            <Form name="basic" onFinish={onSubmit} initialValues={{limit:limit}}>
                <div id="admin-cases-list-add">
                    <Space>
                        <Tooltip title="이미지 개수">
                            <Form.Item name="limit">
                                <InputNumber  min={props.dataSource.image.length} max={10} onChange={setLimit} />
                            </Form.Item>
                            
                        </Tooltip>
                        <Form.Item>
                        <Tooltip title="데이터 저장">
                            <Button htmlType="submit" shape="round" icon={<CheckOutlined />} />
                        </Tooltip>
                        </Form.Item>
                    </Space>
                    
                </div>
                
                <Upload {...options}>
                {fileList.length < limit && (
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                )}
                </Upload>
            
                <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="preview" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Form>
        </div>
    )
}

export default React.memo(ImageUpload)
