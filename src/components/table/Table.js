import React, {useState} from 'react';
import {Button, Form, Input, InputNumber, Modal, Table as AntTable} from 'antd';
import {useCreateContactMutation, useGetContactQuery} from "../../api";

// const originData = [];
// for (let i = 0; i < 100; i++) {
//     originData.push({
//         key: i.toString(),
//         type: `Edrward ${i}`,
//         contact: 32,
//         kind: `London Park no. ${i}`,
//     });
// }
const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
const Table = () => {
    const {data, isFetching} = useGetContactQuery({uid:"xxx123@gmail.com"});
    const [createContact] = useCreateContactMutation();
    const [form] = Form.useForm(); // form
    const [addForm] = Form.useForm(); // add form
    const [searchForm] = Form.useForm() // search form
    // const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const [openAdd, setOpenAdd] = useState(false); // add popup
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

    // form related
    const edit = (record) => {
        form.setFieldsValue({
            type: '',
            contact: '',
            kind: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                // setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                // setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const columns = [
        {
            title: 'Type',
            dataIndex: 'type',
            width: '15%',
            editable: true,
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            width: '25%',
            editable: true,
        },
        {
            title: 'Kind',
            dataIndex: 'kind',
            width: '20%',
            editable: true,
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            width: "40%",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button
                            type="primary"
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}>Save</Button>
                        <Button
                            type="primary"
                            title="Sure to cancel?"
                            onClick={cancel}
                            danger
                        >Cancel</Button>
                  </span>
                ) : (
                    <div>
                        <Button
                            type="primary"
                            disabled={editingKey !== ''}
                            onClick={() => edit(record)}
                        >Edit</Button>&nbsp;
                        <Button type="primary" danger>Delete</Button>
                    </div>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    // search box
    const handleSearch = () => {
        setIsSearchModalOpen(false)
    }
    const handleCancelSearch = () => {
        setIsSearchModalOpen(false)
    }


    return isFetching? "Loading" : (
        <div>
            <h2>Contact</h2>
            <Form form={form} component={false}>
                <AntTable
                    title={() => {
                        return (
                            <div style={{display: "flex", justifyContent: "flex-end"}}>
                                <Button type="primary" onClick={() => setOpenAdd(true)}>Add</Button>&nbsp;
                                <Button type="primary" onClick={() => setIsSearchModalOpen(true)}>Search</Button>
                            </div>
                        )
                    }}
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
            <Modal
                open={openAdd}
                centered
                title="Add new contact"
                okText="Create"
                cancelText="Cancel"
                onCancel={() => {
                    setOpenAdd(false);
                }}
                onOk={() => {
                    addForm
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            createContact({...values, uid:"xxx123@gmail.com"});
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={addForm}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{}}
                >
                    <Form.Item
                        name="type"
                        label="Type"
                        rules={[{required: true, message: 'Please input the type of contact!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="contact"
                        label="Contact"
                        rules={[{required: true, message: 'Please input the contact of contact!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="kind"
                        label="Kind"
                        rules={[{required: true, message: 'Please input the kind of contact!'}]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="Search" open={isSearchModalOpen} onOk={handleSearch} onCancel={handleCancelSearch} centered>
                <Form
                    form={searchForm}
                    layout="vertical"
                    name="search_modal"
                >
                    <Form.Item
                        name="search"
                    >
                        <Input/>
                    </Form.Item>
                </Form>

            </Modal>
        </div>

    );
};
export default Table;
