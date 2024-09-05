import toast from 'react-hot-toast'
import {useSelector} from 'react-redux'
import { addUserData } from '../features/userSlice'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const usePunch=()=>{
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const loggeduser=useSelector(state=>state.userReducer.user_data)
    const token=loggeduser.access_token
    //console.log(token)
    const punch=async({sp_no,currdate,canteen,punch_Time,flag,trolley,location,meal,user})=>{
        const success=handleInputErrors({sp_no,currdate,canteen,punch_Time,flag,trolley,location,meal,user})
        if(!success) return 
        setLoading(true)
        try {
            console.log('fetching....')
            console.log(token)
            const res=await fetch('/test/attendance/add',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body:JSON.stringify({sp_no,date:currdate,canteen,punch_Time,flag,trolley,location,meal,user})
            })
            let data=""
            console.log(data)
            if(res.ok){
                data=await res.text()
                console.log(data)
                if(data==="Attendance Added Successfully!"){ 
                    toast.success(data)
                    navigate("/vendor/attendance")
                }
                else{ 
                    toast.error(data)
                    navigate("/vendor/attendance")
                }
            }
            else
                toast.error("Not Permitted!")
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return {loading,punch}
}

export default usePunch

function handleInputErrors({sp_no,currdate,canteen,punch_Time,flag,trolley,location,meal,user}){
    if(!sp_no || !currdate || !canteen || !punch_Time || !flag || !trolley || !location || !meal || !user){
        toast.error('Please fill all the fields!')
        return false
    }
    return true
}