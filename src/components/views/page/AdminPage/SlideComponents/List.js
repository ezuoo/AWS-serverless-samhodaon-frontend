import React from 'react'
import axios from 'axios'

import {Row} from 'antd'

import ImageSlider from './ImageSlider'
import ImageUpload from './ImageUpload'

function List() {
    /** dataSource : Object
     *  no : Number : default and static 1 
     *  image: Array 
     *  limit : Number : default 1
     */
    const [dataSource, setDataSource] = React.useState(null);
  

    const fetchImage = async () => {
        const result = await (await axios.get('/api/slides')).data
        setDataSource(result.data.length === 0 ? {no: 1, image: [], limit: 1} : result.data[0]);
    }

    React.useEffect(() => {
        fetchImage();
    }, [])
    
    return (
        <>
            <div id="admin-slides-slider-container">
                {dataSource !== null && dataSource.image.length !== 0 && (
                        <div id="admin-slides-slider-content">
                            <div id="slide-view-container">
                                <div id="slide-view-content">
                                    {dataSource !== null && <ImageSlider image={dataSource.image} />}
                                </div>
                            </div>
                        </div>
                    )
                }
                
                <Row id="admin-slides-upload">
                    {dataSource !== null && <ImageUpload dataSource={dataSource} setDataSource={setDataSource} /> }  
                </Row>
            </div>    
        </>
    )
}

export default React.memo(List)
