import 'antd/dist/antd.min.css'
import './App.css';
import {call} from "./services/jobService";
import {useState} from "react";
import {Button, Card, Form, Input} from 'antd'
import {Content} from "antd/lib/layout/layout";
import "@fontsource/ubuntu-mono";

export default function App() {
    const [job, setJob] = useState("")
    const [remote, setRemote] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [log, setLog] = useState("")
    const [form] = Form.useForm();

    const submit = async () => {
        setLoading(true);
        const {data} = await call(job, remote)
        setLog(data);
        setLoading(false);
        form.resetFields()
    }

    return (

                <Content className="site-layout-content">
                    <Form labelCol={{span: 8}} wrapperCol={{span: 10}}  form={form} onFinish={submit}>
                        <Form.Item
                            label="Job"
                            name="Job"
                            rules={[{required: true, message: 'Please input the job!',}]}
                            value={job}
                            onChange={(e => setJob(e.target.value))}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Remote"
                            name="Remote"
                            rules={[{required: true, message: 'Please input your Remote!'}]}
                            value={remote}
                            onChange={(e => setRemote(e.target.value))}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 12, span: 20}}>
                            <Button type="primary" loading={isLoading} htmlType='submit'>
                                Run
                            </Button>
                        </Form.Item>
                    </Form>
                    <Card title='Output' >
                            <p className="log">
                                {log}
                            </p>
                    </Card>
                </Content>
    );
};

