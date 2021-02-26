import React from 'react'
import axios from 'axios';


import {Button, Descriptions, Space,  Modal,  Tooltip} from 'antd';
import {ExclamationCircleOutlined, AppstoreOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'

import Notifications from '../../../commons/Notifications'

function Item(props) {
    const [row, setRow] = React.useState(null);

    const handleList = () => {
        props.setView('list')
        props.setNo(null);
        window.scrollTo(0, 0)
    }

    const handleRemove = () => {
        Modal.confirm({
            title: '삭제하시겠습니까?',
            icon: <ExclamationCircleOutlined />,
            content: '한번 삭제하면 복구가 어렵습니다.',
            okText: '삭제',
            okType: 'danger',
            cancelText: '취소',
            onOk() {
                const newData = props.dataSource.filter( x => x.no !== props.no);
                axios.delete(`/api/notices/${props.no}`).then(response => {
                    if(response.data.success) {
                        props.setDataSource(newData);
                        props.setView('list')
                        props.setNo(null);
                        window.scrollTo(0, 0)
                    }
                    Notifications(response.data)
                })                
            },
            onCancel() {
                return false;
            }
        });
    }

    const handleEdit = () => {
        props.setRow(row);
        props.setView('edit')
        
    }   

    const fetchData = async () => {
        const result = await (await axios.get(`/api/notices/${props.no}`)).data.data
        setRow(result);
    }

    React.useEffect(() => {
     fetchData();       
    }, [])

    return (
        <>
            <div id="admin-cases-item-buttons">
                <Space>
                    <Tooltip title="목록">
                        <Button onClick={()=>handleList()} shape="round" icon={<AppstoreOutlined />} />
                    </Tooltip>
                    <Tooltip title="수정">
                        <Button onClick={()=>handleEdit()} shape="round" icon={<EditOutlined />} />
                    </Tooltip>
                    <Tooltip title="삭제">
                        <Button onClick={()=>handleRemove()} shape="round" icon={<DeleteOutlined />} />
                    </Tooltip>
                </Space>
            </div>
            {row !== null && (
                <div id="admin-cases-item-container"> 
                    <Descriptions size="small" layout="horizontal" bordered className="ant-descriptions-container">
                        {/* title */}
                        <Descriptions.Item label="제목" span={3}/*  className="ant-descriptions-item-text" */>{row.title}</Descriptions.Item>
                        
                        {/* date */}
                        <Descriptions.Item label="등록 날짜" span={3} >{row.date}</Descriptions.Item>
                    
                        {/* content */}
                        <Descriptions.Item label="내용" /*  className="ant-descriptions-item-text" */>
                            <div>{row.content}</div>
                        </Descriptions.Item>

                    </Descriptions>
                </div>
            )}
        </>
    )
}

export default React.memo(Item)
