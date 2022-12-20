import {Button, Card, Form, Input} from 'antd';
import React from 'react';
import "../../css/login.css"
import {useNavigate} from "react-router-dom";
import { useGetUserMutation } from "../../api";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import {useDispatch} from "react-redux";
import {setCredentials} from "../../store/authSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // call api
    const [getUser] = useGetUserMutation();

    return (
        <div className="login">
            <Card
                style={{
                    width: 500
                }}
                title="Login"
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
                >
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <GoogleOAuthProvider clientId="723192346294-d3pc4uk4ss19t4n34g833434vcc8bene.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={async credentialResponse => {
                                    let decoded = jwt_decode(credentialResponse.credential);
                                    console.log(decoded.email);
                                    dispatch(setCredentials({email: decoded.email}));
                                    // check if the user in the database
                                    const user_res = await getUser({email:decoded.email});
                                    if(user_res.error) {
                                        console.log("user not found");
                                        navigate('/register');
                                    } else {
                                        console.log("user found");
                                        navigate('/');
                                    }

                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </GoogleOAuthProvider>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;