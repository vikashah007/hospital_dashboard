import React, { useContext, useState } from 'react'
import { Context } from '../main'
import {TiHome} from "react-icons/ti"
import {RiLogoutBoxFill} from "react-icons/ri"
import {AiFillMessage} from "react-icons/ai"
import {GiHamburger} from "react-icons/gi"
import {FaUserDoctor} from "react-icons/fa6"
import {MdAddModerator} from "react-icons/md"
import {IoPersonAddSharp} from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Sidebar = () => {
  const {isAuthenticated,setIsauthenticated}=useContext(Context)
  const [show,setShow]=useState(false)

  const navigateTo=useNavigate()

  const gotoHome=()=>{
    navigateTo("/")
    setShow(!show)
  }
  const gotoDoctorsPage=()=>{
    navigateTo("/doctors")
    setShow(!show)
  }
  const gotoMessagePage=()=>{
    navigateTo("/message")
    setShow(!show)
  }
  const gotoAddNewDoctor=()=>{
    navigateTo("/doctor/addnew")
    setShow(!show)
  }
  const gotoAddNewAdmin=()=>{
    navigateTo("/admin/addnew")
    setShow(!show)
  }
  const handleLogout = async () => {
    await axios
    .get("https://hospital-management-backend-dut4.onrender.com/api/v1/user/admin/logout", {
      withCredentials: true,
    })
    .then((res) => {
      toast.success(res.data.message);
      setIsauthenticated(false);
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
  };
  
  return (
    <>
    <nav style={!isAuthenticated?{display:"none"}:{display:"flex"}} className={show? "show sidebar" : "sidebar"}>
      <div className='links'>
      <TiHome onClick={gotoHome}/>
      <FaUserDoctor onClick={gotoDoctorsPage}/>
      <MdAddModerator onClick={gotoAddNewAdmin}/>
      <IoPersonAddSharp onClick={gotoAddNewDoctor}/>
      <AiFillMessage onClick={gotoMessagePage}/>
      <RiLogoutBoxFill onClick={handleLogout}/>
      </div>
    </nav>
    <div className='wrapper'>
    <GiHamburger style={!isAuthenticated?{display:"none"}:{display:"flex"}} className='hamburger' onClick={()=>setShow(!show)}/>
    </div>
    </>
  )
}

export default Sidebar
