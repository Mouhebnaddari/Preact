import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./App";
import Title from "antd/lib/typography/Title";
import logo from "./logo.svg";
import {Footer, Header} from "antd/lib/layout/layout";
import {Layout, PageHeader} from "antd";
import Monitoring from "./monitoring";
import Scheduling from "./scheduling";
import Delete from "./delete";
import Welcome from "./welcome";
import Orchestrator from "./orchestrator";
import Login from "./login";

export default function Router() {
    return(
    <div>
        <Header>
            <Title className="site-title">
                <img src={logo} className="App-logo" alt="logo" width="55" height="55"/>
                Orchestrator
            </Title>
        </Header>
        <Layout style={{padding: '0 24px 24px'}}>
            <PageHeader className="site-page-header" title="Job"
                        extra={[
                            <a href="/run">Run</a>,
                            <a href="/monitoring">Monitoring</a>,
                            <a href="/schedule">Scheduling</a>,
                            <a href="/Orchestrator">Orchestrator</a>,
                            <a href="/DeleteJob">Delete </a>]}
            />
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route exact path="/login" element={<Login/>}/>
                        <Route exact path="/run" element={<App/>}/>
                        <Route exact path="/monitoring" element={<Monitoring/>}/>
                        <Route exact path="/schedule" element={<Scheduling/>}/>
                        <Route exact path="/Orchestrator" element={<Orchestrator/>}/>
                        <Route exact path="/DeleteJob" element={<Delete/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </Layout>
        <Footer className="site-page-footer">©2022 Created by Naddari</Footer>
    </div>
    )}

