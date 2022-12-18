import {
    Button, Card,
    Form,
    Input,
} from 'antd';
import React from 'react';
import "../../css/register.css"
import {useNavigate} from "react-router-dom";

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
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const handleLogin = () => {
        navigate("/login")
    }
    return (
        <div className="register">
            <Card
                style={{
                    width: 500,
                }}
                title="Sign Up"
                extra={<Button onClick={handleLogin}>Login</Button>}
            >
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please enter your E-mail',
                            },
                        ]}
                    >
                        <Input placeholder="E-mail must be gmail"/>
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