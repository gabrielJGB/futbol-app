import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ball from '../../assets/ball.png'
import escudo from '../../assets/escudo.png'

const IMG_SIZE_1 = 35;
const IMG_SIZE_2 = 10;

const EventCard = (props) => {


  const format_time = (detail) => {

    if (detail === "Por def.") {
      return detail
    }

    let arr = detail.match(/at (\d+)\:(\d+) (\w\w)/)
    let hora = Number(arr[1])
    let minutos = Number(arr[2])
    let is_pm = arr[3] === "PM"


    let t = new Date()
    t.setHours(hora + (is_pm && hora != 12 ? 14 : 2))
    t.setMinutes(minutos)

    return (String(t.getHours()).padStart(2, "0") + ":" + String(t.getMinutes()).padStart(2, "0"))
  }

  const get_status = (elem) => {
    let status = elem.type.name

    if (status === "STATUS_HALFTIME") {
      return "E.T."
    } else if (status === "STATUS_SCHEDULED") {
      return format_time(elem.type.detail)
    } else if (status === "STATUS_FULL_TIME") {
      return "Final"
    } else if (status === "STATUS_POSTPONED") {
      return "Suspendido"
    } else if (status === "STATUS_SECOND_HALF") {
      return elem.displayClock
    } else if (status === "STATUS_FIRST_HALF") {
      return elem.displayClock
    } else if (status === "STATUS_CANCELED") {
      return "Cancelado"
    } else if (status === "STATUS_FINAL_PEN") {
      return "Final (P)"
    }else if (status === "STATUS_FINAL_AET"){
      return "Final (Extra)"
  }

  }


  const is_playing = (elem) => {
    let status = elem.type.name
    if (status === "STATUS_HALFTIME" || status === "STATUS_SECOND_HALF" || status === "STATUS_FIRST_HALF") {
      return true
    } else {
      return false
    }

  }


  const get_escudo = (elem) => {

    if ("logo" in elem && elem.logo != "") {
      return <img src={elem.logo} alt="Escudo" width={IMG_SIZE_1} height={IMG_SIZE_1} />
    }
    return <img src={escudo} alt="Escudo" width={IMG_SIZE_1} height={IMG_SIZE_1} />

  }

  const Team = (props) => {


    return (
      <div
        className='team'

      >
        <div className="team-info"
          style={{ flexDirection: (props.team.order ? "column" : "column-reverse") }}
        >

          {
            props.team.order ?
              <>

                {/* <img src={props.team.logo} alt="" width={IMG_SIZE_1} height={IMG_SIZE_1} />
                 */}
                {get_escudo(props.team)}
                <div className="team-name">{props.team.displayName}</div>
              </>
              :
              <>

                <div className="team-name">{props.team.displayName}</div>
                {get_escudo(props.team)}
              </>

          }
        </div>

        <div className="scorers-container">

          {/* 
          {
            props.team.goalieSummary.map((elem,i)=>(

          <div className="score">
            <img src={ball} alt="" width={IMG_SIZE_2} height={IMG_SIZE_2} />
            <div className="player">  {elem.shortName}</div>
          </div>
            ))
          } */}


        </div>
      </div>
    )
  }

  const Score = (props) => {


    return (
      <div className="score-container">
        <div className="score">
          <div className={`score-local ${props.score[1].winner && "winner"}`}>{props.score[1].score}</div>
          <span>-</span>
          <div className={`score-away ${props.score[0].winner && "winner"}`}>{props.score[0].score}</div>
        </div>

        {
          "shootoutScore" in props.score[1] &&
          <div className='shootout'>
            {"(" + props.score[1].shootoutScore + "-" + 
            props.score[0].shootoutScore + ")"}
          </div>
        }

        <div className={`status ${is_playing(props.status) && "playing"}`} >
          {
            get_status(props.status)
          }
        </div>
      </div>
    )
  }

  const navigate = useNavigate()

  return (

    <div
      className='event-card_container'
      onClick={() => navigate(`match/${props.match.id}`)}

    >

      <div
        className="match-container"

      >
        <Team team={props.match.competitors[1]} />
        <Score score={props.match.competitors} status={props.match.fullStatus} />
        <Team team={props.match.competitors[0]} />
      </div>

    </div>
  )
}

export default EventCard