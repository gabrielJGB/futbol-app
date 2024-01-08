import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { fetch_json } from '../../utils/fetch_json'

import MatchHeader from '../../components/MatchHeader/MatchHeader';
import MatchNavigation from '../../components/MatchNavigation/MatchNavigation';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Match = () => {
    const [loading, set_loading] = useState(true)
    const [header_info, set_header_info] = useState(false)
    let query = useQuery();
    let id = query.get("id");







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

            <MatchHeader header_info={header_info}/>
            <MatchNavigation />

            
            

        </div>
    )
}

export default Match