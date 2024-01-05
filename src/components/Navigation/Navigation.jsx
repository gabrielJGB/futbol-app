import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../context/DataContext'
import arrow_left from '../../assets/arrow_left.png'
import arrow_right from '../../assets/arrow_right.png'
import { convert_to_timestamp, get_time_selected } from '../../utils/time'

const Navigation = (props) => {
  const data = useContext(DataContext)
  const [date, setDate] = useState(false);
  const onDateChange = (event) => {
    setDate(event.target.value);
  };

  useEffect(() => {
    console.log(date)
    if (date)
      data.set_date(convert_to_timestamp(date))

  }, [date])


  return (
    <div className='navigation_container'>

      <button
        className='arrow'
        onClick={() => {
          let t = new Date(data.date)
          data.set_date(t.setDate(t.getDate() - 1))
          console.log(t.setDate(t.getDate() - 1))
        }
        }>
        <img src={arrow_left} alt="arrow" />
      </button>

      <div className='middle'>
        <div
          onClick={() => { data.set_date(new Date().getTime()) }}
        >{`Partidos ${get_time_selected(data.date)}`}</div>

        <div>
          <input
            type="date"

            value={date}
            onChange={onDateChange}
          />
        </div>
      </div>
      <button
        className='arrow'
        onClick={() => {
          let t = new Date(data.date)
          data.set_date(t.setDate(t.getDate() + 1))

        }
        }>
        <img src={arrow_right} alt="arrow" />
      </button>
    </div>
  )
}

export default Navigation