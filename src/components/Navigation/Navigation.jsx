import React, { useContext, useEffect } from 'react'
import { DataContext } from '../../context/DataContext'
import arrow_left from '../../assets/arrow_left.png'
import arrow_right from '../../assets/arrow_right.png'
import {  get_time_selected } from '../../utils/time'

const Navigation = (props) => {
  const data = useContext(DataContext)





  return (
    <div className='navigation_container'>

        <button 
          className='arrow'
          onClick={() => {
            let t = new Date(data.date)
            data.set_date(t.setDate(t.getDate() - 1))

        }
        }>
          <img src={arrow_left} alt="arrow"  />
        </button>

        <div
          onClick={()=>{ data.set_date(new Date().getTime()) }}
        >{`Partidos ${get_time_selected(data.date)}`}</div>
        
        <button 
        className='arrow'
        onClick={() => {
            let t = new Date(data.date)
            data.set_date(t.setDate(t.getDate() + 1))

        }
        }>
          <img src={arrow_right} alt="arrow"  />
        </button>
    </div>
  )
}

export default Navigation