import React from 'react'
import escudo from '../../assets/escudo.png'

const Information = ({ info }) => {

  const IMG_SIZE = 29

  // console.log("INFO")
  // console.log("Enfrentamientos previos", match_data.headToHeadGames[0].events.length) //con respecto al local
  // console.log("Estadio",match_data.gameInfo.venue?.fullName)
  // console.log("Ciudad",match_data.gameInfo.venue?.address?.city)
  // console.log("Pais",match_data.gameInfo.venue?.address?.country)
  // console.log("Espectadores","attendance" in match_data.gameInfo)
  // console.log("Arbitro", "officials" in match_data.gameInfo)
  // console.log("Penales", "shootout" in  match_data)
  console.log(info)

  const get_selector = (result) => {
    switch (result) {
      case "E":
        return "tie"
      case "P":
        return "lost"
      case "G":
        return "win"
      default:
        return ""
    }

  }

  const format_main_date = (date) => {
    let a = date.split("T")[0]
    let b = a.split("-")
    
    const month_arr = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

    let day = b[2]
    let month = month_arr[parseInt(b[1])-1]
    let year= b[0]

    return `${parseInt(day)} de ${month} de ${year}`

  }


  const format_game_date = (date) => {

    let a = date.split("T")[0]
    let b = a.split("-")

    return `${b[2]}/${b[1]}/${b[0].slice(2)}`

  }

  const Team = ({ team }) => {
    return (
      <div className='team'>
        <div className="info">
          <img src={"logo" in team.team? team.team.logo:escudo} alt="Escudo" width={IMG_SIZE} height={IMG_SIZE} />
          <div className="name">{team.team.displayName} vs:</div>
        </div>
        <div className="games">
          {
            team.events.map((game, i) => (
              <div key={i} className='game'>
                <div className="left">
                  <div className="top">


                    <div className="title">{game.leagueName}</div>
                  </div>
                  <div className="bottom">
                    <div className="date">{format_game_date(game.gameDate)}</div>
                    <div className="vsAt">{(game.atVs === "en" ? "(V)" : "(L)")}</div>
                    <img src={"logo" in game.opponent ? game.opponent.logo : escudo} alt="" width={IMG_SIZE} height={IMG_SIZE} />
                    <div className="opponent">{game.opponent.displayName}</div>

                  </div>
                </div>
                <div className={`right ${get_selector(game.gameResult)}`}>
                  {game.score}
                </div>

              </div>
            ))
          }
        </div>

      </div>
    )
  }


  return (
    <div className='info_container'>

      <div className="info">

        {
          <div className="info_box">
            <div className="data">{format_main_date(info.header.competitions[0].date)}</div>
            <div className="name">Fecha</div>
          </div>
        }


        {
          info.gameInfo.venue &&
          <div className='info_box'>
            <div className="data">{info.gameInfo.venue.fullName}</div>
            <div className="name">Estadio</div>
          </div>
        }


        {
          "venue" in info.gameInfo && "city" in info.gameInfo.venue.address &&
          <div className='info_box'>
            <div className="data">{`${info.gameInfo.venue.address.city}, ${info.gameInfo.venue?.address?.country}`}</div>
            <div className="name">Ciudad</div>
          </div>
        }

        {
          "attendance" in info.gameInfo && info.gameInfo.attendance > 0 &&
          <div className='info_box'>
            <div className="data">{info.gameInfo.attendance}</div>
            <div className="name">Espectadores</div>
          </div>
        }

        {
          "officials" in info.gameInfo &&
          <div className='info_box'>
            <div className="data">{info.gameInfo.officials[0].fullName}</div>
            <div className="name">Arbitro</div>
          </div>
        }

      </div>


      {
        "shootout" in info &&
        <div className='penalties'>
          <div className="title">
            <div className='team'>{info.shootout[0].team}</div>
            <div>Penales</div>
            <div className='team'>{info.shootout[1].team}</div>
          </div>

          <div className="shootout-container">

            <div className="home">
              {
                info.shootout[0].shots.map((shot, i) => (
                  <div key={i} className="shoot">
                    <div >{shot.shotNumber}</div>
                    <div className="circle" style={{ backgroundColor: (shot.didScore ? "lime" : "red") }}></div>
                    <div className="name">{shot.player}</div>
                  </div>
                ))
              }
            </div>

            <div className="away">
              {
                info.shootout[1].shots.map((shot, i) => (
                  <div className="shoot" style={{ justifyContent: "right" }}>
                    <div className="name">{shot.player}</div>
                    <div className="circle" style={{ backgroundColor: (shot.didScore ? "lime" : "red") }}></div>
                    <div className="shot-number">{shot.shotNumber}</div>
                  </div>
                ))
              }
            </div>
          </div>

        </div>
      }


      <div className="last-games">
        <h2 className="title">Últimos 5 Partidos</h2>
        <div className="teams-container">

          {<Team team={info.boxscore.form[0]} />}
          {<Team team={info.boxscore.form[1]} />}

        </div>
      </div>


    </div>
  )
}

export default Information