import React from 'react'
import axios from 'axios';
import {Row, Col, Layout } from 'antd';


import GridCard from '../../commons/GridCard';
import BodyTop from '../../commons/BodyTop';
import Filter from './Section/SideBar';


function CaseManyPage() {
    const [CaseData, setCaseData] = React.useState([]);
   
    const fetchData = React.useCallback(async () => {
      const ret = await axios.get('/api/cases');
      const res = ret.data;
      setCaseData(res.data);
    }, []);


    React.useEffect(() => {
      fetchData();
    }, [fetchData]);

    return (
      <>
        <BodyTop/>

        <Layout className='user-cases-container'>
            
            <Layout.Content>
              <Row className='user-cases-content-row'>
                
                <Col span={5}>
                  <Filter setCaseData={setCaseData} />
                </Col>

                <Col span={19} className='user-cases-row-right'>
                  <h2>시공사례</h2><hr /><br />

                  <Row gutter={[16, 16]}>
                    {CaseData &&
                      CaseData.map((cases, index) => (
                        <React.Fragment key={index}>
                          <GridCard casedata={cases} />
                        </React.Fragment>
                      ))}
                  </Row>
                </Col>
              </Row>
            </Layout.Content>
          </Layout>
      </>
    );
}

export default React.memo(CaseManyPage)



