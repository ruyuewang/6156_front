import React, {useState} from 'react';
import "../../css/profile.css"
import {Descriptions, Button, Modal, Form, Input} from "antd";
import {MailOutlined, UserOutlined} from '@ant-design/icons';
import {Menu} from 'antd';
import {
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetUser2Query
} from "../../api";
import Table from '../table/Table';
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/authSlice";
import {useNavigate} from "react-router-dom";
import Review from "../review/Review";


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
    getItem('Profile', 1, <UserOutlined/>),
    getItem('Contact', 2, <MailOutlined/>),
    getItem('Review', 3, <MailOutlined/>)
];

function Profile() {
    const navigate = useNavigate();
    // get the current user email
    const user_email = useSelector(selectCurrentUser);
    // call api
    const {data:user, isFetching} = useGetUser2Query({email: user_email});
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

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
        setIsFormModalOpen(true);
        form.setFieldsValue({
            email: user.email,
            username: user.username,
            lastName: user.last_name,
            firstName: user.first_name,
            middleName: user.middle_name
        });
    };
    const handleFormOk = () => {
        setIsFormModalOpen(false);
        form.validateFields()
            .then((values) => {
                form.resetFields()
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
        deleteUser({email: user_email});
        navigate('/login');
    };

    let content = "";
    if(!isFetching) {
        switch(tab) {
            case "1":
                content = (
                    <div>
                        <Descriptions title={<h1>Profile</h1>} column={1}
                                      extra={<div>
                                          <Button danger type={"primary"} onClick={handleDeleteUser}>Delete</Button>
                                          <Button type={"primary"} onClick={handleEditUser}
                                                  style={{marginLeft: 7}}>Edit</Button>
                                      </div>}>
                            <Descriptions.Item label="E-mail" labelStyle={labelStyle}>{user.email}</Descriptions.Item>
                            <Descriptions.Item label="Username" labelStyle={labelStyle}>{user.username}</Descriptions.Item>
                            <Descriptions.Item label="Last Name"
                                               labelStyle={labelStyle}>{user.last_name}</Descriptions.Item>
                            <Descriptions.Item label="Middle Name"
                                               labelStyle={labelStyle}>{user.middle_name}</Descriptions.Item>
                            <Descriptions.Item label="First Name"
                                               labelStyle={labelStyle}>{user.first_name}</Descriptions.Item>
                        </Descriptions>
                    </div>
                )
                break;
            case "2" :
                content = (<div><Table/></div>)
                break;
            case "3":
                content = (
                    <div>
                        <h1>Review</h1>
                        <Review/>
                    </div>
                )
        }
    }
    return isFetching?"Loading" : (
        <div className="profile">
            <div className="menu">
                <Menu
                    onClick={handleChangeTab}
                    style={{width: 230}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    items={items}
                />
            </div>
            <div className="content-profile">
                {
                   content
                }
            </div>

            {/* Edit Modal */}
            <Modal title="Edit Info" open={isFormModalOpen} onOk={handleFormOk} onCancel={handleFormCancel} centered>
                <Form labelCol={{span: 5}} form={form}>
                    <Form.Item
                        label="E-mail"
                        name="email"
                    >
                        <Input/>
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