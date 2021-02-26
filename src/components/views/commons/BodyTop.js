import React from "react";
import axios from 'axios';
import {Carousel} from 'antd'

import '../../css/user.css';

function BodyTop() {
  const [dataSource, setDataSource] = React.useState(null);

  const fetchData = async () => {
    const response = await (await axios.get('/api/slides')).data;
    
    setDataSource(response.data[0].image);
  }

  React.useState(() => {
    fetchData();
  },[]);
   
  return (
    <div>
      {dataSource !== null && (
        <Carousel dots={false} autoplay style={{width: "100%",height: "350px"}}>
        {dataSource.map((v,i) => {
            return (<div key={i}>
              <img src={v} alt={i} style={{width: '100%', height: '350px'}}/>
            </div>);
        })}
        </Carousel>
      )}
    </div>
  );
}

export default React.memo(BodyTop);
