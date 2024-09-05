import {createSlice} from '@reduxjs/toolkit'

const initialState={
    details_data:{}
}

export const detailsSlice=createSlice({
    name:'details',
    initialState,
    reducers:{
        addDetailsData:(state,action)=>{
            const data=action.payload
            state.details_data=data
        },
        removeDetailsData:(state,action)=>{
            state.details_data={}
        }
    }
})

export const {addDetailsData,removeDetailsData}=detailsSlice.actions
export default detailsSlice.reducer