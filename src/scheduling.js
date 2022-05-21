import 'antd/dist/antd.min.css'
import './App.css';
import {Content} from "antd/lib/layout/layout";
import "@fontsource/ubuntu-mono";
import {Button, Form, Input} from "antd";
import {useState} from "react";
import React  from 'react'
import Cron  from 'react-cron-generator'
import 'react-cron-generator/dist/cron-builder.css'






export default function Scheduling() {

    const [job, setJob] = useState("")
    const [remote, setRemote] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [value,setValue] = useState('* * * * * * *')

    const [form] = Form.useForm();
    const submit = async () => {
        setLoading(true);
        setLoading(false);
        form.resetFields()
    }

    return (
<div>
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
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <Cron
                        onChange={(e)=> {setValue({value:e});}}
                        value={value}
                        showResultText={true}
                        showResultCron={true}
                    />
                </Content>
</div>

    );
};