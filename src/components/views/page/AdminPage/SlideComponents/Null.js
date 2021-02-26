import React from 'react'
import { Result, Button} from 'antd';

import {FrownOutlined, PlusOutlined} from '@ant-design/icons'

function Null() {
    return (
        <div id="admin-null">
            <Result icon={<FrownOutlined />} 
                    title="데이터를 추가해주세요"
                    extra={<Button type="primary" shape="round" icon={<PlusOutlined />} />}
            />
        </div>
        
    )
}

export default React.memo(Null)