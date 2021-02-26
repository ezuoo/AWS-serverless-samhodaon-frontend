import React from 'react'

import Load from './SlideComponents/Load'
import List from './SlideComponents/List'


function AdminSlidePage() {    
    const [view, setView] = React.useState('load');
    
    React.useEffect(() => {
        setTimeout(() => {            
            setView('list');
        }, 300);
    }, [])

    switch (view) {
        case 'load':
            return <Load />
        case 'list':
            return <List />
        default:
            // TODO: Mapping to error page
            break;
    }
}

export default React.memo(AdminSlidePage)
