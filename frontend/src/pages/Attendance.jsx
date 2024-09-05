import React, { useEffect, useState } from 'react'
import { BsDashCircleFill,BsFillInfoCircleFill} from 'react-icons/bs';
import { IoLocationSharp } from "react-icons/io5";
import { PiForkKnifeFill } from "react-icons/pi";
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addDetailsData } from '../features/detailsSlice';

const VendorSignup = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [inputs,setInputs]=useState({
        fromDate:"",
        toDate:"",
        type:"",
        canteen:""
      })
    const [indVisible,setIndVisible]=useState(true)
    const [canVisible,setCanVisible]=useState(true)
    //const {loading,studentsignup}=useSignup()
    let should_navigate=false
    //const dispatch=useDispatch()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        dispatch(addDetailsData(inputs))
        //toast.success('Account created! please login')
        navigate('/vendor/attendance/view')
    }
    useEffect(()=>{
        const changeType=()=>{
            if(indVisible) setInputs(prevInputs => ({ ...prevInputs, type:"canteen" }));
            if(canVisible) setInputs(prevInputs => ({ ...prevInputs, type:"individual" }));
            console.log(indVisible," ",canVisible)
        }
        changeType()
    },[indVisible,canVisible])
    function getCurrentDateFormatted() {
        const date = new Date();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        const year = date.getFullYear();
        if (month < 10) {
          month = '0' + month;
        }
        if (day < 10) {
          day = '0' + day;
        }
        return `${month}/${day}/${year}`;
    }
    const individualClick=()=>{
        setIndVisible(false);
        setCanVisible(true);
    }
    const canteenClick=()=>{
        setIndVisible(true);
        setCanVisible(false);
    }
  return (
    <div className='bg-white min-h-screen text-black'>
        <div className='pt-0 mt-0 bg-gradient-to-b from-red-400 to-red-900 text-white w-full h-[36px] rounded-md flex justify-center text-center items-center'>
            <p>Attendance Details</p>
        </div>
        <div className='flex justify-center items-center text-black mt-6'>
            <div className='border-black border-[1px] btn bg-white text-black hover:bg-gray-300 m-2 ' onClick={()=>individualClick()}>
                <div className={`top-1 left-0 w-2 h-2  rounded-full bg-blue-500 ${indVisible ? 'opacity-0' : 'opacity-100'}`} ></div>
                <p>Individual Wise</p>
            </div>
            <div className='border-black border-[1px] btn bg-white text-black hover:bg-gray-300 m-2' onClick={()=>canteenClick()} >
                <div className={`top-1 left-0 w-2 h-2 rounded-full bg-blue-500 ${canVisible ? 'opacity-0' : 'opacity-100'}`}></div>
                <p>Canteen Wise</p>
            </div>
        </div>
        <form className='bg-white mx-2' onSubmit={handleSubmit}>
            <div className="form-control my-2">
                <label className="label justify-start">
                    <p className="label-text font-semibold text-black">From Date</p>
                </label>
                <input type="text" placeholder="Eg: 1XX67" className="input border-[1px] border-gray-900 bg-white" required
                value={inputs.fromDate}
                onChange={(e)=>setInputs({...inputs,fromDate:e.target.value})} />
            </div>
            <div className="divider bg-gray-300 h-[0.5px]"></div>
            <div className="form-control my-2">
                <label className="label justify-start">
                    <p className="label-text font-semibold text-black">To Date</p>
                </label>
                <input type="text" placeholder="Eg: 1XX67" className="input border-[1px] border-gray-900 bg-white" required
                value={inputs.toDate}
                onChange={(e)=>setInputs({...inputs,toDate:e.target.value})} />
            </div>
            {!canVisible ?
            <div className="divider bg-gray-300 h-[0.5px] "></div>:<div></div>
            }
            {!canVisible ?
            <div className={`form-control my-2`}>
                <label className="label justify-start">
                    <p className="label-text font-semibold text-black">Canteen</p>
                </label>
                <input type="text" placeholder="Eg: 1XX67" className="input border-[1px] border-gray-900 bg-white"
                value={inputs.canteen}
                onChange={(e)=>setInputs({...inputs,canteen:e.target.value})} />
            </div>:<div></div>
            }
            <div className="divider bg-gray-300 h-[0.5px]"></div>
            <label className="label justify-start">
                    <p className="label-text font-semibold text-black">Perno/SP Number</p>
                </label>
            <div className='relative group'>
                <div className="form-control my-2">
                <div class="absolute -inset-0.5 bg-blue-600 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <input type="number" placeholder="Eg: 1XX67" className="input border-[1px] border-gray-900 relative px-4 py-3 bg-white ring-1 ring-gray-900/5 rounded-lg" required
                     />
                </div>
            </div>
            <div className="form-control my-8">
                <button className="btn hover:bg-gray-400 hover:text-black text-white bg-gradient-to-b from-blue-400 to-blue-900">Show</button>
            </div>
        </form> 
        <div className='flex justify-evenly items-center text-black mt-6'>
            <button className="btn hover:bg-gray-400 hover:text-black text-white bg-gradient-to-b from-blue-400 to-blue-900 mx-2 w-[750px]" onClick={()=>navigate('/vendor/punchin')}>Punch In</button>
            <button className="btn hover:bg-gray-400 hover:text-black text-white bg-gradient-to-b from-blue-400 to-blue-900 mx-2 w-[750px]" onClick={()=>navigate('/vendor/punchout')}>Punch Out</button>
        </div>        
    </div>
  )
}

export default VendorSignup