import 'antd/dist/antd.min.css'
import './App.css';
import {useEffect, useState} from "react";
import React from"react"
import {Table} from 'antd'
import {getHistory, getUpcoming} from "./services/jobService";
import {Content} from "antd/lib/layout/layout";
import moment from "moment";
import "@fontsource/ubuntu-mono";

export default function Monitoring () {
    const [data, setData] = useState([])
    const fetchData = async () => setData(await getHistory())
    useEffect(() => {
        fetchData().catch(console.error)
    }, [])
    const [info, setInfo] = useState([])
    const fetchInf = async () => setInfo(await getUpcoming())
    useEffect(() => {
        fetchInf().catch(console.error)
    }, [])
    return (
        <Content className="site-layout-content">
            <Table columns={columns} dataSource={data}/>
            <Table columns={columnss} dataSource={info}/>
        </Content>
    )
}
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
            title: 'Date',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: timestamp => moment(new Date(timestamp)).format('YYYY-MM-DD HH:mm:ss')
        },
        {
            title: 'Log',
            dataIndex: 'log',
            key: 'log'
        }
    ]
    const columnss = [
        {
            title: 'Job',
            dataIndex: 'orchestration',
            key: 'orchestration'
        },
        {
            title: 'Hostname',
            dataIndex: 'orchestration',
            key: 'hostname'
        },
        {
            title: 'CronExpression',
            dataIndex: 'cronExpression',
            key: 'cronExpression',
        }
    ]
