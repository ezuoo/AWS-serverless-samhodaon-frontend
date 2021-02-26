import React from 'react'
import axios from 'axios'
import { Controller } from "react-hook-form";

import {Row, Col} from 'antd';
import {TextField, Checkbox, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';

import Select from './Form-Select'
import ImageUpload from './ImageUpload'


const data = ["area", "division", "color", "style", "section"];
const radio = ["삼호", "다온"]

function TestForm(props) {
    const [elements, setElements] = React.useState(null);

    const handleValue = (name) => {
        if(props.default === undefined) return '';
        return props.default[name] 
    }

    const fetchElements = async () => {
        const response = await axios.get('/api/elements');
        const result = response.data.data[0];
        setElements(result); 
    }

    React.useEffect(() => {
        fetchElements();
    }, [])
    
    return (
        <div>
            {/* title */}
            <div id="form-text-container">
                <Controller name="title" control={props.control} defaultValue={handleValue('title')} rules={{ required: true }}
                            render={({onChange}) => (
                                <TextField  style={{width: '100%'}}
                                            error={props.errorCheck.title.error}
                                            helperText={props.errorCheck.title.msg}
                                            label={<span style={{fontSize: '17px'}}>제목</span>} 
                                            variant="outlined" 
                                            onChange={(e)=>onChange(e.target.value)}
                                            defaultValue={handleValue('title')}
                                           
                                />
                            )}
                />                
            </div>

            <Row>
                {/* office and best */}
                <Col span={10} id="form-left-container">
                    <Row id="form-left-content">
                        <Col span={12}>
                            <label id="form-radio-check-label">지점</label>
                            <div id="form-radio-check-container">
                                <Controller name="office" control={props.control} defaultValue={handleValue('office')} render={({onChange, value}) => (
                                            <RadioGroup aria-label="지점" defaultValue={handleValue('office')} value={value} onChange={onChange} >
                                                {radio.map((v, i) => {
                                                    return handleValue('office') === v ? 
                                                    (<FormControlLabel key={i} value={v} control={<Radio size='small' />} label={v} />) 
                                                    : 
                                                    (<FormControlLabel key={i} value={v} control={<Radio size='small' />} label={v} />)
                                                })}
                                            </RadioGroup>
                                )}/>                
                            </div>
                        </Col>
                        <Col span={12}>
                            <label id="form-radio-check-label">베스트</label>
                            <div id="form-radio-check-container">
                                <Controller name="best" control={props.control} defaultValue={handleValue('best') === '' ? false : handleValue('best')} render={({onChange, value}) => (
                                                <Checkbox checked={value} onChange={(e)=>onChange(e.target.checked)} />
                                            )}
                                />
                            </div>
                        </Col>
                    </Row> 
                </Col>

                {/* 셀렉트문 반복 */}
                <Col span={14}>
                    <div id="form-text-container">
                        {(elements !== null) && data.map( (value, index) => {
                                return <Select key={index} index={index} default={handleValue(value)} field={value} value={elements[value]} control={props.control} errors={props.errors} errorCheck={props.errorCheck[value]} />
                            })
                        }
                    </div>
                </Col>
            </Row>         
            
            <div id="form-image-container">
                <label id="form-radio-check-label">메인이미지</label>
                <ImageUpload image={(Object.keys(props.image).length === 0) ? [] : Object.values(props.image)[0]} setImage={props.setImage} default={handleValue('image')} />
            </div>

            {/* info */}
            <div id="form-text-container">
                <Controller name="info" control={props.control} defaultValue={handleValue('info')} rules={{ required: true }}
                            render={({onChange}) => (
                                    <TextField  style={{width: '100%'}}
                                                error={props.errorCheck.info.error}
                                                helperText={props.errorCheck.info.msg}
                                                label={<span style={{fontSize: '17px'}}>세부 내용</span>} 
                                                variant="outlined" 
                                                onChange={(e)=>onChange(e.target.value)}
                                                defaultValue={handleValue('info')}
                                    />
                            )}
                />                
            </div>
        
        </div>
    )
}

export default React.memo(TestForm)
