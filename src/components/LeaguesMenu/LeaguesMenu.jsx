import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../context/DataContext'

const LeaguesMenu = () => {
    const data = useContext(DataContext)
    const navigate = useNavigate()
    const IMG_SIZE_1 = 18


    const leagues_europe = [
        {
            "name": "Champions League",
            "slug": "uefa.champions"
        },
        {
            "name": "Europa League",
            "slug": "uefa.europa"
        },
        {
            "name": "Nations League",
            "slug": "uefa.nations"
        },
        {
            "name": "LA LIGA",
            "slug": "esp.1"
        },
        {
            "name": "Copa del Rey",
            "slug": "esp.copa_del_rey"
        },
        {
            "name": "2da Div. España",
            "slug": "esp.2"
        },
        {
            "name": "Premier League",
            "slug": "eng.1"
        },
        {
            "name": "Championship",
            "slug": "eng.2"
        },
        {
            "name": "FA Cup",
            "slug": "eng.fa"
        },
        {
            "name": "Copa de la Liga",
            "slug": "eng.league_cup"
        },
        {
            "name": "Premier Escocia",
            "slug": "sco.1"
        },
        {
            "name": "Serie A",
            "slug": "ita.1"
        },
        {
            "name": "Serie B",
            "slug": "ita.2"
        },

        {
            "name": "Ligue 1 Francia",
            "slug": "fra.1"
        },

        {
            "name": "Ligue 2 Francia",
            "slug": "fra.2"
        },

        {
            "name": "Bundesliga",
            "slug": "ger.1"
        },
        {
            "name": "Bundesliga 2",
            "slug": "ger.2"
        },
        {
            "name": "Copa de Alemania",
            "slug": "ger.dfb_pokal"
        },
        {
            "name": "Eredivise",
            "slug": "ned.1"
        },
        {
            "name": "2da Div. Holanda",
            "slug": "ned.2"
        }
        ,
        {
            "name": "Copa de Holanda",
            "slug": "ned.cup"
        },

        {
            "name": "Liga Portugal",
            "slug": "por.1"
        },
        {
            "name": "Premier de Rusia",
            "slug": "rus.1"
        },
        {
            "name": "Liga de Bélgica",
            "slug": "bel.1"
        },
        {
            "name": "Super Lig Turquía",
            "slug": "tur.1"
        },
        {
            "name": "Super League Grecia",
            "slug": "gre.1"
        },
    ]

    const leagues_sa = [
        {
            "name": "Libertadores",
            "slug": "conmebol.libertadores"
        },
        {
            "name": "Sudamericana",
            "slug": "conmebol.sudamericana"
        },
        {
            "name": "Liga Profesional",
            "slug": "arg.1"
        },
        {
            "name": "Copa de la Liga",
            "slug": "arg.copa_lpf"
        },
        {
            "name": "Primera Nacional",
            "slug": "arg.2"
        },
        {
            "name": "Primera B",
            "slug": "arg.3"
        },
        {
            "name": "Primera C",
            "slug": "arg.4"
        },
        {
            "name": "Primera D",
            "slug": "arg.5"
        },
        {
            "name": "Brasileirao",
            "slug": "bra.1"
        },
        {
            "name": "Serie B",
            "slug": "bra.2"
        },
        {
            "name": "Copa do Brasil",
            "slug": "bra.copa_do_brazil"
        },
        {
            "name": "Camp. Carioca",
            "slug": "bra.camp.carioca"
        },
        {
            "name": "Camp. Gaúcho",
            "slug": "bra.camp.gaucho"
        },
        {
            "name": "Camp. Paulista",
            "slug": "bra.camp.paulista"
        },
        {
            "name": "Primera A",
            "slug": "col.1"
        },
        {
            "name": "Primera B",
            "slug": "col.2"
        },
        {
            "name": "Liga Chilena",
            "slug": "chi.1"
        },
        {
            "name": "Liga Pro",
            "slug": "ecu.1"
        },
        {
            "name": "Liga Paraguay",
            "slug": "par.1"
        },
        {
            "name": "Camp. Uruguayo",
            "slug": "uru.1"
        },
        {
            "name": "Liga1",
            "slug": "per.1"
        },
        {
            "name": "Primera división",
            "slug": "ven.1"
        },
        {
            "name": "Liga Profesional",
            "slug": "bol.1"
        },

    ]

    const leagues_int = [
        {
            "name": "Mundial FIFA",
            "slug": "fifa.world"
        },
        {
            "name": "Copa Confed.",
            "slug": "fifa.confederations"
        },
        {
            "name":"JJOO",
            "slug":"fifa.olympics"
        },
        {
            "name":"Mundial Sub 17",
            "slug":"fifa.world.u17"
        },
        {
            "name":"Mundial Sub 20",
            "slug":"fifa.world.u20"
        },
        {
            "name":"Copa América",
            "slug":"conmebol.america"
        },
        {
            "name":"Nations League",
            "slug":"uefa.nations"
        },
        {
            "name":"Elim. CONMEBOL",
            "slug":"fifa.worldq.conmebol"
        },
                {
            "name":"Elim. CONCACAF",
            "slug":"fifa.worldq.concacaf"
        },
        {
            "name":"Elim. Africa",
            "slug":"fifa.worldq.caf"
        },
        {
            "name":"Elim. Eurocopa",
            "slug":"fifa.worldq."
        },
        {
            "name":"Amistosos",
            "slug":"fifa.firendly"
        },
                {
            "name":"Copa Africana",
            "slug":"caf.nations"
        },
        {
            "name":"Copa Asia",
            "slug":"afc.cupq"
        },
    ]


    const get_flag = (slug) => {

        const arr = ['fif', 'afc', 'clu', 'con', 'uef']

        if (arr.includes(slug)) {
            return (<div></div>)
        }

        return (
            <img src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/countries/500/${slug}.png&scale=crop&cquality=40&location=origin&w=40&h=40`} alt="Bandera" width={IMG_SIZE_1 * 1} height={IMG_SIZE_1} />
        )
    }
    
    

    return (
        <div
            style={{ left: (data.open_menu ? "0" : "-200px") }}
            className='leagues_menu-container'>


            <h3>Internacional</h3>



            {
                leagues_int.map((league, i) => (
                    <div
                        key={i}
                        onClick={() => {
                            navigate(`/league/${league.slug}`)
                            navigate(0)
                            data.set_open_menu(false)
                        }}
                        className="league"
                    >



                        {get_flag(league.slug.slice(0, 3))}

                        {league.name}
                    </div>
                ))
            }



            <h3>Sudamérica</h3>

            {
                leagues_sa.map((league, i) => (
                    <div
                        key={i}
                        onClick={() => {
                            navigate(`/league/${league.slug}`)
                            navigate(0)
                            data.set_open_menu(false)
                        }}
                        className="league"
                    >



                        {get_flag(league.slug.slice(0, 3))}

                        {league.name}
                    </div>
                ))
            }

            <h3>Europa</h3>

            {
                leagues_europe.map((league, i) => (
                    <div
                        key={i}
                        onClick={() => {
                            navigate(`/league/${league.slug}`)
                            navigate(0)
                            data.set_open_menu(false)
                        }}
                        className="league"
                    >



                        {get_flag(league.slug.slice(0, 3))}

                        {league.name}
                    </div>
                ))
            }



        </div>
    )
}

export default LeaguesMenu