import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useToken from "./token";

export default function Logout() {
    const navigate = useNavigate()
    const {token, setToken} = useToken();
    useEffect(() => {
        localStorage.clear();
        setToken(null)
        navigate('/login')
    }, [])


    return;
};