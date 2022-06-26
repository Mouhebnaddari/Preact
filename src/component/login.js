import React, {useEffect, useState} from "react";
import {Button, Form, Input, notification} from "antd";
import {Content} from "antd/lib/layout/layout";
import "@fontsource/ubuntu-mono";
import 'antd/dist/antd.min.css'
import '../App.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import useToken from "./token";

const loginAPI = '/login'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const {token, setToken} = useToken();

    useEffect(() => {
        if (token) {
            navigate('/monitoring')
        }
    }, [])


    const auth = async () => {
        setLoading(true)
        try {
            const {data} = await axios.post(loginAPI, {
                email: email,
                password: password
            });
            setToken(data.token)
            navigate('/monitoring')
        } catch (error) {
            if (error.response) {
                notification.error({
                    message: error.response.data.message
                })
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <Content className="site-layout-content">
                <Form form={form} onFinish={auth}
                      style={{paddingRight: '30%'}}
                      name="basic"
                      labelCol={{
                          span: 8,
                      }}
                      wrapperCol={{
                          span: 16,
                      }}
                >
                    <Form.Item
                        label="Email"
                        name="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                        value={email}
                        onChange={(e => setEmail(e.target.value))}
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
                        value={password}
                        onChange={(e => setPassword(e.target.value))}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 14, span: 20,}}>
                        <Button
                            type="primary" loading={isLoading} htmlType='submit'>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </div>
    );
}
