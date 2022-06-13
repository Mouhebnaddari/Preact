
import './welcome.css'
import Login from "./login";
import Signup from "./signup";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react';
import Clock from 'react-digital-clock';




export default function Welcome() {

    return (
<body>
        <div className="Shell-Orchestrator"   >


            <a href="/login" >Login </a>
            <a href="/Signup">Signup</a>

            <BrowserRouter>

                <Routes>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path="/Signup" element={<Signup/>}/>
                </Routes>


            </BrowserRouter>

        </div>

        <Clock  />

</body>
    )
}