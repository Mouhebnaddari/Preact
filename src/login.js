import React, {useState} from "react";
import {Button, Form, Input, notification} from "antd";
import {login} from './services/jobService'
import {Content} from "antd/lib/layout/layout";
import "@fontsource/ubuntu-mono";
import 'antd/dist/antd.min.css'
import './App.css';

export default function Login() {
    const [isLoading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const submit = async () => {
        setLoading(true);
        try {
            await login(password, email)
            notification.success({
                message: 'Logged in successfully'
            });
            form.resetFields()
        } catch (e) {
            console.error(e)

            notification.error({
                message: 'Login Failed',
                description: e
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
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </div>
    );
};
