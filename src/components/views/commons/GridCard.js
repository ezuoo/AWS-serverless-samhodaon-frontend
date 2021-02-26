import React from 'react'
import {Col, Card} from 'antd'
import test from '../../image/test2.jpg'

const { Meta } = Card;

function GridCard(props) {
    let url = `/cases/${props.casedata._id}`;
    return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                <a href={url}>
                <Card hoverable style={{ width: '100%' }} cover={ <img alt="example" src={test} />}>
                   <Meta title= {props.casedata.title} description={props.casedata.info} />
                 </Card>
                 </a>
                </div>
            </Col>
            
    )
}

export default React.memo(GridCard)
