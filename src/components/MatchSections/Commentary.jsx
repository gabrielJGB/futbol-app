import React, { useEffect, useState } from 'react'

const Commentary = ({ info }) => {
  const [commentary_arr, set_commentary_arr] = useState([])

  useEffect(() => {

    if ("commentary" in info)
      set_commentary_arr(info.commentary)
    else
      set_commentary_arr(info.keyEvents)

  }, [])


  return (
    <div className='commentary_main-container'>

    {/* <div className='selector'></div> */}

      <div className="commentary_container">
        {
          commentary_arr?.map((comment, i) => (
            <div key={i} className="comment_box">
              <div className="minute"> {comment.time.displayValue} </div>
              <div className='comment'> {comment.text} </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Commentary