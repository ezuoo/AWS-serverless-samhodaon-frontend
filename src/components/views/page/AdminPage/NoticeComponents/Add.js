import React from 'react'
import axios from 'axios'

import { Button, Space, Tooltip, Form, Input} from 'antd';
import {AppstoreOutlined, PlusOutlined} from '@ant-design/icons'


import Notifications from '../../../commons/Notifications'

function Add(props) {
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 20 }
    };

    const onFinish = (values) => {
        axios.post('/api/notices', values).then(response => {
            if(response.data.success) {
                const oldData = props.dataSource;
                const newData = response.data.row;
                props.setDataSource([...oldData, newData]);
                props.setView('list');
            }
            Notifications(response.data);
        });
    };

    return ( 
        <>
            <Form {...layout} name="nest-messages" onFinish={onFinish}>
                <div id="admin-cases-add-buttons">
                    <Space>
                        <Tooltip title="목록">
                            <Button onClick={()=>{props.setView('list')}} shape="round" icon={<AppstoreOutlined />} />
                        </Tooltip>
                        <Tooltip title="추가">
                            <Button htmlType="submit" shape="round" icon={<PlusOutlined />} />
                        </Tooltip>
                    </Space>
                </div>
                
                <div id="admin-cases-add-container">
                    <div id="admin-cases-add-content">
                        <div id="admin-cases-add-form">
                            <Form.Item name='title' label="제목" rules={[{ required: true, message: '제목을 입력해주세요' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name='content' label="내용" rules={[{ required: true, message: '내용을 입력해주세요' }]}>
                                <Input.TextArea />
                            </Form.Item>
                        </div>
                    </div>
                </div>

            </Form>
        </>
    )
}

export default React.memo(Add)
