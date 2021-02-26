import React from 'react'
import axios from 'axios'
import { Form, Select, Button, Input, Tooltip, DatePicker, Row, Col, Modal, message } from 'antd';
import {QuestionCircleOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import DaumPostCode from 'react-daum-postcode';

const width = 700;
const height = 450;
const modalStyle = {
    overflow: "hidden"
}

function OrderPage() {
    const [address, setAddress] = React.useState('');
    const [visible, setVisible] = React.useState(false)
    const formItemLayout = {
      labelCol: {
        span: 9,
      },
      wrapperCol: {
        span: 10,
      },
    };    

    const handleAddress = (data) => {
        let AllAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          AllAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        setAddress(AllAddress)
        setVisible(false);
    }

    const handleOpenPost = () => {
        setVisible(true)
    };

    const onFinish = (values) => {
        values['address'] = address;
        axios.post('/api/orders', values).then((response) => {
            if(response.data.success) {
                message.success(response.data.msg)
                // need redirecting 
            } else {
                console.log(false)
            }
        })
    };
    
    return (
        <div className='user-order-container'>
            <h2>견적문의</h2>

            <div className='user-order-content'>
                <Form name="validate_other" {...formItemLayout} onFinish={onFinish} requiredMark={false} size='large'>
                    <Form.Item name="name" hasFeedback wrapperCol={{span: 7}} label={ <span>고객명</span>} 
                    rules={[{required: true, message: '이름을 입력해주세요', whitespace: true}]}>
                        <Input style={{ width: '100%' }}/>
                    </Form.Item>

                    <Form.Item name="contact" hasFeedback label='연락처' wrapperCol={{span: 7}}
                                rules={[{required: true, message: '연락처를 입력해주세요', whitespace: true}]}>
                        <Input style={{ width: '100%' }} placeholder='- 를 제외하고 입력해주세요' />
                    </Form.Item>

                    <Form.Item name="email" hasFeedback label='이메일' wrapperCol={{span: 7}}
                        rules={[{ type: 'email', message: '이메일 형식으로 입력해주세요'}, {required: true, message: '이메일을 입력해주세요', whitespace: true}]}>
                        <Input style={{ width: '100%' }}/>
                    </Form.Item>

                    <Form.Item name="address" label='주거지역' wrapperCol={{span: 10}}>
                        <Row gutter={8}>
                            <Col span={23}>
                                <Input value={address} style={{ width: '100%' }} onClick={handleOpenPost} />
                            </Col>
                            <Col span={1}>
                                <Button onClick={handleOpenPost}><span>우편번호 찾기</span></Button>
                                
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item name="expected_date" hasFeedback label='공사 예상 날짜'  wrapperCol={{span: 5}}
                        rules={[{required: true, message: '예정날짜를 입력해주세요'}]}>
                        <DatePicker style={{width: '100%'}}/>
                    </Form.Item>

                    <Form.Item name="expected_price" hasFeedback label='공사 예상 비용' wrapperCol={{span: 7}}
                                rules={[{required: true, message: '공사 예상 금액을 선택헤주세요'}]}>
                        <Input style={{width: '100%'}} placeholder='공사 예상 금액을 입력해주세요' /> 
                    </Form.Item>

                    <Form.Item name="area" hasFeedback label="평형대" wrapperCol={{span: 7}} rules={[{required: true, message: '평형대를 선택헤주세요'}]}>
                        <Select placeholder="평형대를 선택해주세요.">
                            <Select.Option value="20평대">20평대</Select.Option>
                            <Select.Option value="30평대">30평대</Select.Option>
                            <Select.Option value="40평대">40평대</Select.Option>
                            <Select.Option value="50평대">50평대</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="papering" hasFeedback label="도배"
                                rules={[{required: true, message: '도배를 선택해주세요', type: 'array'}]}>
                        <Select mode="multiple" placeholder="도배를 선택해주세요.">
                            <Select.Option value="선택안함">선택안함</Select.Option>
                            <Select.Option value="전체 실크벽지">전체 실크벽지</Select.Option>
                            <Select.Option value="전체 광폭합지">전체 광폭합지</Select.Option>
                            <Select.Option value="거실, 주방실크 + 방 광폭합지">거실, 주방실크 + 방 광폭합지</Select.Option>
                        </Select>
                    </Form.Item>
                    
                    <Form.Item name="flooring" hasFeedback label="바닥재" 
                                 rules={[{required: true, message: '바닥재를 선택해주세요', type: 'array'}]}>
                        <Select mode="multiple" placeholder="바닥재를 선택해주세요">
                            <Select.Option value="선택안함">선택안함</Select.Option>
                            <Select.Option value="전체 강마루">전체 강마루</Select.Option>
                            <Select.Option value="전체 강화마루">전체 강화마루</Select.Option>
                            <Select.Option value="전체 온돌마루">전체 온돌마루</Select.Option>
                            <Select.Option value="전체 장판">전체 장판</Select.Option>
                            <Select.Option value="거실, 주방타일 + 방 마루">거실, 주방타일 + 방 마루</Select.Option>
                            <Select.Option value="거실, 주방마루 + 방 장판">거실, 주방마루 + 방 장판</Select.Option>
                            <Select.Option value="기존 마루 철거 및 샌딩">기존 마루 철거 및 샌딩</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="finishing_material" hasFeedback  label={ <span>마감재 공사&nbsp;&nbsp;
                            <Tooltip title="※ 시공범위 : 방문, 문틀, 몰딩, 대문 내부, 내부창문외 목재시공면 마감">
                                <ExclamationCircleOutlined />
                            </Tooltip></span>} 
                            rules={[{required: true, message: '마감재를 선택해주세요', type: 'array'}]}>
                        <Select mode="multiple" placeholder="마감재를 선택해주세요">
                            <Select.Option value="선택안함">선택안함</Select.Option>
                            <Select.Option value="친환경 페인트">친환경 페인트</Select.Option>
                            <Select.Option value="락카 페인트">락카 페인트</Select.Option>
                            <Select.Option value="필름">필름</Select.Option>
                            <Select.Option value=">발코니 탄성코트">발코니 탄성코트</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="light" hasFeedback label="전기 조명" 
                                rules={[{ required: true, message: '조명을 선택해주세요', type: 'array'}]}>
                        <Select mode="multiple" placeholder="조명을 선택해주세요">
                            <Select.Option value="선택안함">선택안함</Select.Option>
                            <Select.Option value="배선공사">배선공사</Select.Option>
                            <Select.Option value="조명, 콘센트 이동 및 신설">조명, 콘센트 이동 및 신설</Select.Option>
                            <Select.Option value="벽걸이TV 배선매립">벽걸이TV 배선 매립</Select.Option>
                            <Select.Option value="조명기구교체">조명 기구 교체</Select.Option>
                            <Select.Option value="콘센트, 스위치커버교체">콘센트, 스위치 커버 교체</Select.Option>
                            <Select.Option value="비디오폰">비디오폰</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="furniture" hasFeedback label="제작 가구" 
                                rules={[{required: true, message: '가구를 선택해주세요', type: 'array'}]}>
                        <Select mode="multiple" placeholder="가구를 선택해주세요">
                            <Select.Option value="선택안함">선택안함</Select.Option>
                            <Select.Option value="부엌 가구">부엌 가구</Select.Option>
                            <Select.Option value="아일랜드식탁">아일랜드식탁</Select.Option>
                            <Select.Option value="신발장">신발장</Select.Option>
                            <Select.Option value="붙박이장">붙박이장</Select.Option>
                            <Select.Option value="창고수납장">창고수납장</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="tile" hasFeedback label="타일 공사" 
                                rules={[{required: true, message: '타일을 선택해주세요', type: 'array'}]}>
                        <Select mode="multiple" placeholder="타일을 선택해주세요">
                            <Select.Option value="선택안함">선택안함</Select.Option>
                            <Select.Option value="주방 타일">주방 타일</Select.Option>
                            <Select.Option value="현관 타일">현관 타일</Select.Option>
                            <Select.Option value="발코니 타일">발코니 타일</Select.Option>
                            <Select.Option value="다용도실 타일">다용도실 타일</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="bathroom" hasFeedback label="욕실 공사" 
                                rules={[{required: true, message: '욕실공사를 선택해주세요', type: 'array'}]}>
                        <Select mode="multiple" placeholder="욕실공사를 선택해주세요">
                            <Select.Option value="선택안함">선택안함</Select.Option>
                            <Select.Option value="샤워부스">샤워부스</Select.Option>
                            <Select.Option value="파티션">파티션</Select.Option>
                            <Select.Option value="욕조">욕조</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="expansion" hasFeedback label="확장 공사" 
                                rules={[{required: true, message: '확장공사를 선택해주세요', type: 'array'}]}>
                        <Select mode="multiple" placeholder="확장공사를 선택해주세요">
                            <Select.Option value="선택안함">선택안함</Select.Option>
                            <Select.Option value="거실">거실</Select.Option>
                            <Select.Option value="주방">주방</Select.Option>
                            <Select.Option value="방">방</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="chassis" hasFeedback label="샤시 공사" 
                                rules={[{required: true, message: '샤시공사를 선택해주세요', type: 'array'}]}>
                        <Select mode="multiple" placeholder="샤시공사를 선택해주세요">
                            <Select.Option value="선택안함">선택안함</Select.Option>
                            <Select.Option value="전체">전체</Select.Option>
                            <Select.Option value="내부">내부</Select.Option>
                            <Select.Option value="외부">외부</Select.Option>
                            <Select.Option value="부분">부분</Select.Option>
                            <Select.Option value="샤시리폼(필름)">샤시리폼 (필름)</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="woodwork" hasFeedback label="목공사" 
                                rules={[{required: true, message: '목공사를 선택해주세요', type: 'array'}]}>
                        <Select mode="multiple" placeholder="목공사를 선택해주세요">
                            <Select.Option value="선택안함">선택안함</Select.Option>
                            <Select.Option value="몰딩">몰딩</Select.Option>
                            <Select.Option value="중문">중문</Select.Option>
                            <Select.Option value="문틀리폼">문틀리폼</Select.Option>
                            <Select.Option value="문틀교체">문틀교체</Select.Option>
                            <Select.Option value="슬라이드 도어">슬라이드 도어</Select.Option>
                            <Select.Option value="평면타입 등박스">평면타입 등박스</Select.Option>
                            <Select.Option value="우물형 등박스">우물형 등박스</Select.Option>
                            <Select.Option value="간접 등박스">간접 등박스</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="artwall" hasFeedback label="아트월"
                                rules={[{required: true, message: '아트월을 선택해주세요', type: 'array'}]}>
                        <Select mode="multiple" placeholder="아트월을 선택해주세요">
                            <Select.Option value="선택안함">선택안함</Select.Option>
                            <Select.Option value="타일 아트월">타일 아트월</Select.Option>
                            <Select.Option value="대리석 아트월">대리석 아트월</Select.Option>
                            <Select.Option value="웨인스콧팅 아트월">웨인스콧팅 아트월</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="etc" hasFeedback label="기타 공사" 
                                rules={[{required: true, message: '기타공사를 선택해주세요', type: 'array'}]}>
                        <Select mode="multiple" placeholder="기타공사를 선택해주세요">
                            <Select.Option value="선택안함">선택안함</Select.Option>
                            <Select.Option value="현관 자동키">현관 자동키</Select.Option>
                            <Select.Option value="방문 손잡이">방문 손잡이</Select.Option>
                            <Select.Option value="입주 청소">입주 청소</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="styling" hasFeedback label={ <span>홈 스타일링&nbsp;
                            <Tooltip title="인테리어와 어울리게 가구, 침구, 커튼, 소품등을 데코해 줌으로서 보다 완성도 있는 인테리어공간 연출을 의미합니다.">
                                <QuestionCircleOutlined />
                            </Tooltip></span>} 
                            rules={[{required: true, message: '홈 스타일링을 선택해주세요', type: 'array'}]}>
                        <Select mode="multiple" placeholder="홈 스타일링을 선택해주세요">
                            <Select.Option value="선택안함">선택안함</Select.Option>
                            <Select.Option value="전체">전체</Select.Option>
                            <Select.Option value="부분">부분</Select.Option>
                        </Select>
                    </Form.Item>
              
                    <Form.Item name='qna' label="문의 사항">
                        <Input.TextArea style={{ width: '100%' }}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 15, offset: 12 }}>
                        <Button htmlType="submit">문의하기</Button>
                    </Form.Item>
                </Form>
                {
                    visible ? (
                        <Modal title="우편주소 찾기" 
                                centered 
                                visible={visible}
                                width={750}
                                onCancel={()=>setVisible(false)}
                                footer={null}>
                                
                            <DaumPostCode onComplete={handleAddress} width={width} height={height} style={modalStyle}/>
                        </Modal>
                    ) : null
                }
            </div>
        </div>
    )
}

export default React.memo(OrderPage)

