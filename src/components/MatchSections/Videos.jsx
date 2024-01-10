import React, { useEffect } from 'react'

const Videos = ({ info }) => {

  useEffect(() => {
    console.log(info.videos)
  }, [])

  return (
    <div className='videos_container'>
<h5>Videos</h5>
      


    </div>
  )
}

export default Videos