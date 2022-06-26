import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import App from "./App";
import Title from "antd/lib/typography/Title";
import logo from "./logo.svg";
import {Footer, Header} from "antd/lib/layout/layout";
import {Layout, PageHeader} from "antd";
import Monitoring from "./component/monitoring";
import Scheduling from "./component/scheduling";
import Delete from "./component/delete";
import Orchestrator from "./component/orchestrator";
import Login from "./component/login";
import Signup from "./component/signup";
import Logout from "./component/logout";
import useToken from "./component/token";

export default function Router() {
    const {token, setToken} = useToken();
    console.log("eadzefzefzef")

    return (
        <div>
            <Header>
                <Title className="site-title">
                    <img src={logo} className="App-logo" alt="logo" width="55" height="55"/>
                    Orchestrator
                </Title>
            </Header>
            <Layout style={{padding: '0 24px 24px'}}>
                <PageHeader className="site-page-header" title="Job"
                            extra={token ?
                                [
                                    <a key="run" href="/run">Run</a>,
                                    <a key="monitoring" href="/monitoring">Monitoring</a>,
                                    <a key="schedule" href="/schedule">Scheduling</a>,
                                    <a key="Orchestrator" href="/Orchestrator">Orchestrator</a>,
                                    <a key="DeleteJob" href="/DeleteJob">Delete</a>,
                                    <a key="logout" href="/logout">Logout</a>] :
                                [
                                    <a key="login" href="/login">Login </a>,
                                    <a key="signup" href="/signup">Signup</a>]}
                />
                <BrowserRouter>
                    <div>
                        <Routes>
                            <Route exact path="/login" element={<Login/>}/>
                            <Route exact path="/signup" element={<Signup/>}/>
                            <Route exact path="/run" element={<ProtectedRoute token={token}><App/></ProtectedRoute>}/>
                            <Route exact path="/monitoring"
                                   element={<ProtectedRoute token={token}><Monitoring/></ProtectedRoute>}/>
                            <Route exact path="/"
                                   element={<ProtectedRoute token={token}><Monitoring/></ProtectedRoute>}/>
                            <Route exact path="/schedule"
                                   element={<ProtectedRoute token={token}><Scheduling/></ProtectedRoute>}/>
                            <Route exact path="/Orchestrator"
                                   element={<ProtectedRoute token={token}><Orchestrator/></ProtectedRoute>}/>
                            <Route exact path="/DeleteJob"
                                   element={<ProtectedRoute token={token}><Delete/></ProtectedRoute>}/>
                            <Route exact path="/logout"
                                   element={<ProtectedRoute token={token}><Logout/></ProtectedRoute>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </Layout>
            <Footer className="site-page-footer">©2022 Created by Naddari</Footer>
        </div>
    )
}

const ProtectedRoute = ({children}) => {
    const {token} = useToken();
    if (!token) {
        return <Navigate to="/login" replace/>;
    }
    return children;
};
