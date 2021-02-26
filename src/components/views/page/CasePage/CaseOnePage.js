import React from "react";
import axios from 'axios';
import DOMPurify from 'dompurify';

import {message, Descriptions, Badge} from 'antd'

function CaseOnePage(props) {
  const [dataSource, setDataSource] = React.useState(null);
  const fetchData = async () => {
    const ret = await (await axios.get(`/api/cases/${props.match.params.caseId}`)).data;

    if(!ret.success) {
      message.error(ret.msg);
      window.history.back();
    } else {
      setDataSource(ret.data);
    }
  }
  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }
  React.useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
    {dataSource !== null && (
      <div>
        <div className='user-case-top-image'>
            <span>Image</span>
        </div>

        <div style={{ width: "76%", margin: "3rem auto"}}>
          <h2>{dataSource.title}</h2>
          <hr />
          <Descriptions size="small" layout="horizontal" bordered className="ant-descriptions-container">
              {/* division */}
              <Descriptions.Item label="공간">{dataSource.division}</Descriptions.Item>
              {/* area */}
              <Descriptions.Item label="평형대">{dataSource.area}평대</Descriptions.Item>
              {/* office */}
              <Descriptions.Item label="지점">{dataSource.office}</Descriptions.Item>

              {/* color */}
              <Descriptions.Item label="색상">{dataSource.color.map(x => `${x} `)} </Descriptions.Item>
              {/* section */}
              <Descriptions.Item label="영역">{dataSource.section.map(x => `${x} `)}</Descriptions.Item>
              {/* style */}
              <Descriptions.Item label="스타일">{dataSource.style.map(x => `${x} `)}</Descriptions.Item>
              
              {/* best */}
              <Descriptions.Item label="베스트">
                  <Badge status={dataSource.best ? "success": "error"} text={dataSource.best ? "Yes": "No"} />
              </Descriptions.Item>

              {/* date */}
              <Descriptions.Item label="등록 날짜" span={2}>{dataSource.date}</Descriptions.Item>
          
              {/* info */}
              <Descriptions.Item label="세부내용" span={3}><div style={{textAlign: 'left'}}>{dataSource.info}</div></Descriptions.Item>

              {/* content */}
              <Descriptions.Item label="내용" span={3}>
                  <div style={{textAlign: 'left'}} dangerouslySetInnerHTML={createMarkup(dataSource.content)}></div>
              </Descriptions.Item>

          </Descriptions>
        </div>
      </div>
    )}
    </>
  );
}

export default CaseOnePage;
