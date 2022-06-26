import {Button, Form, Input, notification} from 'antd';
import React, {useState} from 'react'
import {Content} from "antd/lib/layout/layout";
import axios from "axios";
import "@fontsource/ubuntu-mono";
import 'antd/dist/antd.min.css'
import '../App.css';
import {useNavigate} from "react-router-dom";

const signAPI = "/signup"

export default function Signup() {
    const [isLoading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const submit = async () => {
        setLoading(true);
        try {
            const body = {username, password, email}
            await axios.post(signAPI, body)
            notification.success({
                message: 'Account created successfully'
            });
            navigate('/login')
        } catch (e) {
            console.error(e)
            notification.error({
                message: 'Signup Failed',
            });
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <Content className="site-layout-content">
                <Form form={form} onFinish={submit}
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
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                        value={username}
                        onChange={(e => setUsername(e.target.value))}
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
                    <Form.Item wrapperCol={{offset: 14, span: 20,}}>
                        <Button
                            type="primary" loading={isLoading} htmlType='submit'>
                            Signup
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </div>
    );
};

