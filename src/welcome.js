import './welcome.css'
import Login from "./login";
import Signup from "./signup";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react';
import Clock from 'react-digital-clock';
import {Footer, Header} from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import logo from "./logo.svg";
import {Layout, PageHeader} from "antd";

export default function Welcome() {
    return (
        <div>
            <Header>
                <Title className="site-title">
                    <img src={logo} className="App-logo" alt="logo" width="55" height="55"/>
                    Orchestrator
                </Title>
            </Header>
            <Layout className="welcome" style={{padding: '0 24px 24px'}}>
                <PageHeader className="site-page-header"
                            extra={[
                                <a href="/login">Login </a>,
                                <a href="/signup">Signup</a>]}
                />
                <BrowserRouter>
                    <div>
                        <Routes>
                            <Route exact path="/login" element={<Login/>}/>
                            <Route exact path="/signup" element={<Signup/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </Layout>
            <Footer className="site-page-footer">©2022 Created by Naddari</Footer>
        </div>
    )
}