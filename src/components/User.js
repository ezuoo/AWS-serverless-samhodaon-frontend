import React from 'react'

import { 
BrowserRouter as Router, 
Route, 
Switch
} from "react-router-dom";
    
import { Layout } from 'antd';

import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"

import DaonPage from './views/page/DaonPage/DaonPage';
import CaseManyPage from "./views/page/CasePage/CaseManyPage"
import CaseOnePage from './views/page/CasePage/CaseOnePage'
import LandingPage from "./views/page/LandingPage/LandingPage";
import NoticePage from "./views/page/Noticepage/NoticePage";
import OrderPage from "./views/page/OrderPage/OrderPage";
import LoginPage from "./views/page/LoginPage/LoginPage.js";

import ErrorPage from './views/commons/ErrorPage';

import Auth from "../hoc/auth";

import './css/user.css'

const NewLandingPaga = Auth(LandingPage, null);
const NewDaonPage =  Auth(DaonPage, null);
const NewCaseManyPage = Auth(CaseManyPage, null);
const NewCaseOnePage = Auth(CaseOnePage, null)
const NewNoticePage = Auth(NoticePage, null);
const NewOrderPage = Auth(OrderPage, null);
const NewLoginPage = Auth(LoginPage, null);

function User() {
    return (
        <>
          <div className="user-container">
            <div className="user-layout">
              <Layout id="user-layout">
                <Router>
                    <NavBar />

                    <Layout.Content className="user-layout-content-container">
                      <Switch>
                          <Route exact path="/" component={NewLandingPaga} />
                          <Route  path="/daon" component={NewDaonPage} />
                          <Route exact path="/cases" component={NewCaseManyPage} />
                          <Route  path="/cases/:caseId" component={NewCaseOnePage} />
                          <Route  path="/notice" component={NewNoticePage} />
                          <Route  path="/order" component={NewOrderPage} />
                          <Route  path="/login" component={NewLoginPage} />
                          <Route component={ErrorPage} />  
                      </Switch>
                    </Layout.Content>
                    
                    <Layout.Footer className="user-layout-footer-container">
                      <Footer />
                    </Layout.Footer>
                    
                  </Router>
              </Layout>    
            </div>
          </div>  
        </>
    );
}

export default React.memo(User)
