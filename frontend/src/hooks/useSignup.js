import toast from 'react-hot-toast'
import {useDispatch} from 'react-redux'
import { addUserData } from '../features/userSlice'
import { useState } from 'react'

const useSignup=()=>{
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch();
    const signup=async({firstname,lastname,email,password,role,sp_no})=>{
        const success=handleInputErrors({firstname,lastname,email,password,role,sp_no})
        if(!success) return 
        setLoading(true)
        try {
            console.log('fetching....')
            const res=await fetch('/test/auth/register',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({firstname,lastname,email,password,role,sp_no})
            })
            const data=await res.json()
            console.log(data)
            if(data.access_token){
                const store_data={
                    "access_token":data.access_token,
                    "user_id":data.user_id
                }
                toast.success("Sign Up successful!")
                dispatch(addUserData(store_data))
            }
            else{
                throw new Error({message:"Authentication Failed"})
            }
            console.log(data)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return {loading,signup}
}

export default useSignup

function handleInputErrors({firstname,lastname,email,password,role,sp_no}){
    if(!firstname ||!lastname || !email || !password || !sp_no || !role){
        toast.error('Please fill all the fields!')
        return false
    }
    return true
}