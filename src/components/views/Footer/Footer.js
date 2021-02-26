import React from 'react'
import { Typography } from 'antd';

const { Text } = Typography;

function Footer() {

  

    return (
        <div className='user-layout-footer-content'>
            <Text strong>다온 인테리어</Text>
            <Text>대표자명 : 정재민</Text> 
            <Text>주소 : 경기 안양시 동안구 관평로 138번길 53 초원부영상가 1층</Text>
            <Text>사업자 등록번호 : 123-45-678910</Text> 
            <Text>Copyright (c) 2021 DAON interior, Ltd. All Right Reserved.</Text>
        </div>
    )
}

export default Footer
