import { useContext, useEffect } from 'react';
import { DataContext } from '../../context/DataContext';
import EventCard from '../EventCard/EventCard'

const LeagueEvents = (props) => {
  const data = useContext(DataContext)

  const is_match_in_play = objeto => {

    if (objeto.hasOwnProperty("state") && objeto["state"] === "in") {
        return true;
    }

    for (let propiedad in objeto) {
        if (objeto[propiedad] !== null && typeof objeto[propiedad] === "object") {
            let resultado = is_match_in_play(objeto[propiedad], "state");
            if (resultado) {
                return true;
            }
        }
    }

    return false;
}

  const get_display = ()=>{
      if(data.show_only_playing){
        return is_match_in_play(props.league)?"":"none"
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