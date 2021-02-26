/* import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Typography } from 'antd';

const { Text } = Typography;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function AdminLeftMenu(props) {
    return (
        <Menu mode={props.mode}>
          <Menu.Item key="admin">
            <a href="/admin"><Text>관리자 홈</Text></a>
          </Menu.Item>
          <SubMenu title={<span>추가</span>}>
            <Menu.Item key="filter">필터</Menu.Item>
            <Menu.Item key="case">사례</Menu.Item>
            <Menu.Item key="view">슬라이드 뷰</Menu.Item>
          </SubMenu>
          <SubMenu title={<Text>수정</Text>}>
            <Menu.Item key="filter">필터</Menu.Item>
            <Menu.Item key="case">사례</Menu.Item>
            <Menu.Item key="view">슬라이드 뷰</Menu.Item>
            <Menu.Item key="about">회사 소개</Menu.Item>
          </SubMenu>
          <SubMenu title={<Text>삭제</Text>}>
            <Menu.Item key="filter">필터</Menu.Item>
            <Menu.Item key="case">사례</Menu.Item>
            <Menu.Item key="view">슬라이드 뷰</Menu.Item>
          </SubMenu>
         
          <SubMenu title={<span>견적 문의</span>}>
              <Menu.Item key="about1">수정</Menu.Item>
          </SubMenu>


      
        </Menu>
      );
}

export default React.memo(withRouter(AdminLeftMenu)) */    {/* <SubMenu title={<span>Blogs</span>}>
<MenuItemGroup title="Item 2">
  <Menu.Item key="setting:3">Option 3</Menu.Item>
  <Menu.Item key="setting:4">Option 4</Menu.Item>
</MenuItemGroup>
</SubMenu> */}