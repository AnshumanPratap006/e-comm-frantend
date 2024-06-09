import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const navigate=useNavigate();
    const [email,setEmail] = React.useState('');
    const [password,setPassword] =React.useState('')
    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    },[])
    const handleLogin = async()=>{
        console.warn(email,password);
        let result =await fetch('https://e-comm-backend-ampa.onrender.com/login',{
            method:'post',
            body : JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        });
        result = await result.json();
        //console.warn(await result.json());
        //navigate('/')
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user))
            localStorage.setItem("token",JSON.stringify(result.auth))

            navigate('/')
        }else{
            alert('please enter correct detail')
        }
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <input value={email} className="inputBox" type="text" placeholder="enter email" onChange={(e)=>setEmail(e.target.value)}/>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} className="inputBox" type="password" placeholder="enter password" />
            <button onClick={handleLogin} className="appButton" type="button">Login</button>


        </div>
    )
}
export default Login