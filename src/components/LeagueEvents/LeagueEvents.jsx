import React, { useContext, useEffect } from 'react'
import EventCard from '../EventCard/EventCard'


const LeagueEvents = (props) => {



  return (
    <div className='league-events_container'>
      <div className="league-header">
        {/* <div></div> */}
        <div className="league-name">{props.league.name}</div>
        {/* <button className='hide-league-btn'>-</button> */}
      </div>

      {
        props.league.events.map((match, i) => (
          <EventCard key={i} match={match} />
        ))
      }
{/* 
      <div className='league_menu'>
        <div> Tablas</div>
        <div>Fixture</div>
        <div>Equipos</div>
      </div> */}
    </div>
  )
}

export default LeagueEvents