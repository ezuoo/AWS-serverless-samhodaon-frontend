import React from 'react'
import axios from 'axios';


import {Button, Descriptions, Space,  Modal,  Tooltip, Tag} from 'antd';
import {ExclamationCircleOutlined, AppstoreOutlined, DeleteOutlined} from '@ant-design/icons'

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
                axios.delete(`/api/orders/${props.no}`).then(response => {
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

    const fetchData = async () => {
        const result = await (await axios.get(`/api/orders/${props.no}`)).data.data
        setRow(JSON.parse(result.data));
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
                    <Tooltip title="삭제">
                        <Button onClick={()=>handleRemove()} shape="round" icon={<DeleteOutlined />} />
                    </Tooltip>
                </Space>
            </div>
            {row !== null && (
                <div id="admin-cases-item-container"> 
                    <Descriptions size="small" layout="vertical" bordered className="ant-descriptions-container">
                        <Descriptions.Item label="고객명">{row.name}</Descriptions.Item>
                        <Descriptions.Item label="주거지" span={2}>{row.address}</Descriptions.Item>
                        <Descriptions.Item label="연락처">{row.contact}</Descriptions.Item>
                        <Descriptions.Item label="이메일">{row.email}</Descriptions.Item>
                        <Descriptions.Item label="공사 예상 날짜">{row.expected_date.substring(0,10)}</Descriptions.Item>
                        <Descriptions.Item label="공사 예상 금액">{row.expected_price}</Descriptions.Item>
                        <Descriptions.Item label="평형대">{row.area}</Descriptions.Item>
                        <Descriptions.Item label="도배">{row.papering.map((v,i) => <Tag key={i} color="default">{v}</Tag>)}</Descriptions.Item>
                        <Descriptions.Item label="바닥재">{row.flooring.map((v,i) => <Tag key={i} color="default">{v}</Tag>)}</Descriptions.Item>
                        <Descriptions.Item label="마감재 공사">{row.finishing_material.map((v,i) => <Tag key={i} color="default">{v}</Tag>)}</Descriptions.Item>
                        <Descriptions.Item label="전기 조명">{row.light.map((v,i) => <Tag key={i} color="default">{v}</Tag>)}</Descriptions.Item>
                        <Descriptions.Item label="제작 가구">{row.furniture.map((v,i) => <Tag key={i} color="default">{v}</Tag>)}</Descriptions.Item>
                        <Descriptions.Item label="타일 공사">{row.tile.map((v,i) => <Tag key={i} color="default">{v}</Tag>)}</Descriptions.Item>
                        <Descriptions.Item label="욕실 공사">{row.bathroom.map((v,i) => <Tag key={i} color="default">{v}</Tag>)}</Descriptions.Item>
                        <Descriptions.Item label="확장 공사">{row.expansion.map((v,i) => <Tag key={i} color="default">{v}</Tag>)}</Descriptions.Item>
                        <Descriptions.Item label="샤시 공사">{row.chassis.map((v,i) => <Tag key={i} color="default">{v}</Tag>)}</Descriptions.Item>
                        <Descriptions.Item label="목공사">{row.woodwork.map((v,i) => <Tag key={i} color="default">{v}</Tag>)}</Descriptions.Item>
                        <Descriptions.Item label="아트월">{row.artwall.map((v,i) => <Tag key={i} color="default">{v}</Tag>)}</Descriptions.Item>
                        <Descriptions.Item label="기타 공사">{row.etc.map((v,i) => <Tag key={i} color="default">{v}</Tag>)}</Descriptions.Item>
                        <Descriptions.Item label="홈 스타일링">{row.styling.map((v,i) => <Tag key={i} color="default">{v}</Tag>)}</Descriptions.Item>
                        <Descriptions.Item label="문의 사항">{row.qna}</Descriptions.Item>                       
                    </Descriptions>
                </div>
            )}
        </>
    )
}

export default React.memo(Item)
