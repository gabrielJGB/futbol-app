import React from 'react'
import { useNavigate } from 'react-router-dom'
import { format_game_date} from '../../../utils/time'
const IMG_SIZE = 29


const History = ({ info }) => {
    const navigate = useNavigate()

    const HistoryMatch = ({ match_info }) => {
        let home = {}
        let away = {}
        let t = ""


        if (match_info.atVs === "vs") {
            home = info.headToHeadGames[0].team
            away = match_info.opponent


        } else {
            home = match_info.opponent
            away = info.headToHeadGames[0].team

        }


        return (
            <div className="match"
                onClick={() => {
                    navigate(`/match/${match_info.id}`)
                    navigate(0)
                }}
            >
                <div className="header">
                    <span>{format_game_date(match_info.gameDate)}</span> - <span>{match_info.leagueName}</span>
                </div>
                <div className="container">
                    <div className="team home">

                        <div className="name">{home.displayName}</div>
                        <img src={"logo" in home ? home.logo : escudo} alt="Escudo" width={IMG_SIZE} height={IMG_SIZE} />
                    </div>
                    <div className="score">
                        <span>{match_info.homeTeamScore}</span>
                        <span className='dash'>{"-"}</span>
                        <span>{match_info.awayTeamScore}</span>
                    </div>
                    <div className="team away">
                        <img src={"logo" in away ? away.logo : escudo} alt="Escudo" width={IMG_SIZE} height={IMG_SIZE} />
                        <div className="name">{away.displayName}</div>
                    </div>
                </div>
                {/* <div>{home.displayName}</div>
            vs
            <div>{away.displayName}</div> */}
            </div>
        )
    }

    return (
        <>
            {
                info.headToHeadGames[0].events.length > 0 &&

                <div className="history">

                    <h2>Historial reciente</h2>

                    <div className="history-container">
                        {
                            info.headToHeadGames[0].events.map((e, i) => (
                                <HistoryMatch match_info={e} key={i} />
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default History