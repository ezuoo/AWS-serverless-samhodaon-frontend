import React from 'react'
import axios from 'axios';

import Load from './CaseComponents/Load'
import List from './CaseComponents/List'
import Item from './CaseComponents/Item'
import Add from './CaseComponents/Add'
import Edit from './CaseComponents/Edit'

import  './css/Admin.css';

function AdminCasePage() {
    const [row, setRow] = React.useState({});
    const [hover, setHover] = React.useState(false);
    const [view, setView] = React.useState('load');
    const [dataSource, setDataSource] = React.useState([]);

    const fetchCases = async () => {
        const result = await (await axios.get('/api/cases')).data.data
        setDataSource(result === undefined ? [] : result);
    }

    React.useEffect(() => {
        setTimeout(() => {
            fetchCases();
            setView('list');
        },300);
        
    }, [])
    
    switch (view) {
        case 'load':
            return <Load />
        case 'list':
            return <List hover={hover} setHover={setHover} setView={setView} dataSource={dataSource} setDataSource={setDataSource} row={row} setRow={setRow}/>
        case 'item':
            return <Item setView={setView} row={row} setRow={setRow} dataSource={dataSource} setDataSource={setDataSource} />
        case 'add':
            return <Add setView={setView} dataSource={dataSource} setDataSource={setDataSource} />
        case 'edit': 
            window.scrollTo(0, 0);
            return <Edit setView={setView} row={row} setRow={setRow} dataSource={dataSource} setDataSource={setDataSource} />

        default:
            // TODO: Mapping to error page
            break;
    }
}

export default React.memo(AdminCasePage)
