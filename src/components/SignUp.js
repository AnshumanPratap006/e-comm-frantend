import { useState,useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ()=>{
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    })

    const collectData = async()=>{
        console.log(name,email,password);
        let result =await fetch('https://e-comm-backend-ampa.onrender.com/register',{
            method:'post',
            body : JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        });
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result.result))
        localStorage.setItem("token",JSON.stringify(result.auth))

        navigate('/')
        // if(result){
        //     navigate('/')
        // }
    }

    return(
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your name" />
            <input className="inputBox" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
            <input className="inputBox" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" />
            <button type="button" className="appButton" onClick={collectData}>Sign Up</button>

        </div>
    )
}

export default SignUp;