import React, {useRef, useState,useCallback} from 'react'
import Cron from 'react-js-cron'
import {Button, Form, Input, notification} from "antd";
import {Content} from "antd/lib/layout/layout";
import {schedule} from './services/jobService'
import 'antd/dist/antd.min.css'
import './App.css';
import "@fontsource/ubuntu-mono";



export default function Scheduling() {
    const [job, setJob] = useState("")
    const [remote, setRemote] = useState("")
    const [isLoading, setLoading] = useState(false)
    const inputRef = useRef(null)
    const defaultValue = "* * * * *"
    const [cronExpression, setCronExpression] = useState(defaultValue)
    const [error, onError] = useState()
    const [form] = Form.useForm()

    const customSetCronExpression = useCallback(newValue => {
        setCronExpression(newValue)
        inputRef.current?.setValue(newValue)
    }, [inputRef])


    const submit = async () => {
        setLoading(true);
        try {
            await schedule(job, remote, cronExpression)
                notification.success({
                message: 'Job scheduled successfully'
            });
            form.resetFields()
        } catch (e) {
            console.error(e)
            notification.error({
                message: 'Scheduling job error',
                description: e
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Content className="site-layout-content">
                <Form labelCol={{span: 4}} wrapperCol={{span: 16}} form={form} onFinish={submit}>
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
                    <Form.Item style={{paddingLeft: '30%'}}
                               name="cronExpression"
                               rules={[{
                                   required: true,
                                   message: 'Please select a cron!',
                                   validator: () => cronExpression === defaultValue ? Promise.reject() : Promise.resolve()
                               }]}
                    >
                        <Cron value={cronExpression} setValue={customSetCronExpression} onError={onError}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 10, span: 20}}>
                        <Button type="primary" loading={isLoading} htmlType='submit'>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </div>

    );
};