import React from 'react'
import {  Layout, Typography } from 'antd';

import '../css/Admin.css'

function AdminPageNav() {
    return (
        <Layout.Header id="admin-nav-header">
              <div id="admin-nav-content">
                  <a href="/admin"><Typography.Title level={3}>DAON</Typography.Title></a>
              </div>
        </Layout.Header>
    )
}

export default React.memo(AdminPageNav)
