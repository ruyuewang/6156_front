import React, {useEffect, useState} from 'react';
import "../../css/profile.css"
import {Descriptions, Button, Modal, Form, Input} from "antd";
import {MailOutlined, UserOutlined} from '@ant-design/icons';
import {Menu} from 'antd';
import {useUpdateUserMutation, useDeleteUserMutation, useGetUserByEmailQuery} from "../../api";
import Table from '../table/Table';


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Basic Information', 1, <UserOutlined/>),
    getItem('Contact', 2, <MailOutlined/>)
];

function Profile() {
    // call api
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();
    const {data:user, isFetching} = useGetUserByEmailQuery({email:"xxx123@gmail.com"});
    console.log("profile user", user);

    // tab settings
    const [tab, setTab] = useState("1");
    const handleChangeTab = (e) => {
        setTab(e.key);
    };
    // form modal
    const labelStyle = {fontWeight: "bold"};
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [form] = Form.useForm();
    const handleEditUser = () => {
        // set form values
        form.setFieldsValue({
            email: "lz2761@columbia.edu",
            username: "lz2761@columbia.edu",
            lastName:"Lulu",
            firstName:"Zhang"
        });
        setIsFormModalOpen(true);
    };
    const handleFormOk = () => {
        setIsFormModalOpen(false);
        form.validateFields()
            .then((values) => {
                form.resetFields()
                console.log(values)
                updateUser(values);
            })
    };
    const handleFormCancel = () => {
        setIsFormModalOpen(false);
    };
    // confirm modal
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const handleDeleteUser = () => {
        setIsConfirmModalOpen(true);
    };
    const handleConfirmCancel = () => {
        setIsConfirmModalOpen(false);
    };
    const handleConfirmOk = () => {
        setIsConfirmModalOpen(false);
        deleteUser({email: "445@gmail.com"});
    };

    return (
        <div className="profile">
            <div className="menu">
                <Menu
                    onClick={handleChangeTab}
                    style={{width: 230}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
            </div>
            <div className="content-profile">
                {
                    tab === "1" ?
                        (
                            <div>
                                <Descriptions title={<div className="content-title">Basic Information</div>} column={1}
                                              extra={<div>
                                                  <Button danger type={"primary"} onClick={handleDeleteUser}>Delete</Button>
                                                  <Button type={"primary"} onClick={handleEditUser} style={{marginLeft: 7}}>Edit</Button>
                                              </div>}>
                                    <Descriptions.Item label="E-mail" labelStyle={labelStyle}>email</Descriptions.Item>
                                    <Descriptions.Item label="Username" labelStyle={labelStyle}>username</Descriptions.Item>
                                    <Descriptions.Item label="Last Name" labelStyle={labelStyle}>Alice </Descriptions.Item>
                                    <Descriptions.Item label="Middle Name" labelStyle={labelStyle}>Mary</Descriptions.Item>
                                    <Descriptions.Item label="First Name" labelStyle={labelStyle}>Cummingham</Descriptions.Item>
                                </Descriptions>
                            </div>

                        ) :
                        (<div>
                            <Table/>
                        </div>)
                }
            </div>

            {/* Edit Modal */}
            <Modal title="Edit Info" open={isFormModalOpen} onOk={handleFormOk} onCancel={handleFormCancel} centered>
                <Form labelCol={{span: 5}} form={form}>
                    <Form.Item
                        label="E-mail"
                        name="email"
                    >
                        <Input value="alice"/>
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="username"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Middle Name"
                        name="middleName"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="First Name"
                        name="firstName"
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Delete confirmation modal */}
            <Modal title="Confirmation" open={isConfirmModalOpen} onOk={handleConfirmOk} onCancel={handleConfirmCancel}>
                <p>Are you sure you want to delete your account?</p>
            </Modal>


        </div>
    );
}

export default Profile;