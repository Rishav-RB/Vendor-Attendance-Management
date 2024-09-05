import React, { useState } from 'react'
import useLogin from '../hooks/useLogin'
import { useDispatch } from 'react-redux'
import { addUserData } from '../features/userSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const VendorSignup = () => {
    const navigate=useNavigate()
    const [inputs,setInputs]=useState({
        email:'',
        password:'',
      })
    const {loading,signin}=useLogin()
    let should_navigate=false
    const dispatch=useDispatch()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        await signin(inputs)
        //toast.success('Login  Successful!')
        setInputs({
            email:'',
            password:'',    
        })
        navigate('/vendor/punchin')
    }
  return (
    <div className='min-h-screen flex justify-center items-center background-img'>
        <div className="bg-gray-600 card shrink-0 w-full max-w-sm shadow-2xl">
            <form className="card-body mb-0 pb-4" onSubmit={handleSubmit}>
                <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold text-black">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered bg-white" required 
                value={inputs.email}
                onChange={(e)=>setInputs({...inputs,email:e.target.value})}/>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold text-black">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered bg-white" required
                value={inputs.password}
                onChange={(e)=>setInputs({...inputs,password:e.target.value})} />
                </div>
                <div className="form-control mt-6">
                    <button className="btn bg-blue-500 text-black hover:text-white hover:bg-blue-800" type='submit'>Sign in</button>
                </div>
            </form>
            <div className='form-control items-center mt-0 mb-3 pt-0'>
                <a href='#' className='link'>Forgot Password?</a>
            </div>
            <div className="flex justify-center items-center pb-5 pt-0 mt-0">
                <p className='mr-3'>Not registered yet??</p>
                <button className="rounded-lg h-[40px] w-[80px] bg-blue-500 text-black hover:text-white hover:bg-blue-800" onClick={()=>navigate('/signup')}>Sign up</button>
            </div>
        </div>
    </div>
  )
}

export default VendorSignup