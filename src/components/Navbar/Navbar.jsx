import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../context/DataContext'
import { get_time_selected } from '../../utils/time'


const Navbar = () => {
  const navigate = useNavigate()
  const data = useContext(DataContext)

  return (
    <div
      className='navbar_container'>

      <div className='header' >
        <div
          className='title'
          onClick={() => { navigate('/') }}
        >Fútbol 11</div>

        {
        get_time_selected(data.date) == "Hoy" &&
        <div className="btn-container">
          <div></div>
          <button
            className={`live-btn ${data.show_only_playing && "selected"}`}
            onClick={() => {
              data.set_show_only_playing(prev => !prev)
            }}
          >Live</button>
        </div>

      }

      </div>
      
    </div>
  )
}

export default Navbar