import {Button, Card, Form, Input} from 'antd';
import React from 'react';
import "../../css/login.css"
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const handleSignup = () => {
        navigate("/register")

    }
    const handleLogin = ()=>{
        navigate("/")
    }
    return (
        <div className="login">
            <Card
                style={{
                    width: 500
                }}
                title="Login"
                extra={<Button onClick={handleSignup}>Sign up</Button>}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                    onFinish={handleLogin}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                        Or <a href="#/register">register now!</a>
                    </Form.Item>
                </Form>
            </Card>
        </div>

    );
};

export default Login;