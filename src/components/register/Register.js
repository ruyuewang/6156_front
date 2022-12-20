import {
    Button, Card,
    Form,
    Input,
} from 'antd';
import React, {useEffect} from 'react';
import "../../css/register.css"
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/authSlice";
import {useCreateUserCompositeMutation} from "../../api";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Register = () => {
    const navigate = useNavigate();
    // get current user email
    const user_email = useSelector(selectCurrentUser);
    // call api
    const [createUser,{isLoading,isFetching,error}] = useCreateUserCompositeMutation();
    // form related
    const [form] = Form.useForm();
    useEffect(()=> {
        form.setFieldValue("email", user_email);
    });
    const submitForm = async() => {
        form.validateFields().then(values => {
            //@TODO call api , add await
            const response = createUser(values);
            console.log("response register", response)
            if(response.error) {
                alert("Fail to register. Please try again")
            } else {
                navigate('/');
            }
        } );
    };

    return (
        <div className="register">
            <Card
                style={{
                    width: 500,
                }}
                title="Fill information"
            >
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    scrollToFirstError
                    onFinish={submitForm}
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your user name',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder="Please input the user name"/>
                    </Form.Item>
                    <Form.Item
                        name="firstname"
                        label="First Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your first name',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder="Please input your first name"/>
                    </Form.Item>
                    <Form.Item
                        name="middlename"
                        label="Middle Name"
                        rules={[
                            {
                                required: false,
                                message: 'Please enter your middle name',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="lastname"
                        label="Last Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your last name',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder="Please input your last name"/>
                    </Form.Item>
                    <Form.Item
                        name="contact"
                        label="Contact"
                        style={{
                            marginBottom: 0,
                        }}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Form.Item
                            name="type"
                        >
                            <Input placeholder="e.g.E-mail" />
                        </Form.Item>
                        <Form.Item
                            name="contact"

                        >
                            <Input placeholder="e.g.123@gmail.com" />
                        </Form.Item>
                        <Form.Item
                            name="kind"
                        >
                            <Input placeholder="e.g.Personal" />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>

    );
};

export default Register;