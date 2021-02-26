import React from "react";
import {Typography, List} from 'antd'

const data = [
  '견적문의',
  '공지사항'
];

function AdminPage() {
    
    return (
      <>
          <List header={<Typography.Title level={3}>TODO :: </Typography.Title>} 
                bordered dataSource={data} size="large"
                renderItem={item => <List.Item>{item}</List.Item>} style={{backgroundColor: '#fff'}}
          />
      </>
    );
}

export default AdminPage;
