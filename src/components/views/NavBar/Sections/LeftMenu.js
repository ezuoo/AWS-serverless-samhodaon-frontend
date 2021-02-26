import React from 'react';
import { Menu } from 'antd';
import { withRouter, Link } from 'react-router-dom';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="home">
        <Link to="/">메인</Link>
      </Menu.Item>
      <Menu.Item key="intro">
        <Link to="/daon">회사소개</Link>
      </Menu.Item>
      <Menu.Item key="cases">
        <Link to="/cases">시공사례</Link>
      </Menu.Item>
      <Menu.Item key="notice">
        <Link to="/notice">공지사항</Link>
      </Menu.Item>
      <Menu.Item key="order">
        <Link to="/order">견적문의</Link>
      </Menu.Item>
    </Menu>
  );
}

export default React.memo(withRouter(LeftMenu))