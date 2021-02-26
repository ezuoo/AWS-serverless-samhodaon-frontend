import React from 'react'
import axios from 'axios'

import { Tooltip, Button, Row, Col, Card, Typography, Modal, BackTop} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined  } from '@ant-design/icons'

import Null from './Null'
import Notifications from '../../../commons/Notifications'

function List(props) {
    const handleEdit = (row) => {
        props.setRow(row);
        props.setView('edit')
        
    }   

    const handleRemove= (row) => {
        Modal.confirm({
            title: '삭제하시겠습니까?',
            icon: <ExclamationCircleOutlined />,
            content: '한번 삭제하면 복구가 어렵습니다.',
            okText: '삭제',
            okType: 'danger',
            cancelText: '취소',
            onOk() {
                const newData = props.dataSource.filter( x => x._id !== row._id);
                axios.delete(`/api/cases/${row._id}`).then(response => {
                    if(response.data.success) {
                        props.setDataSource(newData);
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

    const handleItem = (row) => {
        props.setRow(row)
        props.setView('item')
        window.scrollTo(0, 0)
    }
    
    return (
        <React.Fragment>
                <BackTop visibilityHeight={300} />
                <div id="admin-cases-list-add">
                    <Tooltip title="새 데이터 추가">
                        <Button onClick={()=> props.setView('add')} shape="round" icon={<PlusOutlined />} />
                    </Tooltip>
                </div>

                {props.dataSource.length === 0 ? (<Null />) : 
                    (
                    <Row id="admin-cases-list-content">
                        <Col span={24}>
                            <Row gutter={[24, 32]}>
                            {props.dataSource && props.dataSource.map((row, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <Col lg={6} md={8} xs={24}>
                                            <Card hoverable={props.hover} cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}
                                                actions={[<EditOutlined key="edit" onClick= {()=>handleEdit(row)} />,
                                                            <DeleteOutlined key="remove" onClick= {()=>handleRemove(row)} />]}
                                            >
                                                <a href='#!' onClick={()=> handleItem(row)}>
                                                    <Card.Meta title={<Typography.Text strong>{row.title}</Typography.Text> } 
                                                            description={row.info} 
                                                            onPointerEnter ={()=>props.setHover(!props.hover)} 
                                                            onPointerLeave ={()=>props.setHover(!props.hover)} 
                                            
                                                    />
                                                </a>
                                            </Card>
                                        </Col>
                                </React.Fragment>
                                )   
                            })}
                            </Row>
                        </Col>
                    </Row>
                    ) 
                }     
               
        </React.Fragment>
    )
}

export default React.memo(List)
