import React, { createContext, useEffect, useState } from 'react'
import { fetch_json } from '../utils/fetch_json'
import { format_date } from '../utils/time'
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
    show_only_playing:null, 
    set_show_only_playing:()=>{}

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

    const req = { cache: 'no-store' }

    const fetch_date_events = () => {

        let link = `https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=soccer&lang=es&region=ar&dates=${format_date(date)}&=${new Date().getTime()}`

        fetch_json(link, req)
            .then(resp => {
                set_leagues(resp.sports[0].leagues)
                console.log(is_match_in_play(resp))
                
                

            })
            .catch(error => set_error(error))
            .finally(() => set_loading(false))

    }


    useEffect(() => {
        set_loading(true)
        fetch_date_events()
        console.log(leagues)

    }, [date])


    useEffect(() => {



        // fetch_date_events()
        // interval = setInterval(() => {
        //     fetch_date_events()
        // }, 10000);


    }, [])




    // useEffect(() => {
    //     if(interval != null)
    //         clearInterval(interval)


    // }, [date])


    const is_match_in_play = objeto => {

        if (objeto.hasOwnProperty("state") && objeto["state"] === "in") {
            return true;
        }

        for (let propiedad in objeto) {
            if (objeto[propiedad] !== null && typeof objeto[propiedad] === "object") {
                let resultado = is_match_in_play(objeto[propiedad], "state");
                if (resultado) {
                    return true;
                }
            }
        }

        return false;
    }






    const contextValue = {
        loading, set_loading,
        leagues, set_leagues,
        selected_date, set_selected_date,
        date, set_date,
        error,
        showing_leagues, set_showing_leagues,
        input_checked, set_input_checked,
        selected_id, set_selected_id,
        show_only_playing, set_show_only_playing
    }

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider


