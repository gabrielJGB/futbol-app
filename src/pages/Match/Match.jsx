import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { fetch_json } from '../../utils/fetch_json'
import red_card from '../../assets/red.png'
import goal from '../../assets/goal.png'
import penalty from '../../assets/penal.png'
import escudo from '../../assets/escudo.png'


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

    const get_escudo = (elem) => {
        if ("logos" in elem && elem.logos[0].href != "") {
            return <img src={elem.logos[0].href} alt="Escudo" width={IMG_SIZE_1} height={IMG_SIZE_1} />
        }
        return <img src={escudo} alt="Escudo" width={IMG_SIZE_1} height={IMG_SIZE_1} />

    }


    useEffect(() => {
        let link = "https://site.web.api.espn.com/apis/site/v2/sports/soccer/all/summary?region=ar&lang=es&contentorigin=deportes&event=" + id


        fetch_json(link)
            .then(resp => {
                set_header_info(resp.header)

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


            <div className="header">
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




<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio repellendus repudiandae harum quidem nulla sit. Fugit voluptatibus deserunt laudantium dolor similique, sint dolore ipsa facere magnam nulla? Iure, omnis blanditiis.
Perferendis recusandae odit fugiat velit vel veritatis, et, cupiditate numquam distinctio praesentium asperiores in minus doloribus soluta atque culpa possimus quibusdam! Error ex iste vero officia ea quas debitis illum.
Maxime at consequatur voluptatibus reiciendis quaerat suscipit sint aut neque aperiam dicta! Nisi asperiores accusamus fugiat natus laborum, fugit voluptas maiores doloribus numquam consectetur dolorem temporibus laudantium suscipit beatae accusantium.
Natus praesentium distinctio doloremque officiis? Iste assumenda non blanditiis quidem veniam nesciunt, soluta voluptate esse dicta ducimus itaque odio, maxime incidunt libero voluptatum, adipisci facere similique nostrum et architecto. Nobis.
Sit totam recusandae quas vitae reiciendis quidem aperiam repellat explicabo ipsam animi illo est sunt quis deleniti ex, voluptate nemo temporibus eius iusto tenetur commodi illum accusantium culpa consectetur. Iure.
Officia, numquam temporibus inventore aut beatae debitis iusto exercitationem ea accusantium neque in repellat, ut quasi ipsum, esse pariatur quae excepturi impedit ullam nemo magni amet unde. Dolores, quasi eaque?
Earum saepe ut veritatis impedit praesentium harum nobis vel blanditiis, adipisci, soluta minus totam, commodi natus ipsum voluptatibus! Id doloremque illo ut cupiditate, natus illum! Recusandae voluptas eum est nam!
Laborum voluptatem velit quos eos eveniet temporibus nulla amet, earum aliquid repellat architecto cumque, animi inventore doloremque fugit iste quae? Ab architecto iure earum eveniet est vitae veniam! Amet, sed.
Commodi facilis quasi recusandae rerum cumque, eum autem! Natus minima corporis delectus amet veniam, nulla officia. Quibusdam voluptates a accusantium natus totam culpa impedit nihil facere! Praesentium natus iure laborum.
Aspernatur itaque deserunt debitis rerum adipisci. Repellendus, reprehenderit adipisci. Sed, ex veniam porro neque aut sit quidem in, dolores, dolorum quia inventore aspernatur hic unde quo eveniet. Tempora, maiores! Voluptatem.
Pariatur eos ipsa impedit, alias maxime, magni at quisquam rerum rem sed corporis vitae, itaque voluptas quibusdam perferendis maiores sunt. Nobis temporibus exercitationem iusto suscipit eveniet magnam veniam quibusdam modi.
Quidem blanditiis nostrum tempora sapiente, voluptatum nihil quos atque voluptatem numquam eos praesentium tenetur quia, deleniti vel? Error rerum facere non sed deserunt, voluptatibus officiis asperiores! Quasi cupiditate animi accusamus.
Neque, magnam aut. Magnam facilis officia officiis, nostrum quam expedita reiciendis porro, voluptatum, consectetur cum quaerat mollitia. Culpa dolorem, eveniet ipsa illo vitae, repellendus ex quisquam omnis cum nulla voluptatem!
Obcaecati tempore provident debitis cumque praesentium quam error ipsam rerum vitae reiciendis dolores, commodi nulla sed fugit maxime est accusamus blanditiis neque ipsum, corrupti dolor eum nobis. Non, ex facilis.
Omnis, fugit eveniet neque tempore magnam ad harum molestiae vero suscipit repellendus, nisi in adipisci numquam tenetur deserunt voluptate saepe accusamus quaerat quasi voluptates corrupti quas sint laudantium iure! Officia!
Repudiandae dolores explicabo sint molestiae illo quod perferendis voluptatibus aspernatur eveniet! Velit nobis cupiditate ad nam, accusamus minus? Nobis delectus accusantium aspernatur deleniti, nisi facere dicta vero quasi aliquid ipsa?
Consequatur sint ducimus veniam eum tempore sed iusto ut ipsa. Natus, adipisci accusamus consequatur quas voluptatem voluptate. Quas enim quam quaerat quo modi ab recusandae vel, perspiciatis atque exercitationem officiis.
Suscipit deleniti quas quod illo voluptates vel hic natus. Recusandae tempore dolor deleniti assumenda suscipit saepe quis, modi qui, eum minus fugit ipsa? Nihil sunt error commodi alias et pariatur.
Repellat eligendi, magni praesentium dicta illum, excepturi ad aperiam saepe et laborum, nam voluptas nihil itaque nemo pariatur. Pariatur provident nemo quia impedit earum, sint maiores minus sunt animi illum!
Accusantium ducimus impedit velit veritatis veniam est modi, molestiae quaerat quidem, officiis fugiat sunt, repellendus dolorem consectetur eos sapiente soluta quis itaque dolore? Accusamus maxime ea suscipit praesentium. Magni, voluptatem?</p>

        </div>
    )
}

export default Match