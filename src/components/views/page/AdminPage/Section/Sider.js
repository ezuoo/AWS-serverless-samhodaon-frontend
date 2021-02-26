import React from 'react'
import { Link, withRouter} from "react-router-dom";

import { Menu } from "antd";
import { PieChartOutlined } from "@ant-design/icons";

import '../css/Admin.css'

function AdminSider(props) {
    return (      
        <Menu mode="vertical" id="admin-sider">
          {props.data && props.data.map((x, index) => {
              return (
                  <Menu.Item key={index}>
                    <PieChartOutlined />
                      <Link to={`/admin/${Object.keys(x)[0]}`}>{Object.values(x)[0]}</Link>
                  </Menu.Item>
              );
            })}
        </Menu>
    );
}

export default React.memo(withRouter(AdminSider))