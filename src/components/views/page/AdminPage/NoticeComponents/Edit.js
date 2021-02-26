import React from 'react'
import axios from 'axios'

import { Button, Space, Tooltip, Form, Input } from 'antd';
import {AppstoreOutlined, ArrowDownOutlined} from '@ant-design/icons'

import Notifications from '../../../commons/Notifications'

function Edit(props) {
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 20 }
    };

    const handleList = () => {
        props.setView('list');
        props.setRow(null);
    }

    const onFinish = (values) => {
        axios.patch(`/api/notices/${props.row.no}`, values).then(response => {
            if(response.data.success) {
                props.setDataSource(response.data.row);
                props.setView('list');
                props.setRow(null);
            }
            Notifications(response.data);
        });
    };

    // console.log(props.row)

    return (
        <>
        <Form {...layout} name="nest-messages" onFinish={onFinish}>
            <div id="admin-cases-edit-buttons">
                <Space>
                    <Tooltip title="목록">
                        <Button onClick={()=>{handleList()}} shape="round" icon={<AppstoreOutlined />} />
                    </Tooltip>
                    <Tooltip title="저장">
                        <Button htmlType="submit" shape="round" icon={<ArrowDownOutlined />} />
                    </Tooltip>
                </Space>
            </div>
            
            <div id="admin-cases-edit-container">
                <div id="admin-cases-edit-content">
                    <div id="admin-cases-edit-form">
                        <Form.Item name='title' label="제목" rules={[{ required: true, message: '제목을 입력해주세요' }]} initialValue={props.row.title}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='content' label="내용" rules={[{ required: true, message: '내용을 입력해주세요' }]} initialValue={props.row.content}>
                            <Input.TextArea />
                        </Form.Item>
                    </div>
                </div>
            </div>
        </Form>
        </>
    )
}

export default React.memo(Edit)
