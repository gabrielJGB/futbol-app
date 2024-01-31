import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DataContext } from '../../context/DataContext'
import { get_time_selected } from '../../utils/time'
import { menu_icon } from '../../assets/index'


const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const data = useContext(DataContext)
  const IMG_SIZE = 23


  return (
    <div
      className='navbar_container'>

      <div className='header' >


        <div className='left'>
          
          <button 
          onClick={()=>data.set_open_menu(prev=>!prev)}
          className='menu-icon'>
            <img src={menu_icon} alt="Icon" width={IMG_SIZE} height={IMG_SIZE}/>
          </button>
          <div
            className='title'
            onClick={() => { navigate('/') }}
          >Fútbol 11</div>
        </div>




        {
          get_time_selected(data.date) == "Hoy" ?
            <div className="btn-container" style={{ display: (location.pathname != "/" && "none") }}>
              <div></div>
              <button
                className={`live-btn ${data.show_only_playing && "selected"}`}
                onClick={() => {
                  data.set_show_only_playing(prev => !prev)
                }}
              >Live</button>
            </div>
            :
            <div></div>

        }

      </div>

    </div>
  )
}

export default Navbar