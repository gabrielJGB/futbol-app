import React from 'react'
import red_card from '../../assets/red.png'
import goal from '../../assets/goal.png'
import penalty from '../../assets/penal.png'
import escudo from '../../assets/escudo.png'

const MatchHeader = ({header_info}) => {
    const IMG_SIZE_1 = 50
    const IMG_SIZE_2 = 10
    const IMG_SIZE_3 = 15




    const get_icon = (detail) => {

        if (detail.penaltyKick)
            return <img className='icon' src={penalty} alt="penal" width={IMG_SIZE_3} height={IMG_SIZE_3} />
        else if (detail.redCard)
            return <img className='icon' src={red_card} alt="roja" width={IMG_SIZE_2} height={IMG_SIZE_2} />
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
            <div className="league-name">{header_info.season.name}</div>
            <div className="header-top">
                <div className="team">

                    {get_escudo(header_info.competitions[0].competitors[0].team)}
                    <div className="name">{header_info.competitions[0].competitors[0].team?.displayName}</div>
                </div>

                <div className="score-container">
                    <div className="score">
                        <span className="score-local">{header_info.competitions[0].competitors[0].score}</span>
                        <span>{" - "}</span>
                        <span className="score-away">{header_info.competitions[0].competitors[1].score}</span>
                    </div>
                    <div className="status">{header_info.competitions[0].status.type.detail}</div>
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
                            className="detail"

                        >

                            {
                                is_home_team(detail.team.displayName) ?
                                    <>
                                        <div className="player">
                                            {get_icon(detail)}
                                            <span>{"participants" in detail ? detail.participants[0].athlete.displayName : "Expulsión"}</span>
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