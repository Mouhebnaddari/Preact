import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Form, Input, Space} from 'antd';
import React, {useCallback, useRef, useState} from "react";
import {orchestrator} from "../services/jobService";
import 'antd/dist/antd.min.css'
import '../App.css';
import "@fontsource/ubuntu-mono";
import Cron from "react-js-cron";

const Orchestrator = () => {
    const [jobs, setJobs] = useState([])
    const [hostnames, setHostnames] = useState([])
    const defaultValue = "* * * * *"
    const [cronExpression, setCronExpression] = useState(defaultValue)
    const [error, onError] = useState()
    const inputRef = useRef(null)
    const customSetCronExpression = useCallback(newValue => {
        setCronExpression(newValue)
        inputRef.current?.setValue(newValue)
    }, [inputRef])
    const submit = async () => {
        try {
            const data = {
                cronExpression,
                orchestration: []
            }
            for (let index = 0; index < jobs.length; index++) {
                data.orchestration.push({order: index, job: jobs[index], hostname: hostnames[index]})
            }
            await orchestrator(data)
        } catch (error) {
            console.error(error)
        }
    }
    function handleJob(i, event) {
        const values = [...jobs];
        values[i] = event.target.value;
        setJobs(values);
    }
    function handleHostname(i, event) {
        const values = [...hostnames];
        values[i] = event.target.value;
        setHostnames(values);
    }
    return (
        <Form name="dynamic_form_nest_item" onFinish={submit} autoComplete="off">
            <Form.List name="users">
                {(fields, {add, remove}) => (
                    <>
                        {fields.map(({key, name, ...restField}) => (
                            <Space
                                key={key}
                                style={{
                                    display: 'flex',
                                    marginBottom: 8,
                                }}
                                align="baseline"
                            >
                                <Form.Item
                                    {...restField}
                                    name={[name, 'jobs']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Missing jobs names',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Job Name"
                                           value={jobs || ""}
                                           onChange={(e) => handleJob(key, e)}/>
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'hostname']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Missing hostnames',
                                        },
                                    ]}
                                >
                                    <Input placeholder="host Name"
                                           value={hostnames || ""}
                                           onChange={(e) => handleHostname(key, e)}
                                    />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)}/>
                            </Space>
                        ))}
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

                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                Add job
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
export default Orchestrator
