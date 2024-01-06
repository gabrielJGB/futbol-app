import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../context/DataContext'
import arrow_left from '../../assets/arrow_left.png'
import arrow_right from '../../assets/arrow_right.png'
import { convert_to_timestamp, get_time_selected } from '../../utils/time'

const Navigation = (props) => {
  const data = useContext(DataContext)
  const [previous_date, set_previous_date] = useState('')
  const [next_date, set_next_date] = useState('')

  // const [date, setDate] = useState(false);
  // const onDateChange = (event) => {
  //   event.preventDefault()
  //   setDate(event.target.value);

  //   data.set_date(get_time_selected(event.target.value))
  // };

  useEffect(() => {
    if (data.date) {
      let selected = new Date(data.date)
      set_previous_date(selected.setDate(selected.getDate() - 1))
      set_next_date(selected.setDate(selected.getDate() + 2))

    }

  }, [data.date])



  return (
    <div className='navigation_container'>
      <div className="navigation_date-input">
        <label htmlFor="day">Día</label>
        <input className='day' type="number" placeholder='DD' max={32}/>

        <label htmlFor="month">Mes</label>
        <input className='month' type="number" placeholder='MM' max={2}/>

        <label htmlFor="year">Año</label>
        <input className='year' type="number" placeholder='AAAA' max={4}/>
        <button 
          className='date-btn'
          onClick={()=>{}} 
        >Consultar</button>
      </div>

      <div className="navigation_main">
        <div className="left"
          onClick={() => data.set_date(previous_date)}
        >
          {get_time_selected(previous_date)}
        </div>


        <div className="center"
          onClick={() => data.set_date(new Date().getTime())}
        >
          {get_time_selected(data.date)}
        </div>


        <div className="right"
          onClick={() => data.set_date(next_date)}
        >
          {get_time_selected(next_date)}
        </div>
      </div>

      

    </div>
  )
}

export default Navigation