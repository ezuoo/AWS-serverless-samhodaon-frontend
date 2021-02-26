import React from 'react'
import axios from 'axios'

import { Table, Typography } from 'antd';

function NoticePage() {
    const [dataSource, setDataSource] = React.useState([]);
    const [loading, setLoading] = React.useState(true)
    

    const fetchData = async () => {
      const result = await (await axios.get('/api/notices')).data.data
      setDataSource(result === undefined ? [] : result);
    }

    React.useEffect(() => {
        fetchData();
        setLoading(false);
    }, [])

    const columns = [
        {
          title: '번호',
          dataIndex: 'no',
          key: 'no',
          width: 100,
          align: 'center', 
        },
        {
          title: '제목',
          dataIndex: 'title',
          key: 'title',
          align: 'center', 
          render: text => <div style={{textAlign: 'left', fontSize: '17px', padding: '0.5rem'}}><Typography.Text strong>{text}</Typography.Text></div>
        },
        {
          title: '작성 날짜',
          dataIndex: 'date',
          key: 'date',
          width: 200,
          align: 'center',
          render: text => <div style={{textAlign: 'left', fontSize: '16px', padding: '0.5rem'}}>{text}</div>
        }
    ];

    return (
          <div className='user-notice-container'>
              <h2>공지사항</h2>

              <div className='user-notice-content'>
                  <Table columns={columns} dataSource={dataSource} 
                          pagination={false} loading={loading} 
                          expandable={{
                          expandedRowRender: record => <p style={{ margin: '1rem' }}>{record.content}</p>,
                          rowExpandable: record => record.no !== 'Not Expandable',
                          expandRowByClick: true
                        }}                        
                  />
                  
              </div>
          </div>
    )
   


    
    
}

export default React.memo(NoticePage)
