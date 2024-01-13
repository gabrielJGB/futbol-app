import React, { useContext, useRef } from 'react'
import { convert_to_timestamp } from '../../utils/time'
import { DataContext } from '../../context/DataContext'

const Config = () => {

  const input_date = useRef()
  const data = useContext(DataContext)

  return (
    <div className="config_container">
      
      <div className="calendar">
        <input ref={input_date} type="date" name="x" id="" />
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