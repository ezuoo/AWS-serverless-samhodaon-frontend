import React from 'react'
import axios from 'axios'
import {Typography, Tabs} from 'antd'
import {SlidersOutlined} from '@ant-design/icons'

import Load from './ElementComponents/Load'
import List from './ElementComponents/List';

import './css/Admin.css'

const toKR = (name) => {
    switch (name) {
        case 'division':
            return '공간'
        case 'color':
            return '색상'
        case 'area':
            return '평수'
        case 'style':
            return '스타일'
        case 'section':
            return '영역'
        default:
            break;
    }
}

function AdminElementPage() {
    const [dataSource, setDataSource] = React.useState(null);
    const [view, setView] = React.useState('load');

    const fetchElements = async () => {
        const response = await (await axios.get('/api/elements')).data.data[0];
        const filteredData = Object.entries(response).filter((value)=> typeof value[1] === 'object')
        
        setDataSource(filteredData)
    }
    
    React.useEffect(() => {
        setTimeout(() => {
            fetchElements();
            setView('list');
        },300);
        
    },[]);

    switch (view) {
        case 'load':
            return <Load />
        case 'list':
            return (
                <>
                    <Typography.Title level={2}><SlidersOutlined /> 필터 관리</Typography.Title>
                    <div id="admin-element-container">
                        <Tabs id="admin-element-tab-container" type="card" size="large">
                            {dataSource && dataSource.map( (v,index)=> {
                                    const tabName = toKR(v[0]);
                                    return (<Tabs.TabPane tab={tabName} key={index+1}>
                                                    <List name={tabName} field={v[0]} data={v[1]} />
                                            </Tabs.TabPane>)
                                })
                            }
                        </Tabs>
                    </div>
                    
                </>
            ) 
        default:
            // TODO: Mapping to error page
            break;
    }

   /*  */
}

export default React.memo(AdminElementPage);
