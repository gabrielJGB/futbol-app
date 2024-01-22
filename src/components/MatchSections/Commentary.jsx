import React, { useContext, useEffect, useRef, useState } from 'react'
import { DataContext } from '../../context/DataContext'
import Toggle from '../Toggle/Toggle'
import arrow_in from '../../assets/arrow-in.png'
import arrow_out from '../../assets/arrow-out.png'

const Commentary = ({ info }) => {

  const data = useContext(DataContext)
  const [comments_available, set_comments_available] = useState("commentary" in info)
  const [key_events_available, set_key_events_available] = useState("keyEvents" in info)

  const imgs = [arrow_in, arrow_out]
  const IMG_SIZE = 12


  useEffect(() => {

    console.log(info)
  }, [])



  const get_color_selector = (id) => {

    switch (id) {
      case '94':
        return "amarilla"
      case '':
        return "roja"
      case '98':
        return "gol"
      case '137':
        return "gol"
      case '70':
        return "gol"
      case '173':
        return "gol"
	case '97':
        return "gol"
      case '93':
        return 'roja'
      default:
        return ""

    }
  }


  const Commentary_map = ({ comments }) => {
    return (
      comments?.map((comment, i) => (
        <div key={i} className="comment_box">

          <div className={`header ${get_color_selector("play" in comment && "type" in comment.play && comment.play.type.id)}`}  >
            <div className="minute"> {comment.time.displayValue} </div>
            <div className="title">{"play" in comment && "type" in comment.play && comment.play.type.text.replace("Sustitución","Cambio")}</div>

            <div className="team">
              {
                "play" in comment && "team" in comment.play &&
                <>
                  <span>-</span>
                  <span> {comment.play.team.displayName}</span>
                </>
              }
            </div>
          </div>

          <div className='comment'>
            {comment.text}
          </div>


          {
            "play" in comment && "type" in comment.play && comment.play.type.id === "76" &&
            <div className="players">
              {"participants" in comment.play && comment.play.participants.map((participant, i) => (
                <div key={i} className="player">
                  <img src={imgs[i]} width={IMG_SIZE} height={IMG_SIZE} alt="Cambio" />
                  <div className="name">{participant.athlete.displayName}</div>
                </div>
              ))}
            </div>
          }


        </div>
      ))
    )
  }

  const Key_events_map = ({ key_events }) => {
    return (
      key_events?.map((comment, i) => (
        <div key={i} className="comment_box">
          <div className={`header ${get_color_selector(comment.type.id)}`}  >
            <div className="minute"> {comment.clock.displayValue} </div>
            <div className="title">{comment.type.text}</div>
          </div>

          <div className='comment'> {"text" in comment ? comment.text : comment.type.text} </div>

          {
            comment.type.id === "76" &&
            <div className="players">
              {"participants" in comment && comment.participants.map((participant, i) => (
                <div key={i} className="player">
                  <img src={imgs[i]} width={IMG_SIZE} height={IMG_SIZE} alt="Cambio" />
                  <div className="name">{participant.athlete.displayName}</div>
                </div>
              ))}
            </div>
          }

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

    </div>
  )
}

export default Commentary