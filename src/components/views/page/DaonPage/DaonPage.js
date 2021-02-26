import React from "react";

const { kakao } = window;

function DaonPage() {
  React.useEffect(() => {
    const container = document.getElementById('map');
    const options = { center: new kakao.maps.LatLng(37.39061345388657, 126.9650789389364), level: 3};
    const map = new kakao.maps.Map(container, options);
    
    var markerPosition  = new kakao.maps.LatLng(37.39061345388657, 126.9650789389364); 
    var marker = new kakao.maps.Marker({position: markerPosition});
    marker.setMap(map);

  }, []);

 
  return (
    <>
      <div>
          <div className='user-daon-container'>
              <div className='user-daon-top-image'>
                  <span>Image</span>
              </div>

              <h2>회사 소개</h2>
              <hr />
              
              <div className='user-daon-content'>
                <p>
                저희 다온인테리어는 약 20년간의 경험을 바탕으로 클라이언트와 협의를 통해 책임시공 하며 결과물로 보여드리고 있습니다.
                </p>
                <br />
                <p>인테리어 공사는 한 사람 인생에 평균 한, 두번 발생하는 큰 일중에 하나 입니다. </p>
                
                <br />
                <p>누구에게나 꾸미고 싶은 집의 모습과 로망을 듣고 방향성을 제시하고 함께 상의하며 갈피를 잡아드리겠습니다.</p>
                
                <br />
                <p>한 번의 공사로 평생을 깔끔하게, 누구보다 꼼꼼하고 최고의 만족을 위해 최선을 다하겠습니다.</p>
              </div>
              
              <div className='user-daon-map-container'>
                <div className='user-daon-map-content' id='map'>
                </div>
              </div>
              
              <br />
          </div>
      </div>
        
    </>
  );
}

export default DaonPage;
