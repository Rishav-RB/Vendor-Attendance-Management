import React, { useState } from 'react'
import useSignup from '../hooks/useSignup'
import { useDispatch } from 'react-redux'
import { addUserData } from '../features/userSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const VendorSignup = () => {
    const navigate=useNavigate()
    const [inputs,setInputs]=useState({
        role:'MEMBER',
        firstname:'',
        lastname:'',
        sp_no:'',
        email:'',
        password:'',
      })
    const {loading,signup}=useSignup()
    let should_navigate=false
    const dispatch=useDispatch()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        await signup(inputs)
        toast.success('Account created! please login')
        setInputs({
            role:'MEMBER',
            firstname:'',
            lastname:'',
            sp_no:'',
            email:'',
            password:'',    
        })
        //navigate('/')
    }
  return (
    <div className='min-h-screen flex justify-center items-center background-img'>
        <div className="bg-gray-600 card shrink-0 w-full max-w-sm shadow-2xl">
            <form className="card-body mb-0 pb-6" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold text-black">First Name</span>
                    </label>
                    <input type="text" placeholder="First Name" className="input input-bordered bg-white" required
                    value={inputs.firstname}
                    onChange={(e)=>setInputs({...inputs,firstname:e.target.value})} />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold text-black">Last Name</span>
                    </label>
                    <input type="text" placeholder="Last Name" className="input input-bordered bg-white" required
                    value={inputs.lastname}
                    onChange={(e)=>setInputs({...inputs,lastname:e.target.value})} />
                </div>
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
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold text-black">SP Number</span>
                    </label>
                    <input type="number" placeholder="Eg: 1XX67" className="input input-bordered bg-white" required
                    value={inputs.sp_no}
                    onChange={(e)=>setInputs({...inputs,sp_no:e.target.value})} />
                </div>
                
                <div className="form-control mt-6">
                    <button className="btn bg-blue-500 text-black hover:text-white hover:bg-blue-800" type='submit'>Sign Up</button>
                </div>
            </form>
            <div className="flex justify-center items-center pb-5 pt-0 mt-0">
                <p className='mr-3'>Already a vendor??</p>
                <button className="rounded-lg h-[40px] w-[80px] bg-blue-500 text-black hover:text-white hover:bg-blue-800" onClick={()=>navigate('/signin')}>Sign in</button>
            </div>
        </div>
    </div>
  )
}

export default VendorSignup