import React from 'react'
import axios from 'axios';
import DOMPurify from 'dompurify';
import Slider from "react-slick";

import {Button, Descriptions, Badge, Space, Image, Modal, BackTop, Tooltip} from 'antd';
import {ExclamationCircleOutlined, AppstoreOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'

import Notifications from '../../../commons/Notifications'


import '../css/slick.css';
import '../css/slick-theme.css';

function Item(props) {
    const handleList = () => {
        props.setView('list')
        props.setRow({});
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
                const newData = props.dataSource.filter( x => x._id !== props.row._id);
                axios.delete(`/api/cases/${props.row._id}`).then(response => {
                    if(response.data.success) {
                        props.setDataSource(newData);
                        props.setView('list')
                        props.setRow({});
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
        props.setView('edit')
    }   

    const createMarkup = (html) => {
        return  {
          __html: DOMPurify.sanitize(html)
        }
    }

    const settings = {
        customPaging: function(i) {
            return (
              <a href="#!">
                <img src={props.row.image[i]} style={{width: '100%', height:'70px'}} alt="test" />
              </a>
            );
          },
          dots: true,
          dotsClass: "slick-dots slick-thumb",
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1
    };
    
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
            
            <div id="admin-cases-item-container">
                <BackTop visibilityHeight={150} />
                <div id="admin-cases-item-content">
                    <div id="slide-view-container">
                        <div id="slide-view-content">
                            <Slider {...settings} className="slide-view-size">
                                {props.row.image && props.row.image.map((v,i) => {
                                    return (
                                        <div key={i}> 
                                            <Image src={v} width='100%' height={365}/>
                                        </div>
                                    )
                                })}
                            </Slider>
                        </div>
                    </div>
                    
                    <Descriptions size="small" layout="vertical" bordered className="ant-descriptions-container">
                        {/* title */}
                        <Descriptions.Item label="제목 "span={3} className="ant-descriptions-item-text">{props.row.title}</Descriptions.Item>
                        {/* division */}
                        <Descriptions.Item label="공간">{props.row.division}</Descriptions.Item>
                        {/* area */}
                        <Descriptions.Item label="평형대">{props.row.area}평대</Descriptions.Item>
                        {/* office */}
                        <Descriptions.Item label="지점">{props.row.office}</Descriptions.Item>

                        {/* color */}
                        <Descriptions.Item label="색상">{props.row.color.map(x => `${x} `)} </Descriptions.Item>
                        {/* section */}
                        <Descriptions.Item label="영역">{props.row.section.map(x => `${x} `)}</Descriptions.Item>
                        {/* style */}
                        <Descriptions.Item label="스타일">{props.row.style.map(x => `${x} `)}</Descriptions.Item>
                        
                        {/* best */}
                        <Descriptions.Item label="베스트">
                            <Badge status={props.row.best ? "success": "error"} text={props.row.best ? "Yes": "No"} />
                        </Descriptions.Item>

                        {/* date */}
                        <Descriptions.Item label="등록 날짜" span={2}>{props.row.date}</Descriptions.Item>
                    
                        {/* info */}
                        <Descriptions.Item label="세부내용" span={3} className="ant-descriptions-item-text">{props.row.info}</Descriptions.Item>

                        {/* content */}
                        <Descriptions.Item label="내용" span={3} className="ant-descriptions-item-text">
                            <div dangerouslySetInnerHTML={createMarkup(props.row.content)}></div>
                        </Descriptions.Item>

                    </Descriptions>
                </div>
            </div>
        </>
    )
}

export default React.memo(Item)
