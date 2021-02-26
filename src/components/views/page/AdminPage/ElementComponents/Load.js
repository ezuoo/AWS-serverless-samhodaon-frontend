import React from 'react'
import { Spin } from 'antd';

function Load() {
    return (
        <div style={{minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>                    
            <Spin size="large" tip="데이터 가져오는중..."/>                
        </div>
    )
}

export default React.memo(Load)
