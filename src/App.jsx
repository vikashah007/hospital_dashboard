import React, { useContext, useEffect } from 'react'
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AddNewDoctor from './components/AddNewDoctor';
import AddNewAdmin from './components/AddNewAdmin';
import Doctors from './components/Doctors';
import Sidebar from './components/Sidebar';
import Messages from './components/Messages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from './main';
import axios from "axios"

const App = () => {
  const {isAuthenticated,setIsauthenticated,setUser}=useContext(Context)
  useEffect(()=>{
    const fetchUser=async()=>{
      try {
        const response=await axios.get("https://hospital-management-backend-dut4.onrender.com/api/v1/user/admin/me",{withCredentials:true})
        setIsauthenticated(true)
        setUser(response.data.user)
      } catch (error) {
        setIsauthenticated(false)
        setUser({})
      }
    }
    fetchUser()
  },[isAuthenticated])
  return (
    <div>
    <Router>
    <Sidebar/>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/doctor/addnew" element={<AddNewDoctor/>}/>
        <Route path="/admin/addnew" element={<AddNewAdmin/>}/>
        <Route path="/message" element={<Messages/>}/>
        <Route path="/doctors" element={<Doctors/>}/>
      </Routes>      
      <ToastContainer position='top-center'/>
    </Router>
    </div>
  )
}

export default App
// https://hospital-management-backend-dut4.onrender.com