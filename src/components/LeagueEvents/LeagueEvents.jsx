import { useContext, useEffect } from 'react';
import { DataContext } from '../../context/DataContext';
import { match_active } from '../../utils/match';
import EventCard from '../EventCard/EventCard'

const LeagueEvents = (props) => {
  const data = useContext(DataContext)

 
  const get_display = ()=>{
      if(data.show_only_playing){
        return match_active(props.league)?"":"none"
      }else{
        return ""
      }
  }
  
  

  return (
    <div className='league-events_container' style={{display:(get_display())}}>
      <div className="league-header">
        <div className="league-name">{props.league.name}</div>
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