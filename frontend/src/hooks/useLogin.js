import toast from 'react-hot-toast'
import {useDispatch} from 'react-redux'
import { addUserData } from '../features/userSlice'
import { useState } from 'react'

const useLogin=()=>{
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch();
    const signin=async({email,password})=>{
        const success=handleInputErrors({email,password})
        if(!success) return 
        setLoading(true)
        try {
            console.log('fetching....')
            const res=await fetch('/test/auth/authenticate',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({email,password})
            })
            let data={};
            if(res.ok)
                data=await res.json()
            else
                toast.error("Authentication Failed!")
            console.log(data)
            if(data.access_token){
                const store_data={
                    "access_token":data.access_token,
                    "user_id":data.user_id
                }
                toast.success("Sign In successful!")
                dispatch(addUserData(store_data))
            }
            console.log(data)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return {loading,signin}
}

export default useLogin

function handleInputErrors({email,password}){
    if(!email || !password){
        toast.error('Please fill all the fields!')
        return false
    }
    return true
}