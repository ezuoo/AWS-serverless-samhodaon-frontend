import React from 'react';
import { Table, Input, Button, Popconfirm, Form, Space } from 'antd';
import './style.css';

/**
 * how to render table !
 * 1. column
 * 2. row
 * 3. cells in row in turn
 * 4. next row and then cells
 */
function TableTestAdd () {
    const [form] = Form.useForm();
    const [count, setCount] = React.useState(2);
    const [editingKey, setEditingKey] = React.useState('');
    const [dataSource, setDataSource] = React.useState([
        {
          key: '0',
          name: 'Edward King 0',
          age: '32',
          address: 'London, Park Lane no. 0',
          test: 'test'
        },
        {
          key: '1',
          name: 'Edward King 1',
          age: '32',
          address: 'London, Park Lane no. 1',
          test: 'test'
        }
      ]);

    const EditableContext = React.createContext(null); 
    const isEditing = (record) => record.key === editingKey;

    const EditableRow = ({ index, ...datas }) => {
        
        return (
          <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
              <tr {...datas} />
            </EditableContext.Provider>
          </Form>
        );
    };
      
    const EditableCell = ({ title, editing, children, dataIndex, record, ...restProps }) => {
        const inputRef = React.useRef(null);
        

        const childNode = ( editing === true ? (
            <Form.Item style={{ margin: 0 }} name={dataIndex} rules={[{required: true,message: `${title} is required.`}]}>
                <Input ref={inputRef} />
            </Form.Item>
        ) : (children) );
        
         return <td {...restProps}>{childNode}</td>;
    };

    const handleAdd = () => {
        const cnt = count;
        const data = dataSource;
        const newData = {
            key: count,
            name: '',
            age: '32',
            address: `London, Park Lane no. ${count}`,
            test : 'test'
        };

        form.setFieldsValue({ name: newData.name, ...newData}); 
        setEditingKey(count);
        setCount(cnt + 1);
        setDataSource([...data, newData])
    };    

    const handleEdit = (record) => {
        form.setFieldsValue({ name: record.name, ...record});
        setEditingKey(record.key);
    }

    const handleSave = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...dataSource];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setDataSource(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setDataSource(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleDelete = (key) => {
        const data = [...dataSource];
        setDataSource(data.filter((item) => item.key !== key));
    };

    const handleCancel = () => {
        setEditingKey('');
    };

    const columns = [
        {
          title: 'name',
          dataIndex: 'name',
          width: '30%',
          editable: true
        },
        {
          title: 'age',
          dataIndex: 'age',
          editable: false
        },
        {
          title: 'address',
          dataIndex: 'address',
          editable: false
        },
        {
          title: 'test',
          dataIndex: 'test',
          editable: false
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          render: (_, record) => {
                const editable = isEditing(record);
                return dataSource.length >= 1 ? 
                (
                    editable === true ? 
                    (
                        <Space size="middle">
                            <Button onClick={()=>handleSave(record.key)}>저장</Button>
                            <Button onClick={handleCancel}>취소</Button>
                        </Space>
                    ) 
                    : 
                    (
                        <Space size="middle">
                            <Button onClick={()=>handleEdit(record)}> 수정</Button>
                            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                                 <Button>삭제</Button>
                            </Popconfirm>
                        </Space>
                    )
                    
                )
                : null
          }
            
        }
    ];

    const mergedColumns = columns.map((col) => {        
        if (!col.editable) {
            return col;
        }

        return { ...col, onCell: (record) => ({
                            record, 
                            editing: isEditing(record), 
                            dataIndex: col.dataIndex,
                            title: col.title
                        })
        };
    });

    const components = {
        body: {
        row: EditableRow,
        cell: EditableCell,
        }
    };

    return (
        <div>
            <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16}}>
                Add a row
            </Button>
            <Table 
                bordered 
                columns={mergedColumns} 
                components={components} 
                dataSource={dataSource} 
                rowClassName={() => 'editable-row'} 
            
            />
        </div>
    );
}

export default React.memo(TableTestAdd)