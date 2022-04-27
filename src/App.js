
import './App.css';
//import styled from 'styled-components'
import call from "./components/App";
import {useState} from "react";
import {Form, Input, Button, Avatar} from 'antd';
import { Layout } from 'antd';
import Title from 'antd/lib/typography/Title';


const { Header } = Layout;

/**const Button = styled.button `

background : blue ;
    color : white ;
    padding 5x 15x ;
    border-radius 5x ; 
    outline 0 ; 
    box-shadow :0px 2px 2px lightgray ;
    cursor :pointer ;
    transition: ease background-color 250ms ;
    &:hover{ 
    background-color: #e53935; 
    }
    
`**/





export default function App(){
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [job,setJob] =  useState("")
    const [remote,setRemote] =  useState("")
    const handleSubmit=(e)=>{
        e.preventDefault()

    }

    return (
        <div className={App}>
        <Layout>
            <Header  style={{padding:10,background:'black'}}>
                <Avatar style={{float : 'right'}} src ='./db.png'/>
                <Title style={{ color :'white'}} level={6}>  Shell orchestrator </Title>

            </Header>
        </Layout>

          <Form onSubmit={handleSubmit}
              name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 10,
                }}
                 padding={{ padding: 20,}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
          >


            <Form.Item
                label="Job"
                name="Job"
                rules={[
                    {
                        required: true,
                        message: 'Please input the job!' ,
                    },
                ]}

                value={job}
                onChange={(e => setJob(e.target.value))}
            >
                <Input />
                </Form.Item>
              <br/>

        <Form.Item
            label="Remote"
            name="Remote"
            rules={[
                {
                    required: true,
                    message: 'Please input your Remote!',
                },
            ]}
            value={remote}
            onChange={(e => setRemote(e.target.value))}
        >
            <Input />
        </Form.Item>


<br/>

              <Form.Item  wrapperCol={{ offset: 12, span: 20 }}>
                  <Button type="primary" onClick={()=>call(job,remote)}>
                      LANCER
                  </Button>
              </Form.Item>

              </Form>
        <textarea>

        </textarea>
        </div>


  );
};

