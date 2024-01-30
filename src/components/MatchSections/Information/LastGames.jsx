import React from 'react'
import { format_game_date } from '../../../utils/time'
import { escudo } from '../../../assets'
import { useNavigate } from 'react-router-dom'

const LastGames = ({info}) => {
    const navigate = useNavigate()
    const IMG_SIZE = 29

    const get_selector = (result) => {
        switch (result) {
            case "E":
                return "tie"
            case "P":
                return "lost"
            case "G":
                return "win"
            default:
                return ""
        }

    }

    const Team = ({ team }) => {
        return (
            <div className='team'>
                <div className="info">
                    <img src={"logo" in team.team ? team.team.logo : escudo} alt="Escudo" width={IMG_SIZE} height={IMG_SIZE} />
                    <div className="name">{team.team.displayName} vs:</div>
                </div>
                <div className="games">
                    {
                        team.events.map((game, i) => (
                            <div key={i} className='game' onClick={() => {
                                navigate(`/match/${game.id}`)
                                navigate(0)
                            }}>


                                <div className="left">
                                    <div className="top">


                                        <div className="title">{format_game_date(game.gameDate)} - {game.leagueName.replace("Argentine","")}</div>
                                    </div>
                                    <div className="bottom">
                                        <div className="vsAt">{(game.atVs === "en" ? "(V)" : "(L)")}</div>

                                        <img src={"logo" in game.opponent ? game.opponent.logo : escudo} alt="" width={IMG_SIZE} height={IMG_SIZE} />
                                        <div className="opponent">{game.opponent.displayName}</div>

                                    </div>
                                </div>
                                <div className={`right ${get_selector(game.gameResult)}`}>
                                    {game.score}
                                </div>

                            </div>
                        ))
                    }
                </div>

            </div>
        )
    }

    return (
        <div className="last-games">
            <h2 className="title">Últimos Partidos</h2>
            <div className="teams-container">

                {<Team team={info.boxscore.form[0]} />}
                {<Team team={info.boxscore.form[1]} />}

            </div>
        </div>

    )
}

export default LastGames