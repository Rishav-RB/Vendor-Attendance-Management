import React, { useEffect, useState } from 'react'
import EachAttendance from './EachAttendance'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const AddMarks = () => {
  const navigate=useNavigate()
  const [result,setResult]=useState([])
  const details=useSelector(state=>state.detailsReducer.details_data)
  const loggeduser=useSelector(state=>state.userReducer.user_data)
  useEffect(()=>{
    const getData=async()=>{
      let url=''
      if(details.type==='individual'){
        url=`/test/attendance/getUserByDate/${loggeduser.user_id}?start=${details.fromDate}&end=${details.toDate}`
      }else if(details.type==='canteen'){
        url=`/test/attendance/getUserByDateAndCanteen/${loggeduser.user_id}?canteen=${details.canteen}&start=${details.fromDate}&end=${details.toDate}`
      }
      try {
        const res=await fetch(url,{
          method:'GET',
          headers:{
            'Authorization': `Bearer ${loggeduser.access_token}`
          }
        })
        const data=await res.json()
        setResult(data)
        console.log(data)
        console.log(url)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  },[])
  console.log(result)
  //result.map((rst)=>rst.students.map((r)=>console.log(r.id)))
  return (
    <div data-theme='corporate'>
      <div className='bg-white min-h-screen flex justify-center items-center'> 
        <div className=''>
          {result?.map((r)=><EachAttendance name={r.UserName} canteen={r.Canteen} type={r.Type} meal={r.Meal} date={r.Date?.substring(0,10)} time={r.Time}/>)}
          <button className="btn rounded-lg bg-blue-500 text-black hover:text-white hover:bg-blue-800" onClick={()=>navigate('/vendor/attendance')}>Back</button>
        </div>
      </div>
    </div>
  )
}

export default AddMarks