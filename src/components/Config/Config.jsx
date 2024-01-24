import React, { useContext, useEffect, useRef } from 'react'
import { convert_to_timestamp, get_time_selected } from '../../utils/time'
import { DataContext } from '../../context/DataContext'
import Toggle from '../Toggle/Toggle'

const Config = () => {

  const input_date = useRef()

  const data = useContext(DataContext)

  const handle_press = e => {

    if (e.key === 'Enter') {
      if (input_date?.current.value != "")
        data.set_date(convert_to_timestamp(input_date.current.value))
    }
  }

  useEffect(() => {
    window.addEventListener('keypress', handle_press)
  }, [])




  return (

    <div className="config_container">
      <div className="calendar">

        <input ref={input_date} type="date" name="x" />
        <button onClick={() => {
          if (input_date.current.value != "")
            data.set_date(convert_to_timestamp(input_date.current.value))
        }}>Ir</button>

        {
          get_time_selected(data.date) != "Hoy" &&
          <button onClick={() => data.set_date(new Date().getTime())}>Volver a hoy</button>
        }

      </div>

      {/* <button 
      style={{backgroundColor:(data.is_active?"lime":"red"),border:0}}
      onClick={()=> data.set_is_active(prev=>!prev) }>{data.is_active?"ON":"OFF"}</button> */}

      {/* {
        get_time_selected(data.date) == "Hoy" &&
        <div className="btn-container">
          <div></div>
          <button
            className={`live-btn ${data.show_only_playing && "selected"}`}
            onClick={() => {
              data.set_show_only_playing(prev => !prev)
            }}
          >Jugando</button>
        </div>

      } */}


    </div>
  )
}

export default Config