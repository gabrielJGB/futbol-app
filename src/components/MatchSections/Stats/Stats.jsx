import React, { useEffect, useState } from 'react'

const Stats = ({ info }) => {

  const [stats_arr, set_stats_arr] = useState(false)


  useEffect(() => {

    const stats = []

    info.boxscore.teams[0].statistics.forEach((elem, i) => {
      stats.push({
        label: elem.label,
        home_value: info.boxscore.teams[0].statistics[i].displayValue,
        away_value: info.boxscore.teams[1].statistics[i].displayValue
      })
    })

    set_stats_arr(stats)
  }, [])


  const StatRow = ({ stat }) => {

    const [home_width, set_home_width] = useState(0)
    const [away_width, set_away_width] = useState(0)

    const get_label = (label) => {

      switch (label) {
        case "Fouls":
          return "Faltas"
        case "Corner Kicks":
          return "Tiros de esquina"
        case "Possession":
          return "Posesión"
        case "POSSESSION":
          return "Posesión"
        case "Fuera de Lugar":
          return "Fuera de Juego"
        case "Salvadas":
          return "Atajadas"
        case "TIROS":
          return "Tiros totales"
        case "SHOTS":
          return "Tiros totales"
        case "ON GOAL":
          return "Tiros al arco"
        case "A GOL":
          return "Tiros al arco"
        case "On Target %":
          return "% Tiros al arco"
        case "% al arco":
          return "Tiros"
        case "Penalty Goals":
          return "Goles de penal"
        case "Penalty Kicks Taken":
          return "Penales atajados"
        case "Accurate Passes":
          return "Pases precisos"
        case "Passes":
          return "Pases"
        case "Pass Completion %":
          return "% Pases completados"
        case "Accurate Crosses":
          return "Centros precisos"

        case "Cross %":
          return "% Centros"
        case "Crosses":
          return "Centros"
        case "Tackles":
          return "Barridas"
        case "Tackle %":
          return "% Barridas"

        case "Effective Tackles":
          return "Barridas efectivas"

        case "Blocked Shots":
          return "Tiros bloqueados"
        case "Long Balls %":
          return "% Pases aereos"
        case "Accurate Long Balls":
          return "Pases aereos precisos"

        case "Long Balls":
          return "Pases arereos"

        case "Clearances":
          return "Despejes"
        case "Effective Clearances":
          return "Despejes efectivos"

        case "Interceptions":
          return "Intercepciones"


        default:
          return label
      }

    }

    useEffect(() => {
      let home_value = parseFloat(stat.home_value)
      let away_value = parseFloat(stat.away_value)
      let total = home_value + away_value
      let _home_width = (home_value * 100) / total
      let _away_width = (away_value * 100) / total
      set_home_width(_home_width ? _home_width : 0)
      set_away_width(_away_width ? _away_width : 0)

    }, [])



    return (

      <div className="stat">
        <div className="title">{get_label(stat.label)}</div>
        <div className="container">
          <div className="team home">
            <div className="num">{stat.home_value}</div>
            <div className="bar home-bar" style={{width: (home_width + "%")}}></div>
          </div>
          <div className="team away">
            <div className="num">{stat.away_value}</div>
            <div className="bar away-bar" style={{width: (away_width + "%")}}></div>
          </div>
        </div>
      </div>

    )
  }

  return (
    <div className='stats_container'>
      {
        stats_arr &&
        stats_arr.map((stat, i) => (
          <StatRow key={i} stat={stat} />
        ))
      }

    </div>
  )
}

export default Stats