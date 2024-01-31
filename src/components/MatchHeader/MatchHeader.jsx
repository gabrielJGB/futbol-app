import React, { useEffect } from 'react'
import { red, goal, penal, escudo } from '../../assets'
import { get_status, is_playing } from '../../utils/match'

const MatchHeader = ({ header_info }) => {
    const IMG_SIZE_1 = 50
    const IMG_SIZE_2 = 10
    const IMG_SIZE_3 = 15

    


    const get_icon = (detail) => {

        if (detail.penaltyKick)
            return <img className='icon' src={penal} alt="penal" width={IMG_SIZE_3} height={IMG_SIZE_3} />
        else if (detail.redCard)
            return <img className='icon' src={red} alt="roja" width={IMG_SIZE_2} height={IMG_SIZE_2} />
        else if (detail.scoringPlay)
            return <img className='icon' src={goal} alt="gol" width={IMG_SIZE_2} height={IMG_SIZE_2} />
    }

    const is_home_team = (displayName) => {
        return header_info.competitions[0].competitors[0].team.displayName === displayName

    }

    const get_escudo = (elem) => {
        if ("logos" in elem && elem.logos[0].href != "") {
            return <img src={elem.logos[0].href} alt="Escudo" width={IMG_SIZE_1} height={IMG_SIZE_1} />
        }
        return <img src={escudo} alt="Escudo" width={IMG_SIZE_1} height={IMG_SIZE_1} />

    }



    return (
        <div className="match-header">
            <div className="league-name">
                {
                    header_info.season.name.replace("Argentine","")
                }
            </div>


            <div className="header-top">
                <div className="team">
                    {get_escudo(header_info.competitions[0].competitors[0].team)}
                    <div className="name">{header_info.competitions[0].competitors[0].team?.displayName}</div>
                </div>

                <div className="score-container">
                    <div className="score">
                        <span className={`score-local ${header_info.competitions[0].competitors[0].winner && "winner"}`}>{header_info.competitions[0].competitors[0].score}</span>
                        <span>{" - "}</span>
                        <span className={`score-away ${header_info.competitions[0].competitors[1].winner && "winner"}`}>{header_info.competitions[0].competitors[1].score}</span>
                    </div>

                    {
                        "shootoutScore" in header_info.competitions[0].competitors[0] &&
                        <div className='shootout'>
                            {"(" + header_info.competitions[0].competitors[0].shootoutScore + "-" +
                                header_info.competitions[0].competitors[1].shootoutScore + ")"}
                        </div>
                    }

                    <div className={`status ${is_playing(header_info.competitions[0].status) && "playing"}`}>
                        {get_status(header_info.competitions[0].status)}
                    </div>
                </div>

                <div className="team">

                    {get_escudo(header_info.competitions[0].competitors[1].team)}
                    <div className="name">{header_info.competitions[0].competitors[1].team?.displayName}</div>
                </div>

            </div>

            <div className="header-bottom">

                {
                    header_info.competitions[0].details?.map((detail, i) => (
                        <div
                            key={i}
                            className="detail" >

                            {
                                is_home_team(detail.team.displayName) ?
                                    <>
                                        <div className="player">
                                            {get_icon(detail)}
                                            <span>{"participants" in detail ? detail.participants[0].athlete.displayName : "Expulsión"}</span>
                                            <span>{detail.ownGoal && ' (EC)'}</span>
                                        </div>
                                        <div className="minute">{detail.clock.displayValue}</div>
                                        <div className='box'></div>
                                    </>
                                    :
                                    <>
                                        <div className='box'></div>
                                        <div className="minute">{detail.clock.displayValue}</div>
                                        <div className="player">
                                            {get_icon(detail)}
                                            {"participants" in detail ? detail.participants[0].athlete.displayName : "Expulsión"}
                                            <span>{detail.ownGoal && ' (EC)'}</span>
                                        </div>
                                    </>

                            }

                        </div>
                    ))
                }


            </div>
        </div>
    )
}

export default MatchHeader