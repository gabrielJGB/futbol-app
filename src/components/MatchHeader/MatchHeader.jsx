import React, { useEffect } from 'react'
import red_card from '../../assets/red.png'
import goal from '../../assets/goal.png'
import penalty from '../../assets/penal.png'
import escudo from '../../assets/escudo.png'

const MatchHeader = ({header_info}) => {
    const IMG_SIZE_1 = 50
    const IMG_SIZE_2 = 10
    const IMG_SIZE_3 = 15

    useEffect(() => {
        
    }, [])
    

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
        } else if (status === "STATUS_CANCELED"){
            return "Cancelado"
        }else if (status === "STATUS_FINAL_PEN"){
            return "Final (P)"
        }else if (status === "STATUS_FINAL_AET"){
            return "Final (Extra)"
        }else if (status === "STATUS_OVERTIME"){
            return elem.displayClock
        }else if (status === "STATUS_HALFTIME_ET"){
            return elem.displayClock
        }else if(status ==="STATUS_END_OF_EXTRATIME"){
            return "Pen."
        }
    
      }
    


  const format_time = (detail) => {
    
    if (detail === "Por def." ) {
      return detail
    }else if(detail.includes("P.A.")){
        return "Agendado"
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

  const is_playing = (elem) => {
    let status = elem.type.name
    if (status === "STATUS_HALFTIME" || status === "STATUS_SECOND_HALF" || status === "STATUS_FIRST_HALF" || status === "STATUS_OVERTIME" || status ==="STATUS_HALFTIME_ET"  ) {
      return true
    } else {
      return false
    }

  }


    const get_icon = (detail) => {
        
        if (detail.penaltyKick)
            return <img className='icon' src={penalty} alt="penal" width={IMG_SIZE_3} height={IMG_SIZE_3} />
        else if (detail.redCard)
            return <img className='icon' src={red_card} alt="roja" width={IMG_SIZE_2} height={IMG_SIZE_2} />
        else if (detail.scoringPlay)
            return <img className='icon' src={goal} alt="gol" width={IMG_SIZE_2} height={IMG_SIZE_2} />
    }

    const is_home_team = (displayName) => {
        return header_info.competitions[0].competitors[0].team.displayName === displayName

    }

    const get_escudo = (elem) => {
        if ("logos" in elem && elem.logos[0].href != "") {
            return <img src={elem.logos[0].href} alt="Escudo" width={IMG_SIZE_1} height={IMG_SIZE_1} />
        }
        return <img src={escudo} alt="Escudo" width={IMG_SIZE_1} height={IMG_SIZE_1} />

    }



    return (
        <div className="match-header">
            <div className="league-name">{header_info.season.name}</div>
            <div className="header-top">
                <div className="team">

                    {get_escudo(header_info.competitions[0].competitors[0].team)}
                    <div className="name">{header_info.competitions[0].competitors[0].team?.displayName}</div>
                </div>

                <div className="score-container">
                    <div className="score">
                        <span className={`score-local ${header_info.competitions[0].competitors[0].winner && "winner"}`}>{header_info.competitions[0].competitors[0].score}</span>
                        <span>{" - "}</span>
                        <span className={`score-away ${header_info.competitions[0].competitors[1].winner && "winner"}`}>{header_info.competitions[0].competitors[1].score}</span>
                    </div>

                    {
                        "shootoutScore" in header_info.competitions[0].competitors[0] &&
                        <div className='shootout'> 
                            {"("+header_info.competitions[0].competitors[0].shootoutScore+"-"+
                            header_info.competitions[0].competitors[1].shootoutScore+")"}
                        </div>
                    }

                    <div className={`status ${is_playing(header_info.competitions[0].status)&&"playing"}`}>
                        {get_status(header_info.competitions[0].status)}
                    </div>
                </div>

                <div className="team">

                    {get_escudo(header_info.competitions[0].competitors[1].team)}
                    <div className="name">{header_info.competitions[0].competitors[1].team?.displayName}</div>
                </div>

            </div>
            <div className="header-bottom">


                {
                    header_info.competitions[0].details?.map((detail, i) => (
                        <div
                            key={i}
                            className="detail"

                        >

                            {
                                is_home_team(detail.team.displayName) ?
                                    <>
                                        <div className="player">
                                            {get_icon(detail)}
                                            <span>{"participants" in detail ? detail.participants[0].athlete.displayName : "Expulsión"}</span>
                                            <span>{detail.ownGoal && ' (EC)'}</span>
                                        </div>
                                        <div className="minute">{detail.clock.displayValue}</div>
                                        <div className='box'></div>
                                    </>
                                    :
                                    <>
                                        <div className='box'></div>
                                        <div className="minute">{detail.clock.displayValue}</div>
                                        <div className="player">
                                            {get_icon(detail)}
                                            {"participants" in detail ? detail.participants[0].athlete.displayName : "Expulsión"}
                                            <span>{detail.ownGoal && ' (EC)'}</span>
                                        </div>
                                    </>

                            }

                        </div>
                    ))
                }


            </div>
        </div>
    )
}

export default MatchHeader