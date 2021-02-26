import React from 'react'

import Slider from "react-slick";

import {Image} from 'antd';

import '../css/slick.css';
import '../css/slick-theme.css';

function ImageSlider(props) {

    const settings = {
        customPaging: function(i) {
            return (
              <a href="#!">
                <img src={props.image[i]} style={{width: '100%', height:'70px'}} alt="test" />
              </a>
            );
          },
          dots: true,
          dotsClass: "slick-dots slick-thumb",
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1
    };

    return (
        <Slider {...settings} className="slide-view-size">
            {props.image && props.image.map((v,i) => {
                return (
                    <div key={i}> 
                        <Image src={v} width='100%' height={365}/>
                    </div>
                )
            })}
        </Slider>
    )
}

export default React.memo(ImageSlider)
