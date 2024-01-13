import React, { useEffect, useState } from 'react'
import Information from './Information'
import Lineups from './Lineups'
import Commentary from './Commentary'
import Stats from './Stats'
import Tables from './Tables'
import Videos from './Videos'
import Spinner from '../Spinner/Spinner'

const MatchSections = ({ match_data }) => {

  const [loading, set_loading] = useState(false)
  const [navigation_tags, set_navigation_tags] = useState([])
  const [selected_tab, set_selected_tab] = useState("Información")


  useEffect(() => {
    

    set_navigation_tags(["Información"])

    if ("roster" in match_data.rosters[0])
      set_navigation_tags(prev => [...prev, "Formaciones"])

    if ("commentary" in match_data)
      set_navigation_tags(prev => [...prev, "Relato"])
    else if ("keyEvents" in match_data)
      set_navigation_tags(prev => [...prev, "Relato"])

    if ("statistics" in match_data.boxscore.teams[0])
      set_navigation_tags(prev => [...prev, "Estadísticas"])

    if (match_data.videos?.length ? true : false)
      set_navigation_tags(prev => [...prev, "Videos"])

    if (match_data.standings.groups.length ? true : false)
      set_navigation_tags(prev => [...prev, "Tablas"])






    // console.log("Formaciones","roster" in match_data.rosters[0])
    // console.log("Videos", match_data.videos?.length?true:false)
    // console.log("Comentarios","commentary" in match_data)
    // console.log("Eventos clave","keyEvents" in match_data)
    // console.log("Tabla", match_data.standings.groups.length?true:false)
    // console.log("Estadisticas", "statistics" in match_data.boxscore.teams[0])


    // console.log("INFO")
    // console.log("Enfrentamientos previos", match_data.headToHeadGames[0].events.length) //con respecto al local
    // console.log("Estadio",match_data.gameInfo.venue?.fullName)
    // console.log("Ciudad",match_data.gameInfo.venue?.address?.city)
    // console.log("Pais",match_data.gameInfo.venue?.address?.country)
    // console.log("Espectadores","attendance" in match_data.gameInfo)
    // console.log("Arbitro", "officials" in match_data.gameInfo)
    // console.log("Penales", "shootout" in  match_data)


  }, [])




  const get_section = (selected_tab) => {
    switch (selected_tab) {
      case "Información":
        return <Information info={match_data}/>
      case "Formaciones":
        return <Lineups info={match_data} />
      case "Relato":
        return <Commentary info={match_data} />
      case "Estadísticas":
        return <Stats info={match_data} />
      case "Videos":
        return <Videos info={match_data} />
      case "Tablas":
        return <Tables info={match_data} />
    }
  }


  return (
    <div className='match-sections_container'>

      <div className="match-sections_navigation">

        {
          navigation_tags.map((tab, i) => (
            <div
              key={i}
              onClick={() => { set_selected_tab(tab) }}
              className={`tab ${selected_tab === tab && "selected"}`}

            >{tab}</div>
          ))
        }

      </div>

      <div className="match-sections_section">

        {get_section(selected_tab)}

      </div>

    </div>
  )
}

export default MatchSections