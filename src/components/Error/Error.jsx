import React from 'react'

const Error = () => {
  return (
    <div className='error'>
        <div className='text'>Ha ocurrido un error</div>
        <button 
            className='error-button'
            onClick={()=>window.location.reload
        ()}>Recargar</button>
    </div>
  )
}

export default Error