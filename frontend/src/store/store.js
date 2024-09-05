import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import detailsReducer from '../features/detailsSlice'
export const store=configureStore({
    reducer:{userReducer,detailsReducer}  
})
