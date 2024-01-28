import React, { useEffect } from 'react'
import { escudo } from '../../assets/index'
import { get_status, is_playing } from '../../utils/match'


const Event = ({ match }) => {
    const IMG_SIZE_1 = 30

    const get_escudo = (elem) => {

        if ("logo" in elem && elem.logo != "") {
            return <img src={elem.logo} alt="Escudo" width={IMG_SIZE_1} height={IMG_SIZE_1} />
        }
        return <img src={escudo} alt="Escudo" width={IMG_SIZE_1} height={IMG_SIZE_1} />

    }



    return (
        <div className="event_container">
            <div className="team home">
                {get_escudo(match.competitions[0].competitors[0].team)}
                <div className="team-name">{match.competitions[0].competitors[0].team.shortDisplayName}</div>
            </div>

            <div className="score-container">
                <div className="score">
                    <div className="score-local">
                        {
                            match.status.type.state != "pre" &&
                            match.competitions[0].competitors[0].score
                        }
                    </div>
                    <span>-</span>
                    <div className="score-away">
                        {
                            match.status.type.state != "pre" &&
                            match.competitions[0].competitors[1].score
                        }
                    </div>
                </div>

                {/* {
                    "shootoutScore" in props.score[1] &&
                    <div className='shootout'>
                        {"(" + props.score[1].shootoutScore + "-" +
                            props.score[0].shootoutScore + ")"}
                    </div>
                } */}

                <div className={`status ${is_playing(match.status) && "playing"}`} >
                    {
                        get_status(match.status)
                    }
                </div>
            </div>

            <div className="team away">
                {get_escudo(match.competitions[0].competitors[1].team)}
                <div className="team-name">{match.competitions[0].competitors[1].team.shortDisplayName}</div>

            </div>

        </div>
    )
}

export default Event