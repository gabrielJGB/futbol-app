import React from 'react'
import { get_status, is_playing } from '../../../utils/match.js'

const Score = (props) => {

    return (
        <div className="score-container">
            <div className="score">
                <div className={`score-local ${props.score[1].winner && "winner"}`}>{props.score[1].score}</div>
                <span>-</span>
                <div className={`score-away ${props.score[0].winner && "winner"}`}>{props.score[0].score}</div>
            </div>

            {
                "shootoutScore" in props.score[1] &&
                <div className='shootout'>
                    {"(" + props.score[1].shootoutScore + "-" +
                        props.score[0].shootoutScore + ")"}
                </div>
            }

            <div className={`status ${is_playing(props.status) && "playing"}`} >
                {
                    get_status(props.status)
                }
            </div>
        </div>
    )
}

export default Score