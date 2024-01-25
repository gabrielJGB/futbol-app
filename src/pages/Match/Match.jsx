import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetch_json } from '../../utils/fetch_json'
import MatchHeader from '../../components/MatchHeader/MatchHeader';
import MatchSections from '../../components/MatchSections/MatchSections';
import Spinner from '../../components/Spinner/Spinner';
import { DataContext } from '../../context/DataContext';


const Match = () => {

    const [loading, set_loading] = useState(true)
    const [match_data, set_match_data] = useState(false)
    const [playing, set_playing] = useState(false)
    const data = useContext(DataContext)
    const req = { cache: 'no-store' }
    
    let query = useParams();
    

    const fetch_match = () => {
        
        let id = query.id
        let link  = `https://site.web.api.espn.com/apis/site/v2/sports/soccer/all/summary?region=ar&lang=es&contentorigin=deportes&event=${id}&=${new Date().getTime()}`


        fetch_json(link, req)
            .then(resp => {
                set_match_data(resp)
                set_playing(resp.header.competitions[0].status.type.state === 'in')
            })
            .catch(error => console.log(error))
            .finally(() => set_loading(false))
    }

    useEffect(() => {
        fetch_match()
        fetch_match()
    }, [])


    useEffect(() => {
        let interval;

        if (playing) {
            interval = setInterval(fetch_match, data.delay_secs * 1000)
        }

        return () => { if (interval) clearInterval(interval) };
    }, [playing]);


    if (loading)
        return <Spinner />

    return (
        <div className='match_container'>
            <MatchHeader header_info={match_data.header} />
            <MatchSections match_data={match_data} />
        </div>
    )
}

export default Match