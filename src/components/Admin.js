import React from 'react';
import { BrowserRouter as Router ,Route, Switch } from "react-router-dom";
import { Layout, Row, Col, Typography} from 'antd';
import {SlidersOutlined} from '@ant-design/icons'

import Nav from './views/page/AdminPage/Section/Nav';
import Sider from './views/page/AdminPage/Section/Sider';

import AdminLandingPage from "./views/page/AdminPage/AdminLandingPage";
import AdminElementPage from './views/page/AdminPage/AdminElementPage'
import AdminCasePage from './views/page/AdminPage/AdminCasePage'
import AdminSlidePage from './views/page/AdminPage/AdminSlidePage'
import AdminOrderPage from './views/page/AdminPage/AdminOrderPage'
import AdminNoticePage from './views/page/AdminPage/AdminNoticePage'

import ErrorPage from './views/page/AdminPage/ErrorPage'

import './css/admin.css';

const data = [
    {elements : "필터"},
    {cases : "케이스"},
    {slides : "메인 슬라이드 뷰"},
    {notice : "공지사항"},
    {orders: "견적문의" }
];

function Admin() {
    return (
        <>
         <Layout>
            <Nav />

            <Layout.Content id="admin-body-container">
                <div id="admin-body-content">
                    <Row id="admin-body-content-row">
                    <Router>
                        <Col span={5}>
                            <Sider data={data} />   
                        </Col>

                        <Col span={19} id="admin-body-col-right">
                            <Switch>
                                <Route exact path="/admin" component={AdminLandingPage}/>
                                <Route path="/admin/elements" component={AdminElementPage} />
                                <Route path="/admin/cases" render={()=> (
                                        <>
                                            <Typography.Title level={2}><SlidersOutlined /> 케이스 관리</Typography.Title>
                                            <div id="admin-cases-container">
                                                <AdminCasePage />
                                            </div>
                                            
                                        </>
                                    )}
                                />
                                <Route path="/admin/slides" render={()=> (
                                        <>
                                            <Typography.Title level={2}><SlidersOutlined /> 메인 슬라이드 뷰 관리</Typography.Title>
                                            <div id="admin-slides-container">
                                                <AdminSlidePage />
                                            </div>
                                            
                                        </>
                                    )}
                                />
                                <Route path="/admin/notice" render={()=> (
                                        <>
                                            <Typography.Title level={2}><SlidersOutlined /> 공지사항 관리</Typography.Title>
                                            <div id="admin-qna-container">
                                                <AdminNoticePage />
                                            </div>
                                            
                                        </>
                                    )}
                                />
                                <Route path="/admin/orders" render={()=> (
                                        <>
                                            <Typography.Title level={2}><SlidersOutlined /> 견적문의 관리</Typography.Title>
                                            <div id="admin-order-container">
                                                <AdminOrderPage />
                                            </div>
                                            
                                        </>
                                    )}
                                />

                                <Route component={ErrorPage} />
                            </Switch>
                        </Col>
                    </Router>
                    </Row>
                </div>
            </Layout.Content>
         </Layout>
        </>
        
    );
}

export default React.memo(Admin);