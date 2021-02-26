import React from 'react'
import axios from 'axios'
import {Row} from 'antd';

import BodyTop from '../../commons/BodyTop';
import GridCard from '../../commons/GridCard';

function LandingPage() {
    const [dataSource, setDataSource] = React.useState(null);

    const fetchData = async () => {
        const response = await (await axios.get('/api/cases?best=true')).data;
        setDataSource(response.data);
      }
    
      React.useState(() => {
        fetchData();
      },[]);

    return (
        <>
            <div>
                <BodyTop/>
                    <br />    
                <div className='user-landing-container'>
                    <h2>베스트 인테리어</h2>
                    <hr />
                    <br />

                    <Row gutter={[16, 16]}>
                    {dataSource !== null && dataSource.map((v, index) => (
                        <React.Fragment key={index}>
                            <GridCard casedata={v} />
                        </React.Fragment>
                        ))}
                    </Row>
                </div>
            </div>
        </>
    )
}

export default LandingPage
