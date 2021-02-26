import React from 'react'
import axios from 'axios'

import { Tooltip, Button, Table, Modal, BackTop} from 'antd'
import { PlusOutlined, ExclamationCircleOutlined, DeleteOutlined  } from '@ant-design/icons'

import Null from './Null'
import Notifications from '../../../commons/Notifications'

function List(props) {
    const handleRemove= (no) => {
        Modal.confirm({
            title: '삭제하시겠습니까?',
            icon: <ExclamationCircleOutlined />,
            content: '한번 삭제하면 복구가 어렵습니다.',
            okText: '삭제',
            okType: 'danger',
            cancelText: '취소',
            onOk() {
                const newData = props.dataSource.filter( x => x.no !== no);
                axios.delete(`/api/orders/${no}`).then(response => {
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

    const handleItem = (no) => {
        props.setNo(no)
        props.setView('item')
        window.scrollTo(0, 0)
    }

    const columns = [
        {
          title: '번호',
          dataIndex: 'no',
          key: 'no'
        },
        {
          title: '고객명',
          dataIndex: 'name',
          key: 'name',
          render: (text,record) => <a href="#!" onClick={()=>{handleItem(record.no)}}>{text}</a>
        },
        {
          title: '',
          key: 'action',
          width: 100,
          render: (_, record) => (
            <Tooltip title="삭제">
                <Button onClick={()=>handleRemove(record.no)} shape="round" icon={<DeleteOutlined />} />
            </Tooltip>
          ),
        },
    ];
    
    const data = props.dataSource.map((v) => {
            return {
                no: v.no,
                name: JSON.parse(v.data).name,
                key: v.no
            }
    });

    return (
        <React.Fragment>
                <BackTop visibilityHeight={200} />
                <div id="admin-cases-list-add">
                    <Tooltip title="새 데이터 추가">
                        <Button onClick={()=> props.setView('add')} shape="round" icon={<PlusOutlined />} />
                    </Tooltip>
                </div>

                {props.dataSource.length === 0 ? (<Null />) : 
                    (
                    <div id="admin-cases-list-content">
                        <Table columns={columns} dataSource={data} pagination={false} />
                    </div>
                     ) 
                }  
               
        </React.Fragment>
    )
}

export default React.memo(List)
