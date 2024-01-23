import React from 'react'
import { format_main_date} from '../../../utils/time'

const MainInfo = ({info}) => {
  return (
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
        <div className="data">{`${info.gameInfo.venue.address.city}${"country" in info.gameInfo.venue.address ? ", " + info.gameInfo.venue.address.country : ""}`}</div>
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
  )
}

export default MainInfo