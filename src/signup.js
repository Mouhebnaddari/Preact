import {Button, Form, Input, notification} from 'antd';
import {sign} from "./services/jobService";
import React, {useState} from 'react'
import {Content} from "antd/lib/layout/layout";
import "@fontsource/ubuntu-mono";
import 'antd/dist/antd.min.css'
import './App.css';


export default function Signup() {
    const [isLoading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const submit = async () => {
        setLoading(true);
        try {
            await sign(username, password,email)
            notification.success({
                message: 'Account signed up successfully'
            });
            form.resetFields()
        } catch (e) {
            console.error(e)

            notification.error({
                message: 'Signup Failed',
                description: e
            });
        } finally {
            setLoading(false);
        }
    }



    return (
        <div>
            <Content className="site-layout-content">
                <Form  form={form} onFinish={submit}
                       style={{paddingRight: '30%'}}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}

                    //  onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    // autoComplete="off"
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

                    <Form.Item  wrapperCol={{offset: 14, span: 20,}}>
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

