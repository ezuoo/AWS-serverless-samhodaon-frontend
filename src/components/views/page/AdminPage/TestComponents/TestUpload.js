import React from 'react'
import {Upload, Button, Modal, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons'
import axios from 'axios'

import Notifications from '../../../commons/Notifications'

function TestUpload() {
    const [previewVisible, setPreviewVisible] = React.useState(false)
    const [previewImage, setPreviewImage] = React.useState('')
    const [previewTitle, setPreviewTitle] = React.useState('')
    
    const [uploading, setUploading] = React.useState(false)
    const [fileList, setFileList] = React.useState([
       /*  {
            uid: '1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        } */
    ])
      
    const getBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }

    const handleUpload = () => {
        console.log('Upload');
        /* const formData = new FormData();
        fileList.forEach(file => {
          formData.append('files[]', file);
        }); */
        setUploading(true)
            
        // You can use any AJAX library you like
        /* reqwest({
          url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          method: 'post',
          processData: false,
          data: formData,
          success: () => {
            this.setState({
              fileList: [],
              uploading: false,
            });
            message.success('upload successfully.');
          },
          error: () => {
            this.setState({
              uploading: false,
            });
            message.error('upload failed.');
          },
        }); */
    };
    const handleCancel = () => setPreviewVisible(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewVisible(true)
        setPreviewImage(file.url || file.preview)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    } 

    const options = {
        onPreview: (file) => {handlePreview(file)},
        onRemove: file => {
          axios.delete(file.url).then((response) => {
              if(response.data.success) {
                  const index = fileList.indexOf(file);
                  const newFileList = fileList.slice();
                  newFileList.splice(index, 1);
                  setFileList(newFileList);
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
  
                  setFileList([...fileList, newData]);
              })
            } else message.error('jpeg나 png인 이미지 파일 형식만 업로드 가능합니다.');
            
            return false;
        },
        fileList
       
    };

    return (
        <div>
            <Upload {...options} >
              {fileList.length < 1 && (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
              )}
              
            </Upload>

            <Button type="primary" onClick={handleUpload} disabled={fileList.length === 0}
                    loading={uploading} style={{ marginTop: '1rem' }}>
                {uploading ? 'Uploading' : 'Start Upload'}
            </Button>

            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    )
}

export default React.memo(TestUpload)
