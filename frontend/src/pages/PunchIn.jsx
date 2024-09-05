import React, { useEffect, useState } from 'react'
import { BsDashCircleFill,BsFillInfoCircleFill} from 'react-icons/bs';
import { IoLocationSharp } from "react-icons/io5";
import { PiForkKnifeFill } from "react-icons/pi";
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import usePunch from '../hooks/usePunch';
import { IoArrowBackCircleOutline } from "react-icons/io5";

const VendorSignup = () => {
    const navigate=useNavigate()
    const loggeduser=useSelector(state=>state.userReducer.user_data)
    const [inputs,setInputs]=useState({
        sp_no:"",
        currdate:"",
        canteen:"GBF Contractor Canteen",
        punch_Time:"",
        flag:"in",
        trolley:"",
        location:"Jamshedpur Works Canteen",
        meal:"",
        user:""
      })
    const {loading,punch}=usePunch()
    let should_navigate=false
    const dispatch=useDispatch()
    useEffect(()=>{
        const adduser=()=>{
            setInputs(prevInputs => ({ ...prevInputs, user: { id: loggeduser.user_id } }));
        }
        adduser();
    },[])
    useEffect(()=>{
        const addValues=()=>{
            const date = new Date();
            const hours = date.getHours().toString().padStart(2, '0')
            const minutes = date.getMinutes().toString().padStart(2, '0')
            const seconds = date.getSeconds().toString().padStart(2, '0')
            const formattedTime = `${hours}:${minutes}:${seconds}`
            console.log(formattedTime)
            setInputs(prevInputs => ({ ...prevInputs, punch_Time: formattedTime }));
        }
        addValues()
        //addDate()
    },[])
    useEffect(()=>{
        const addDate=()=>{
            const newdate = new Date();
            //const formattedTime = `${hours}:${minutes}:${seconds}`;
            let month = newdate.getMonth() + 1
            let day = newdate.getDate()
            const year = newdate.getFullYear()
            if (month < 10) {
            month = '0' + month;
            }
            if (day < 10) {
            day = '0' + day;
            }
            setInputs(prevInputs => ({ ...prevInputs, currdate:`${year}-${month}-${day}` }));
        }
        addDate()
    },[])
    const handleSubmit=async(e)=>{
        e.preventDefault()
        await punch(inputs)
        console.log(inputs)
        setInputs({
            sp_no:0,
            currdate:"",
            canteen:"GBF Contractor Canteen",
            punch_Time:"",
            flag:"in",
            trolley:"",
            location:"Jamshedpur Works Canteen",
            meal:"",
            user:{}
        })
        //navigate('/vendor/punchout')
    }
    function getCurrentDateFormatted() {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0')
        const formattedTime = `${hours}:${minutes}:${seconds}`;
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
  return (
    <>
    <div className='pt-0 mt-0 bg-gradient-to-b from-red-400 to-red-900 text-white w-full h-[36px] rounded-md flex justify-between items-center'>
        <IoArrowBackCircleOutline className='ml-4' onClick={()=>navigate('/vendor/attendance')}/>
        <p className='absolute left-1/2 transform -translate-x-1/2'>Vendor Punch-In</p>
        <div className='mr-4'></div> {/* Placeholder to ensure center alignment */}
    </div>

    <div className='bg-gray-100 min-h-screen flex justify-start items-center flex-col text-black'>
        <div className='m-4 bg-gradient-to-b from-gray-100 to-gray-300 border-black border-[0.1px] border-opacity-40 text-violet-900 font-bold w-[1520px] h-[30px] rounded-md flex justify-center text-center items-center'>
            <p>{getCurrentDateFormatted()}</p>
        </div>
        <form onSubmit={handleSubmit}> 
        <div className="bg-gray-white pb-6 border-black border-[0.1px] w-[1520px] rounded-md">
            <div className='relative group'>
            <div class="absolute -inset-0.5 bg-blue-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className='relative px-4 py-3 bg-white ring-1 ring-gray-900/5 rounded-lg flex items-center text-center justify-start '>
                    <BsDashCircleFill className='ml-0 pl-0 mr-2 h-4 w-3'/>
                    <p className='text-black font-semibold font-sans'>Canteen Selection</p>
                    <BsFillInfoCircleFill className='ml-auto'/>
                </div>
            </div>
            <div className=" px-3 py-0 mt-1  bg-white">
                    <div className="form-control mb-2">
                        <label className="label justify-start">
                            <IoLocationSharp className='mr-0.5'/>
                            <p className="label-text font-semibold text-black">Location</p>
                        </label>
                        <select type="text" placeholder="First Name" className=" h-[3rem] rounded-md border-[1px] pl-4 pr-4 font-semibold text-center dropdown-bottom border-gray-900 bg-white" required disabled>
                            <option defaultChecked value={"Jamshedpur Works Canteen"} className='font-semibold'>Jamshedpur Works Canteen</option>
                        </select>
                    </div>
                    <div className="divider bg-gray-400 h-[0.5px]"></div>
                    <div className="form-control mb-2">
                        <label className="label justify-start">
                            <PiForkKnifeFill className='mr-0.5'/>
                            <p className="label-text font-semibold text-black">Canteen</p>
                        </label>
                        <select type="text" placeholder="First Name" className=" h-[3rem] rounded-md border-[1px] pl-4 pr-4 font-semibold text-center dropdown-bottom border-gray-900 bg-white" required disabled>
                            <option defaultChecked value="GBF Contractor Canteen" className='font-semibold'>GBF Contractor Canteen</option>
                        </select>
                    </div>
                    <div className="divider bg-gray-400 h-[0.5px]"></div>
                    <div className="form-control mb-2">
                        <label className="label justify-start">
                            <IoLocationSharp className='mr-0.5'/>
                            <p className="label-text font-semibold text-black">Pickup/Trolley point</p>
                        </label>
                        <select type="text" placeholder="First Name" className=" h-[3rem] rounded-md border-[1px] pl-4 pr-4 font-semibold text-center dropdown-bottom border-gray-900 bg-gradient-to-b from-gray-100 to-gray-200 text-black" required
                        defaultValue="Choose"
                        onChange={(e)=>setInputs({...inputs,trolley:e.target.value})}>
                            <option disabled className='bg-white'>Choose</option>
                            <option value='GBF Contractor Canteen' className='bg-white'>GBF Contractor Canteen</option>
                            <option value='TRG Canteen' className='bg-white'>TRG Canteen</option>
                        </select>
                    </div>
                    <div className="divider bg-gray-400 h-[0.5px]"></div>
                    <div className="form-control mb-2">
                        <label className="label justify-start">
                            <PiForkKnifeFill className='mr-0.5'/>
                            <p className="label-text font-semibold text-black">Meal</p>
                        </label>
                        <select type="text" placeholder="First Name" className=" h-[3rem] rounded-md border-[1px] pl-4 pr-4 font-semibold text-center dropdown-bottom border-gray-900 bg-gradient-to-b from-gray-100 to-gray-200 text-black" required
                        defaultValue="Choose"
                        onChange={(e)=>setInputs({...inputs,meal:e.target.value})}>
                            <option disabled className='bg-white'>Choose</option>
                            <option value='Breakfast' className='bg-white'>Breakfast</option>
                            <option value='Lunch' className='bg-white'>Lunch</option>
                            <option value='Snacks' className='bg-white'>Snacks</option>
                            <option value='Dinner' className='bg-white'>Dinner</option>
                        </select>
                    </div>
                    <div className="divider bg-gray-400 h-[0.5px]"></div>
            </div>
        </div>
            <div className="form-control">
                    <label className="label justify-start">
                        <FaUser className='mr-0.5'/>
                        <p className="label-text font-semibold text-black">Enter SP Number</p>
                    </label>
                    <input type="number" placeholder="Eg: 1XX67" className="input border-[1px] border-gray-900 bg-white" required
                    value={inputs.sp_no}
                    onChange={(e)=>setInputs({...inputs,sp_no:e.target.value})} />
                </div>
                
                <div className="form-control my-6">
                    <button className="btn hover:bg-gray-400 hover:text-black text-white bg-gray-800" type='submit'>Next</button>
                </div>
                <div className='flex flex-row justify-start items-center m-1 text-black'>
                    <BsFillInfoCircleFill className='m-2'/>
                    <p className=''>Booking Details :-</p>
                </div>
        </form>
    </div>
    </>
  )
}

export default VendorSignup