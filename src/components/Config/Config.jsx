import React, { useContext, useEffect, useRef, useState } from 'react'
import { convert_to_timestamp,convertTimestampToDate } from '../../utils/time'
import { DataContext } from '../../context/DataContext'

const Config = () => {

  const input_date = useRef()
  const data = useContext(DataContext)
  

  useEffect(() => {
    
    
  }, [])
  

  return (
    <div className="config_container">
      
      <div className="calendar">
        <input ref={input_date}  type="date" name="x" id="" />
        <button onClick={()=>{
          
          if(input_date.current.value!= "")
            data.set_date(convert_to_timestamp(input_date.current.value))
        }
          }>Ir</button>
        {/* <img className='calendar-icon' src={calendar} alt="Calendar" width={23} height={23} /> */}
      </div>
    </div>
  )
}

export default Config