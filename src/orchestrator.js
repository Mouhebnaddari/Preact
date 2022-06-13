import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Form, Input, Space} from 'antd';
import React, {useState} from 'react';
import {orchestrator} from "./services/jobService";
import 'antd/dist/antd.min.css'
import './App.css';
import "@fontsource/ubuntu-mono";

const Orchestrator = () => {
    const [jobs, setJobs] = useState([])
    const [hostnames, setHostnames] = useState([])
    const [cron, setCron] = useState("* * * * *")


    const submit = async () => {
        try {
            const data = {
                cron,
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
                        {fields.map(({ key, name, ...restField }) => (
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
                                            message: 'Missing jobs name',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Job Name"
                                           value={jobs || ""}
                                           onChange={(e) => handleJob(key, e)}/>
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'host']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Missing host name',
                                        },
                                    ]}
                                >
                                    <Input placeholder="host Name"
                                           value={hostnames || ""}
                                           onChange={(e) => handleHostname(key, e)}
                                    />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                Add Job
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

export default Orchestrator;