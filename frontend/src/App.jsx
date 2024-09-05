import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VendorSignup from './pages/VendorSignup'
import VendorSignIn from './pages/VendorSignIn'
import PunchIn from './pages/PunchIn'
import PunchOut from './pages/PunchOut'
import Attendance from './pages/Attendance'
import ViewAttendance from './pages/ViewAttendance'
import {Navigate, Route, Routes} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const user=useSelector(state=>state.userReducer.user_data)
  console.log(user)
  return (
  <div>
    <Routes>
      <Route path='/' element={<Navigate to='/signin'/>}/>
      <Route path='/signin' element={<VendorSignIn/>}/>
      <Route path='/signup' element={<VendorSignup/>}/>
      <Route path='/vendor/punchin' element={user.user_id?<PunchIn/>:<Navigate to='/'/>}/>
      <Route path='/vendor/punchout' element={user.user_id?<PunchOut/>:<Navigate to='/'/>}/>
      <Route path='/vendor/attendance' element={user.user_id?<Attendance/>:<Navigate to='/'/>}/>
      <Route path='/vendor/attendance/view' element={user.user_id?<ViewAttendance/>:<Navigate to='/'/>}/>
    </Routes>
    <Toaster/>
  </div>
  )
}

export default App
