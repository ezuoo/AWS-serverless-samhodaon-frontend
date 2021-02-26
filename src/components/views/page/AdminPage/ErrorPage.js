import React from 'react'
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom'

function ErrorPage() {
    const history = useHistory();

    return (
        <div>
            <Result status="500" title="500" subTitle="Sorry, something went wrong."
                extra={<Button type="primary" onClick={()=> history.push('/admin')}>Back Home</Button>}
            />
        </div>
    )
}

export default React.memo(ErrorPage)


