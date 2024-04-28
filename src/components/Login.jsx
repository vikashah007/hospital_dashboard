import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const {isAuthenticated,setIsauthenticated}=useContext(Context)
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [confirmpassword,setConfirmPassword]=useState("")
  const navigateTo=useNavigate()
  const handleLogin=async(e)=>{
    e.preventDefault()
    try {
      const response=await axios.post("https://hospital-management-backend-dut4.onrender.com/api/v1/user/login",{email,password,confirmpassword,role:"Admin"},{
        withCredentials:true,
        headers:{"Content-Type":"application/json"}
      })
      toast.success(response.data.message);
      setIsauthenticated(true);
      navigateTo("/")

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
if(isAuthenticated)
{
  return <Navigate to={"/"} />
}
  return (
    <div className='container form-component'>
    <img src='/logo.png' alt='logo' className='logo'/>
    <h1 className='form-title'>WELCOME TO SKMCH</h1>
    <p>This page can only be accessed and used by Admin</p>
    <form onSubmit={handleLogin}>
    <input type='text' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email'/>
    <input type='text' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password'/>
    <input type='text' value={confirmpassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder='ConfirmPassword'/>
    <div style={{justifyContent:"center", alignItems:"center"}}>
    <button type="submit">Login</button>
    </div>
    </form>
  </div>
  )
}

export default Login
