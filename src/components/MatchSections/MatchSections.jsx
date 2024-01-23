import React, { useEffect, useState } from 'react'
import Information from './Information/Information'
import Lineups from './Lineups/Lineups'
import Commentary from './Commentary/Commentary'
import Stats from './Stats/Stats'
import Tables from './Tables/Tables'
import Videos from './Videos/Videos'
import Spinner from '../Spinner/Spinner'

const MatchSections = ({ match_data }) => {

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

    if ("statistics" in match_data.boxscore.teams[0] && match_data.boxscore.teams[0].statistics.length > 0)
      set_navigation_tags(prev => [...prev, "Estadísticas"])

    if (match_data.videos?.length)
      set_navigation_tags(prev => [...prev, "Videos"])

    if (match_data.standings.groups.length && match_data.standings.groups[0].standings.entries.length)
      set_navigation_tags(prev => [...prev, "Tablas"])

  }, [])




  const get_section = (selected_tab) => {
    switch (selected_tab) {
      case "Información":
        return <Information info={match_data} />
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