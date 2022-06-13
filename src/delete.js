import {useEffect, useState} from "react";
import {deleteJob, getUpcoming} from "./services/jobService";
import {Content} from "antd/lib/layout/layout";
import {Table} from "antd";
import React from 'react';
import "@fontsource/ubuntu-mono";
import './App.css';
import 'antd/dist/antd.min.css'
import {DeleteOutlined} from "@ant-design/icons";


export default function Delete() {
    const [inf, setInf] = useState([])
    const fetchInf = async () => setInf(await getUpcoming())
    useEffect(() => {
        fetchInf().catch(console.error)
    }, [])


    return (

        <Content className="site-layout-content">
            <h1> DELETE A JOB </h1>
            <Table columns={columns} dataSource={inf}/>
        </Content>


    );
};


const columns = [
    {
        title: 'Job',
        dataIndex: 'job',
        key: 'job'
    },
    {
        title: 'Hostname',
        dataIndex: 'hostname',
        key: 'hostname'
    },
    {
        title: 'CronExpression',
        dataIndex: 'cronExpression',
        key: 'cronExpression',

    },
    {
        title: 'Action',
        key: 'operation',
        dataIndex: '_id',
        fixed: 'right',
        width: 100,
        render: _id =>
            <DeleteOutlined
                style={{color: "red", marginLeft: 12}}
                onClick={()=> deleteJob(_id)}
            >
            </DeleteOutlined>

    }

]