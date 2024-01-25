import React, { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetch_json } from '../utils/fetch_json'
import { match_active } from '../utils/match'
import { format_date, get_time_selected } from '../utils/time'

export const DataContext = createContext({
    loading: null,
    set_loading: () => { },
    leagues: null,
    set_leagues: () => { },
    selected_date: null,
    set_selected_date: () => { },
    date: null,
    set_date: () => { },
    error: null,
    set_error: () => { },
    showing_leagues: null,
    set_showing_leagues: () => { },
    input_checked: null,
    set_input_checked: () => { },
    selected_id: null,
    set_selected_id: () => { },
    show_only_playing: null,
    set_show_only_playing: () => { },
    is_active: null,
    set_is_active: () => { },
    delay_secs:null, 
    set_delay_secs:()=>{}


})

export function DataProvider({ children }) {
    const [loading, set_loading] = useState(true)
    const [leagues, set_leagues] = useState(false)
    const [selected_date, set_selected_date] = useState(false)
    const [date, set_date] = useState(new Date())
    const [showing_leagues, set_showing_leagues] = useState([])
    const [error, set_error] = useState(false)
    const [input_checked, set_input_checked] = useState(true)
    const [selected_id, set_selected_id] = useState(0)
    const [show_only_playing, set_show_only_playing] = useState(false)
    const [is_active, set_is_active] = useState(true)
    const req = { cache: 'no-store' }
    const [delay_secs, set_delay_secs] = useState(50)
    
    

    //1ElSalvador,1CostaRica, LigaExpMX, UEFAFem, Mineiro, Gaucho, Paulista, Carioca, 2España, 1Guatemala, 2Alemania,CopaHolanda, SerieBITalia, 1Turquia, 2Inglaterra, 1Grecia, 2Francia, CopaAlemania, 1Honduras, WomenFAC, 2Brasil, UEFAFem, 2Colombia, CopaColombia, EspCopaReina, CopaFra,

    const leagues_id = ['3943','4005','3932','19483','10872','2272','8207','2265','3921','3928','3927','3957','3931','3946','3914','3955','3926','3954','3929','20226','4007','19483','3910','8313','20381','3952']
    // const leagues_id = []


    const fetch_date_events = () => {

        let link = `https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=soccer&lang=es&region=ar&dates=${format_date(date)}&=${new Date().getTime()}`

        fetch_json(link, req)
            .then(resp => {
                set_leagues(resp.sports[0].leagues.filter(league_ => !leagues_id.includes(league_.id)))
                set_is_active(match_active(resp.sports[0].leagues.filter(league_ => !leagues_id.includes(league_.id))))
                
            })
            .catch(error => set_error(error))
            .finally(() => set_loading(false))
    }

    useEffect(() => {
        set_loading(true)
        set_is_active(true)
        fetch_date_events()
        // fetch_date_events()

    }, [date])





    useEffect(() => {
        let interval;

        if (is_active) {
            fetch_date_events()
            interval = setInterval(fetch_date_events, delay_secs * 1000)
        }

        return () => { if (interval) clearInterval(interval) };
    }, [is_active]);




    const contextValue = {
        loading, set_loading,
        leagues, set_leagues,
        selected_date, set_selected_date,
        date, set_date,
        error,
        showing_leagues, set_showing_leagues,
        input_checked, set_input_checked,
        selected_id, set_selected_id,
        show_only_playing, set_show_only_playing,
        is_active, set_is_active,
        delay_secs, set_delay_secs

    }

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider


