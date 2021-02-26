import React from 'react'
import axios from 'axios'

import Load from './NoticeComponents/Load'
import List from './NoticeComponents/List'
import Item from './NoticeComponents/Item'
import Add from './NoticeComponents/Add'
import Edit from './NoticeComponents/Edit'

function AdminNoticePage() {
    const [no, setNo] = React.useState(null);
    const [view, setView] = React.useState('load');
    const [dataSource, setDataSource] = React.useState([]);
    const [row, setRow] = React.useState(null);

    const fetchData = async () => {
        const result = await (await axios.get('/api/notices')).data.data
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
            return <Item setView={setView} no={no} setNo={setNo} setRow={setRow} dataSource={dataSource} setDataSource={setDataSource} />
        case 'add':
            return <Add setView={setView} dataSource={dataSource} setDataSource={setDataSource} />
        case 'edit': 
            window.scrollTo(0, 0);
            return <Edit setView={setView} no={no} row={row} setRow={setRow} setNo={setNo} dataSource={dataSource} setDataSource={setDataSource} />
        default:
            // TODO: Mapping to error page
            break;
    }
}

export default React.memo(AdminNoticePage)
