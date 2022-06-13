import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import React from 'react';
import {useState} from "react";
import {orchestrator} from "./services/jobService";
import 'antd/dist/antd.min.css'
import './App.css';
import "@fontsource/ubuntu-mono";

const Orchestrator = () => {
    const [job, setJob] = useState("")
    const [hostname, setHostname] = useState("")
    const submit =async () => {
        try{
            await orchestrator(job,hostname)

        }catch (error){
            console.error(error)
        }
    }
    function handleChange(i, event) {
        const values = [...job];
        values[i] = event.target.value;
        setJob(values);
    }
    function handle(i, event) {
        const values = [...hostname];
        values[i] = event.target.value;
        setHostname(values);
    }


    return (
        <Form name="dynamic_form_nest_item" onFinish={submit} autoComplete="off">
            <Form.List name="users">
                {(fields, { add, remove }) => (
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
                                    name={[name, 'job']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Missing job name',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Job Name"
                                           value={job || ""}
                                           onChange={(e) => handleChange(key, e)} />
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
                                           value={hostname || ""}
                                           onChange={(e) => handle(key, e)}
                                    />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add field
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