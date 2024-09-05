import React, { useState } from 'react'
//import useAddMarks from '../hooks/useAddMarks'

const EachAttendance= ({name,canteen,meal,type,date,time}) => {
    /*const [inputs,setInputs]=useState({
        name:name,
        meal:meal,
        canteen:canteen,
        type:type,
        date:date,
        time:time
      })*/
  return (
    <div className='mt-4'>
        <div className="flex flex-row justify-center gap-10 text-black" >
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold text-black">Name</span>
                    </label>
                    <input type="text" value={name} placeholder="Subject" className="input input-bordered bg-slate-200" required readOnly/>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold text-black">Type</span>
                </label>
                    <input type="text" value={type} placeholder="Teacher" className="input input-bordered bg-slate-200" required readOnly />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold text-black">Canteen</span>
                    </label>
                        <input type="text" value={canteen} placeholder="Student" className="input input-bordered bg-slate-200" required readOnly/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold text-black">Date</span>
                    </label>
                        <input type="text" value={date} placeholder="Student" className="input input-bordered bg-slate-200" required readOnly/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold text-black">Time</span>
                    </label>
                        <input type="text" value={time} placeholder="Student" className="input input-bordered bg-slate-200" required readOnly/>
                </div>
                <div className="form-control">
                <label className="label">
                        <span className="label-text font-semibold text-black">Meal</span>
                    </label>
                        <input type="text" value={meal} placeholder="Student" className="input input-bordered bg-slate-200" required readOnly/>
                </div>
        </div>
        <div className="divider bg-gray-300 h-[2px]"></div>
    </div>
  )
}

export default EachAttendance