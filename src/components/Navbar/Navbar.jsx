import React from 'react'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div
      className='navbar_container'>

      <div className='header' onClick={() => { navigate('/') }}>

        Fútbol 11

      </div>
    </div>
  )
}

export default Navbar