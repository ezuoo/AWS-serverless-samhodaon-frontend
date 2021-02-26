import React from 'react';
import { Table, Input, Button, Popconfirm, Form, Space } from 'antd';
import './style.css';



const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = React.useState(false);
  const inputRef = React.useRef(null);
 

  React.useEffect(() => {
    if (editing) {
        console.log('focus')
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    console.log('toggle');
    console.log('key : ',record.key);
    setEditing(!editing);
   /*  setEditingKey(record.key); */
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
    
  };
 
 /*  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  }; */

  let childNode = children;

  if (editable) {
    childNode = editing ? 
    (
      <Form.Item style={{ margin: 0 }} name={dataIndex} rules={[{required: true,message: `${title} is required.`}]}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) 
    : 
    (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

function TableTestAdd () {
    const [dataSource, setDataSource] = React.useState([
        {
          key: '0',
          name: 'Edward King 0',
          age: '32',
          address: 'London, Park Lane no. 0'
        },
        {
          key: '1',
          name: 'Edward King 1',
          age: '32',
          address: 'London, Park Lane no. 1'
        }
      ]);
    const [count, setCount] = React.useState(2);
    
    const [way , setWay] = React.useState('nothing');
    const [editingKey, setEditingKey] = React.useState('');

    const isEditing = (record) => record.key === editingKey;

    const columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: '30%',
        editable: true,
      },
      {
        title: 'age',
        dataIndex: 'age',
      },
      {
        title: 'address',
        dataIndex: 'address',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) => {
            console.log('way : ', way);
            return dataSource.length >= 1 ? 
            (
                <Space size="middle">
                    <Button onClick={handleEdit(record)}>
                        수정
                    </Button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <a href="#!">삭제</a>
                    </Popconfirm>
                </Space>
            )
            : null
        }
          
      }
    ];

    const components = {
        body: {
          row: EditableRow,
          cell: EditableCell,
        }
    };
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return { ...col, onCell: (record) => ({
             record, 
             editable: col.editable, 
             dataIndex: col.dataIndex,
             title: col.title, 
             handleSave: handleSave})
        };
    });

  const handleEdit = (record) => {
    form.setFieldsValue({ age: '', ...record});
    setEditingKey(record.key);
    console.log('edit :', record)
  }
  const handleDelete = (key) => {
    const data = [...dataSource];
    setDataSource(data.filter((item) => item.key !== key));
    setWay('del');
  };

  const handleAdd = () => {
    const cnt = count;
    const data = dataSource;
    const newData = {
      key: count,
      name: '데이터를 입력해주세요',
      age: '32',
      address: `London, Park Lane no. ${count}`
    };
    setCount(cnt + 1);
    setDataSource([...data, newData])
    setWay('add');
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData)
    setWay('save');
  };
  
     
  return (
      <div>
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16}}>
          Add a row
        </Button>
        <Table 
            components={components} 
            rowClassName={() => 'editable-row'} 
            bordered 
            dataSource={dataSource} 
            columns={mergedColumns} 
        />
      </div>
    );
}

export default React.memo(TableTestAdd)