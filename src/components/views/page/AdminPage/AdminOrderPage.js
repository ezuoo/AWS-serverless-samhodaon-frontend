import React from 'react'
import axios from 'axios'

import Load from './OrderComponents/Load'
import List from './OrderComponents/List'
import Item from './OrderComponents/Item'

function AdminOrderPage() {
    const [no, setNo] = React.useState(null);
    const [view, setView] = React.useState('load');
    const [dataSource, setDataSource] = React.useState([]);

    const fetchData = async () => {
        const result = await (await axios.get('/api/orders')).data.data
        setDataSource(result === undefined ? [] : result);
    }

    React.useEffect(() => {
        setTimeout(() => {
            fetchData();
            setView('list');
        },300);
        
    }, [])
    
    switch (view) {
        case 'load':
            return <Load />
        case 'list':
            return <List setView={setView} dataSource={dataSource} setDataSource={setDataSource} no={no} setNo={setNo}/>
        case 'item':
            return <Item setView={setView} no={no} setNo={setNo} dataSource={dataSource} setDataSource={setDataSource} />
        default:
            // TODO: Mapping to error page
            break;
    }
}

export default React.memo(AdminOrderPage)

