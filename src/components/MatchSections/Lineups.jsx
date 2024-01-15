import React, { useEffect, useState } from 'react'
import arrow_in from '../../assets/arrow-in.png'
import arrow_out from '../../assets/arrow-out.png'
import red from '../../assets/red.png'
import yellow from '../../assets/yellow.png'
import penalty from '../../assets/penal.png'
import goal from '../../assets/goal.png'
import boot from '../../assets/boot.png'
import escudo from '../../assets/escudo.png'

const Lineups = ({ info }) => {
  const IMG_SIZE_1 = 22
  const IMG_SIZE_2 = 15


  const [home_selected, set_home_selected] = useState(true)

  const [info_home, set_info_home] = useState({
    logo: ("logos" in info.header.competitions[0].competitors[0].team? info.header.competitions[0].competitors[0].team.logos[0].href : escudo),
    name: info.header.competitions[0].competitors[0].team.displayName,
    formation: info.rosters[0].formation
  })

  const [info_away, set_info_away] = useState({
    logo: ("logos" in info.header.competitions[0].competitors[1].team? info.header.competitions[0].competitors[1].team.logos[0].href : escudo),
    name: info.header.competitions[0].competitors[1].team.displayName,
    formation: info.rosters[1].formation
  })


  useEffect(() => {
    console.log(info)


  }, [])


  const get_play_img = (play, p_in, p_out) => {

    if (play.penaltyKick)
      return penalty
    else if (play.didScore)
      return goal
    else if (play.didAssist)
      return boot
    else if (play.redCard)
      return red
    else if (play.yellowCard)
      return yellow
    else if (play.substitution)
      return p_in ? arrow_in : arrow_out


  }

  const PosContainer = ({ player }) => {
    const [display, set_display] = useState("none")
    return (
      <div className="container">
        <div className="pos-display"
          style={{ display: (display) }}
        >{player.position?.displayName}</div>
        <div className="position"
          onMouseEnter={() => set_display("block")}
          onMouseLeave={() => set_display("none")}
        >
          {player.position?.abbreviation}
        </div>
      </div>
    )
  }


  const Player = ({ player }) => {

    return (
      <div className="player">
        <PosContainer player={player} />
        <div className="jersey">{player.jersey}</div>
        <div className="name">{player.athlete.displayName}</div>
        <div className="plays">

          {
            "plays" in player &&
            player.plays.map((play, i) => (
              <div key={i} className='play'>
                <img key={i} src={get_play_img(play, player.subbedIn, player.subbedOut)} alt="Play" width={IMG_SIZE_2} height={IMG_SIZE_2} />
                <span>{play.clock.displayValue}</span>
              </div>
            ))

          }
        </div>
      </div>

    )
  }


  return (

    <div className="lineups_container">
      <div className="switch-container">
        <div className="switch">

          <div className={`element ${home_selected && "selected"}`}
            onClick={() => {
              set_home_selected(prev => !prev)

            }}
          >
            <img src={info_home.logo} alt="Escudo" width={IMG_SIZE_1} height={IMG_SIZE_1} />
            <div className="team-name">{info_home.formation}</div>
          </div>



          <div className={`element ${!home_selected && "selected"}`}
            onClick={() => {
              set_home_selected(!home_selected)

            }}
          >
            <img src={info_away.logo} alt="Escudo" width={IMG_SIZE_1} height={IMG_SIZE_1} />
            <div className="team-name"> {info_away.formation}</div>
          </div>

        </div>

      </div>

      <div className="teams-container">

        {
          home_selected ?
            <div className="team">
              <div className="players players-main">
                <div className="title">TITULARES</div>

                {
                  info.rosters[0].roster.filter(p => p.starter).map((player, i) => (

                    <Player key={i} player={player} />
                  ))
                }

              </div>

              <div className="players players-sub">
                <div className="title">SUPLENTES</div>
                {
                  info.rosters[0].roster.filter(p => !p.starter).map((player, i) => (

                    <Player key={i} player={player} />
                  ))
                }

              </div>


            </div>
            :
            <div className="team">
              <div className="players players-main">
                <div className="title">TITULARES</div>
                {
                  info.rosters[1].roster.filter(p => p.starter).map((player, i) => (

                    <Player key={i} player={player} />
                  ))
                }

              </div>

              <div className="players players-sub">
                <div className="title">SUPLENTES</div>
                {
                  info.rosters[1].roster.filter(p => !p.starter).map((player, i) => (

                    <Player key={i} player={player} />
                  ))
                }

              </div>
            </div>

        }


      </div>
    </div>

  )
}

export default Lineups