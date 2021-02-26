import React from 'react'
import axios from 'axios'
import { Menu,Tag, Typography } from 'antd';


const menuData = ['area', 'color', 'division', 'section', 'style'];

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

const styles = { backgroundColor: 'white', overflow: 'auto' };

let arr = [];

function SideBar(props) {
    const [elements, setElements] = React.useState();
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [param, setParam] = React.useState([]);

    const fetchElements = React.useCallback(async () => {
        const ret = await axios.get('/api/elements');
        setElements(ret.data.data[0]);
      }, []);
    
    const objectToQuerystring =  (menu, tag, checked) => {
        if (checked) {
            arr[menu] = Object.keys(param).indexOf(menu) !== -1 ? [...param[menu], tag] : [tag];
             setParam(arr);
          } else {
            for (let [key, value] of Object.entries(arr)) {
              if (menu === key) {
                value.splice(value.indexOf(tag), 1);
                value.length === 0 ? delete arr[menu] : arr[menu] = value;
                 setParam(arr);
              }
            }
          }
        return Object.keys(arr).reduce(function (str, key, i) {
        var delimiter, val;
        delimiter = (i === 0) ? '?' : '&';
        key = encodeURIComponent(key);
        val = encodeURIComponent(arr[key]);
        return [str, delimiter, key, '=', val].join('');
        }, '');

    }
   
    const onTagChange =  (menu, tag, checked) => { /** if tag is checked, fetch case data */
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        const queryString =  objectToQuerystring(menu, tag, checked);

        setSelectedTags(nextSelectedTags);    
        axios.get('/api/cases' + queryString).then( res => props.setCaseData(res.data.data));    
    }


    React.useLayoutEffect(() => {
        fetchElements();
    }, [fetchElements]);
    
    return (
            <Menu mode="inline" className='user-cases-row-left' inlineIndent={1}>
               {elements && 
                    menuData.map( (menu, index) => {
                        let key = `sub${index+1}`;
                         return (
                            <Menu.SubMenu key={key} title={toKR(menu)} style={{borderBottom: '0.1rem solid #cccccc'}}>
                                <Menu.Item key={index+1} style={styles}>
                                {elements[menu].map(element => {
                                        return (
                                            <Tag.CheckableTag 
                                                    key={element} 
                                                    checked={selectedTags.indexOf(element) > -1}
                                                    onChange={checked => onTagChange(menu, element, checked)}
                                                    style={{ marginLeft: '0.5rem'}}>
                                                
                                                <Typography.Text style={{fontSize: '14px'}}>{element}</Typography.Text>
                                            </Tag.CheckableTag> 
                                        )
                                    }) 
                                }
                                </Menu.Item>
                            </Menu.SubMenu>  
                        )  
                    })
                } 
            </Menu>

    )
}

export default React.memo(SideBar)