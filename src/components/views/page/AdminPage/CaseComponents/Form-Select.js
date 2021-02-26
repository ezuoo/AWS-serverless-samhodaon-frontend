import React from 'react'
import { Controller } from "react-hook-form";

import {InputLabel, MenuItem, Select, FormControl, Chip, Input} from '@material-ui/core';


const toKR = (name) => {
    switch (name) {
        case 'division':
            return '공간'
        case 'color':
            return '색상'
        case 'area':
            return '평수'
        case 'style':
            return '스타일'
        case 'section':
            return '영역'
        default:
            break;
    }
}

function TestSelect(props) {
    const [selectArray, setSelectArray] = React.useState(props.default === '' ? [] : props.default)

    const handleChange = (data, onChange) => {
        setSelectArray(data);
        onChange(data)
        
    }

    const renderJsx = (onChange, value)=> {
        return props.index > 1 ? 
        ( 
            <FormControl variant="outlined" style={{width: '95%', padding: '0.2rem', marginBottom: '1rem', marginLeft: '1rem'}} error={props.errorCheck.error}> 
                <InputLabel id={props.field}><span style={{fontSize: '17px'}}>{toKR(props.field)}</span></InputLabel>
                <Select labelId={props.field} value={value = selectArray} onChange={(e)=>handleChange(e.target.value, onChange)} 
                    input={<Input />} multiple 
                    renderValue={(selected) => (
                        <div>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </div>
                    )}
                >
                    <MenuItem value="">
                        <em>선택해주세요</em>
                    </MenuItem>
                    {props.value.map((v,i) => <MenuItem key={i} value={v}>{v}</MenuItem>)}
                </Select> 
            </FormControl>
        ) : (
            <FormControl variant="outlined" style={{width: '50%', padding: '0.2rem', marginBottom: '1rem'}} error={props.errorCheck.error}> 
                <InputLabel id={props.field}><span style={{fontSize: '17px'}}>{toKR(props.field)}</span></InputLabel>
                <Select label={toKR(props.field)} labelId={props.field} defaultValue={props.default} onChange={(e)=>onChange(e.target.value)}>
                    <MenuItem value="">
                        <em>선택해주세요</em>
                    </MenuItem>
                    {props.value.map((v,i) => <MenuItem key={i} value={v}>{v}</MenuItem>)}
                </Select>
            </FormControl>
        )
    }
    return (
            <>
                <Controller name={props.field} 
                            control={props.control} 
                            defaultValue={props.default} 
                            rules={{ validate: (value) => value !== "" }}
                            render={({onChange, value}) => (
                               renderJsx(onChange, value)
                            )}
                />
            </>
    )
}

export default React.memo(TestSelect)
