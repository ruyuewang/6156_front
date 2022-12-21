import React, {useState} from 'react';
import {Button, Form, Input, InputNumber, Modal, Table as AntTable} from 'antd';
import {
    useCreateContactMutation,
    useDeleteContactMutation,
    useGetContactQuery,
    useUpdateContactMutation
} from "../../api";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/authSlice";


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
    let inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;
    if(dataIndex === 'kind') {
        inputNode = <Input disabled/>
    }
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
    const current_user = useSelector(selectCurrentUser);
    // call api
    const [updateContact] = useUpdateContactMutation();
    let {data, isFetching} = useGetContactQuery({uid:current_user});
    const [deleteContactAPI] = useDeleteContactMutation();

    let dataWithKey = [];
    if(!isFetching) {
        dataWithKey = data.slice().map((item, index)=> {
            return {...item, key: index};
        });
    }
    const [createContact] = useCreateContactMutation();
    // form related
    const [form] = Form.useForm();
    const [addForm] = Form.useForm();
    const [searchForm] = Form.useForm() ;
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const [openAdd, setOpenAdd] = useState(false); // add popup
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);


    // form related
    const editContact = (record) => {
        form.setFieldsValue({
            type: '',
            contact: '',
            kind: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const deleteContact = (record) => {
        //@TODO delete contact
        console.log("delete contact", record);
        deleteContactAPI({...record, uid: current_user});
    };
    const cancel = () => {
        setEditingKey('');
    };
    const saveContact = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...dataWithKey];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                //setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                // setData(newData);
                setEditingKey('');
            }
            console.log("edit contact", row)
            updateContact({...row, uid: current_user});
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
                            onClick={() => saveContact(record.key)}
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
                            onClick={() => editContact(record)}
                        >
                            Edit
                        </Button>&nbsp;
                        <Button type="primary" danger  onClick={() => deleteContact(record)}>Delete</Button>
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
            <h1>Contact</h1>
            <Form form={form} component={false}>
                <AntTable
                    title={() => {
                        return (
                            <div style={{display: "flex", justifyContent: "flex-end"}}>
                                <Button type="primary" onClick={() => setOpenAdd(true)}>Add</Button>&nbsp;
                            </div>
                        )
                    }}
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={dataWithKey}
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
                            addForm.resetFields();
                            createContact({...values, uid:current_user});
                            setOpenAdd(false);
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
