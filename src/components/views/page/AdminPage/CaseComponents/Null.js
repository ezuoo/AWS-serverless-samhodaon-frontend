import React from 'react'
import { Result } from 'antd';

import {SmileOutlined} from '@ant-design/icons'

function Null() {
    return (
        <div id="admin-null">
            <Result icon={<SmileOutlined />} title="데이터를 추가해주세요" />
        </div>
        
    )
}

export default React.memo(Null)