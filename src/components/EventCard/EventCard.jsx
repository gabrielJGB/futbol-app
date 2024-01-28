import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Team from './Team/Team'
import Score from './Score/Score'
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';

const EventCard = (props) => {
  const navigate = useNavigate()  
  const data = useContext(DataContext)



  const get_display = ()=>{
    if(data.show_only_playing){
      return (props.match.status!= "in"?"none":"")
    }else{
      return ""
    }
}



  return (
    <div  className='event-card_container'
          style={{display:(get_display())}}
          onClick={() => navigate(`match/${props.match.id}`)} >

      <div className="match-container">
        <Team team={props.match.competitors[1]} />
        <Score score={props.match.competitors} status={"fullStatus" in props.match? props.match.fullStatus: props.match.status} />
        <Team team={props.match.competitors[0]} />
      </div>

    </div>
  )
}

export default EventCard