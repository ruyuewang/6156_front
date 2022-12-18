import {Button, Card, Form, Input} from 'antd';
import React from 'react';
import "../../css/login.css"
import {useNavigate} from "react-router-dom";
import {useLoginMutation} from "../../api";

const Login = () => {
    const navigate = useNavigate();
    const handleSignup = () => {
        navigate("/register");

    }
    // call api
    const [userLogin,{isLoading,isFetching,error}] = useLoginMutation();

    const handleLogin = () => {
        userLogin();
        // navigate("/");
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
                        label="E-mail"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your e-mail',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Next >
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>

    );
};

export default Login;