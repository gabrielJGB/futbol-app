import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { fetch_json } from '../../utils/fetch_json'
import MatchHeader from '../../components/MatchHeader/MatchHeader';
import MatchSections from '../../components/MatchSections/MatchSections';
import Spinner from '../../components/Spinner/Spinner';


const useQuery = ()=> {
    return new URLSearchParams(useLocation().search);
}

const Match = () => {
    const [loading, set_loading] = useState(true)
    const [match_data, set_match_data] = useState(false)
    const req = {  cache: 'no-store' }

    let query = useQuery();
    let id = query.get("id");
    useEffect(() => {
        let link = "https://site.web.api.espn.com/apis/site/v2/sports/soccer/all/summary?region=ar&lang=es&contentorigin=deportes&event=" + id

        fetch_json(link,req)
            .then(resp => set_match_data(resp))
            .catch(error => console.log(error))
            .finally(() => set_loading(false))

    }, [])

    if (loading)
        return (<Spinner />)

    return (
        <div className='match_container'>

            <MatchHeader header_info={match_data.header} />
            <MatchSections match_data={match_data} />

        </div>
    )
}

export default Match