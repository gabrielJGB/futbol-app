import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';
import { match_active } from '../../utils/match';
import EventCard from '../EventCard/EventCard'

const LeagueEvents = (props) => {
  const data = useContext(DataContext)
  const navigate = useNavigate()
  const IMG_SIZE_1 = 27



  const get_display = () => {
    if (data.show_only_playing) {
      return match_active(props.league) ? "" : "none"
    } else {
      return ""
    }
  }

  const get_flag = () => {
    const slug = props.league.slug.slice(0, 3)
    const arr = ['fif', 'afc', 'clu','con','uef']

    if (arr.includes(slug)) {
      return (<div></div>)
    }

    return (
      <img src={`https://a.espncdn.com/i/teamlogos/countries/500/${props.league.slug.slice(0, 3)}.png`} alt="Bandera" width={IMG_SIZE_1*1} height={IMG_SIZE_1} />
    )
  }

  return (
    <div className='league-events_container' style={{ display: (get_display()) }}>
      <div className="league-header"
           onClick={() => { 
            
            navigate(`/league/${(props.league.slug)}`)
           }}
      >
        {get_flag()}
        <div className="league-name">{props.league.name.replace("Argentine", "")}</div>
        {get_flag()}

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