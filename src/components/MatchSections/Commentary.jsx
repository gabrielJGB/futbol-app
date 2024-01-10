import React, { useEffect, useRef, useState } from 'react'


const Commentary = ({ info }) => {
  const [commentary_arr, set_commentary_arr] = useState([])
  const [key_events_arr, set_key_events_arr] = useState([])

  const toggle = useRef()

  useEffect(() => {
    console.log(info)

    if ("commentary" in info)
      set_commentary_arr(info.commentary)

    if ("keyEvents" in info)
      set_key_events_arr(info.keyEvents)


  }, [])

  const [selected, set_selected] = useState(1)
  const handle_toggle = () => {
    if (toggle.current.children[0].className.includes("selected")) {
      toggle.current.children[0].className = "element"
      toggle.current.children[1].className = "element selected"

    } else {
      toggle.current.children[0].className = "element selected"
      toggle.current.children[1].className = "element"

    }
    set_selected(toggle.current.children[0].className.includes("selected") ? 0 : 1)
  }




  return (
    <div className='commentary_main-container'>

      {
        "commentary" in info && "keyEvents" in info &&

        <div className="switch-container">
          <div ref={toggle} onClick={handle_toggle} className="switch">
            <div className="element">Eventos destacados</div>
            <div className="element selected">Todos los eventos</div>
          </div>
        </div>
      }


      <div className="commentary_container">
        {
          selected === 1 ?

            commentary_arr?.map((comment, i) => (
              <div key={i} className="comment_box">
                <div className="minute"> {comment.time.displayValue} </div>
                <div className='comment'> {comment.text} </div>
              </div>
            ))


            :

            key_events_arr?.map((comment, i) => (
              <div key={i} className="comment_box">
                <div className="minute"> {comment.clock.displayValue} </div>
                <div className='comment'> {"text" in comment ? comment.text : comment.type.text} </div>
              </div>
            ))

        }

      </div>

    </div>
  )
}

export default Commentary