import React from 'react'

const Information = ({ info }) => {

  // console.log("INFO")
  // console.log("Enfrentamientos previos", match_data.headToHeadGames[0].events.length) //con respecto al local
  // console.log("Estadio",match_data.gameInfo.venue?.fullName)
  // console.log("Ciudad",match_data.gameInfo.venue?.address?.city)
  // console.log("Pais",match_data.gameInfo.venue?.address?.country)
  // console.log("Espectadores","attendance" in match_data.gameInfo)
  // console.log("Arbitro", "officials" in match_data.gameInfo)
  // console.log("Penales", "shootout" in  match_data)
  console.log(info)

  return (
    <div className='info_container'>

      <div className="info">


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
            <div className="title"> Penales </div>

            <div className="shootout-container">

              <div className="home">
                {
                  info.shootout[0].shots.map((shot, i) => (
                    <div key={i} className="shoot">
                      <div>{shot.shotNumber}</div>
                      <div className="circle" style={{ backgroundColor: (shot.didScore ? "green" : "red") }}></div>
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
                      <div className="circle" style={{ backgroundColor: (shot.didScore ? "green" : "red") }}></div>
                      <div className="shot-number">{shot.shotNumber}</div>
                    </div>
                  ))
                }
              </div>
            </div>

          </div>
      }





    </div>
  )
}

export default Information