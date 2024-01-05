import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { fetch_json } from '../../utils/fetch_json'
import red_card from '../../assets/red.png'
import goal from '../../assets/goal.png'
import penalty from '../../assets/penal.png'


function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Match = () => {
    const [loading, set_loading] = useState(true)
    const [header_info, set_header_info] = useState(false)
    let query = useQuery();
    let id = query.get("id");
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


    useEffect(() => {
        let link = "https://site.web.api.espn.com/apis/site/v2/sports/soccer/all/summary?region=ar&lang=es&contentorigin=deportes&event=" + id


        fetch_json(link)
            .then(resp => {
                set_header_info(resp.header)
                console.log(resp)
            })
            .catch(error => console.log(error))
            .finally(() => set_loading(false))

    }, [])


    if (loading) {
        return (
            <Spinner />
        )
    }

    return (
        <div className='match_container'>
            
                
                <div className="league-name">{header_info.season.name}</div>
                <div className="header-top">
                    <div className="team">
                        <img src={header_info.competitions[0]?.competitors[0].team.logos[0].href} alt={`Escudo`} width={IMG_SIZE_1} height={IMG_SIZE_1} />
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
                        <img src={header_info.competitions[0]?.competitors[1].team.logos[0].href} alt={`Escudo`} width={IMG_SIZE_1} height={IMG_SIZE_1} />
                        <div className="name">{header_info.competitions[0].competitors[1].team?.displayName}</div>
                    </div>

                </div>
                <div className="header-bottom">


                    {
                        header_info.competitions[0].details?.map((detail, i) => (
                            <div
                                key={i}
                                className="detail"
                            // className={`detail ${is_home_team(detail.team.displayName)?"home":"away"}`}
                            >

                                {
                                    is_home_team(detail.team.displayName) ?
                                        <>
                                            <div className="player">
                                                {get_icon(detail)}
                                                <span>{detail.participants[0].athlete.displayName}</span>
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
                                                {detail.participants[0].athlete.displayName}
                                            </div>
                                        </>

                                }





                            </div>
                        ))
                    }

                    {/* <div className="player" style={{alignSelf:"flex-start"}}>Haddadi 12'</div>
          
                        <div className="player">Torres 55'</div>
                        <div className="player" style={{alignSelf:"flex-end"}}>Torres 90'</div> */}

                </div>

                

                
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ducimus non sunt, quam quae error ipsam neque totam cumque? Omnis repellendus dolorem error neque voluptatum, rem vel incidunt veniam cum!
                Quae, sunt cum vel optio inventore facere ex molestias, necessitatibus ut at libero corporis quod adipisci. Est tenetur suscipit exercitationem eaque delectus quibusdam, repellendus cupiditate maiores tempore molestiae! Id, laborum.</p>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ducimus non sunt, quam quae error ipsam neque totam cumque? Omnis repellendus dolorem error neque voluptatum, rem vel incidunt veniam cum!
                Quae, sunt cum vel optio inventore facere ex molestias, necessitatibus ut at libero corporis quod adipisci. Est tenetur suscipit exercitationem eaque delectus quibusdam, repellendus cupiditate maiores tempore molestiae! Id, laborum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ducimus non sunt, quam quae error ipsam neque totam cumque? Omnis repellendus dolorem error neque voluptatum, rem vel incidunt veniam cum!
                Quae, sunt cum vel optio inventore facere ex molestias, necessitatibus ut at libero corporis quod adipisci. Est tenetur suscipit exercitationem eaque delectus quibusdam, repellendus cupiditate maiores tempore molestiae! Id, laborum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ducimus non sunt, quam quae error ipsam neque totam cumque? Omnis repellendus dolorem error neque voluptatum, rem vel incidunt veniam cum!
                Quae, sunt cum vel optio inventore facere ex molestias, necessitatibus ut at libero corporis quod adipisci. Est tenetur suscipit exercitationem eaque delectus quibusdam, repellendus cupiditate maiores tempore molestiae! Id, laborum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ducimus non sunt, quam quae error ipsam neque totam cumque? Omnis repellendus dolorem error neque voluptatum, rem vel incidunt veniam cum!
                Quae, sunt cum vel optio inventore facere ex molestias, necessitatibus ut at libero corporis quod adipisci. Est tenetur suscipit exercitationem eaque delectus quibusdam, repellendus cupiditate maiores tempore molestiae! Id, laborum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ducimus non sunt, quam quae error ipsam neque totam cumque? Omnis repellendus dolorem error neque voluptatum, rem vel incidunt veniam cum!
                Quae, sunt cum vel optio inventore facere ex molestias, necessitatibus ut at libero corporis quod adipisci. Est tenetur suscipit exercitationem eaque delectus quibusdam, repellendus cupiditate maiores tempore molestiae! Id, laborum.</p>


        </div>
    )
}

export default Match