import React from 'react'
import { Spin } from 'antd';

function Load() {
    return (
        <div id="admin-load">
            <Spin size="large" tip="데이터 가져오는중..."/>
        </div>
    )
}

export default React.memo(Load)
