import React, { useContext, useEffect, useRef, useState } from 'react'
import { DataContext } from '../../context/DataContext'
import Toggle from '../Toggle/Toggle'


const Commentary = ({ info }) => {

  const data = useContext(DataContext)

  // const [commentary_arr, set_commentary_arr] = useState([])
  // const [key_events_arr, set_key_events_arr] = useState([])

  const [comments_available, set_comments_available] = useState("commentary" in info)
  const [key_events_available, set_key_events_available] = useState("keyEvents" in info)


  // const toggle = useRef()

  useEffect(() => {
    // console.log(info)

    // if ("commentary" in info)
    //   set_commentary_arr(info.commentary)

    // if ("keyEvents" in info)
    //   set_key_events_arr(info.keyEvents)


  }, [])

  // const [selected, set_selected] = useState(1)
  // const handle_toggle = () => {
  //   if (toggle.current.children[0].className.includes("selected")) {
  //     toggle.current.children[0].className = "element"
  //     toggle.current.children[1].className = "element selected"

  //   } else {
  //     toggle.current.children[0].className = "element selected"
  //     toggle.current.children[1].className = "element"

  //   }
  //   set_selected(toggle.current.children[0].className.includes("selected") ? 0 : 1)
  // }


  const Commentary_map = ({ comments }) => {
    return (
      comments?.map((comment, i) => (
        <div key={i} className="comment_box">
          <div className="minute"> {comment.time.displayValue} </div>
          <div className='comment'> {comment.text} </div>
        </div>
      ))
    )
  }

  const Key_events_map = ({ key_events }) => {
    return (
      key_events?.map((comment, i) => (
        <div key={i} className="comment_box">
          <div className="minute"> {comment.clock.displayValue} </div>
          <div className='comment'> {"text" in comment ? comment.text : comment.type.text} </div>
        </div>
      ))

    )
  }



  const get_selected = () => {

    if (comments_available && key_events_available) {

      if (data.input_checked) {
        return <Commentary_map comments={info.commentary} />
      } else {
        return <Key_events_map key_events={info.keyEvents} />
      }

    }
    else if (comments_available) {
      return <Commentary_map comments={info.commentary} />
    }
    else {
      return <Key_events_map key_events={info.keyEvents} />
    }


  }


  return (
    <div className='commentary_main-container'>

      {
        comments_available && key_events_available &&
        <Toggle disabled={false} />
      }

      <div className="commentary_container">
        {get_selected()}
      </div>

 
      {/* {
        "commentary" in info && "keyEvent" in info ?
          <Toggle />
          :
          data.input_checked ?
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
      } */}


      {/* {
        data.input_checked &&

        <div> 2222</div>

      } */}

      {/* 

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

      </div> */}

    </div>
  )
}

export default Commentary