import { ConstructionOutlined, DatasetLinked } from '@mui/icons-material'
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
    error:null,
    set_error:()=>{},
    showing_leagues:null, 
    set_showing_leagues:()=>{}

})

export function DataProvider({ children }) {
    const [loading, set_loading] = useState(true)
    const [leagues, set_leagues] = useState(true)
    const [selected_date, set_selected_date] = useState(false)
    const [date, set_date] = useState(new Date())
    const [showing_leagues, set_showing_leagues] = useState([])
    const [error,set_error ] = useState(false)
    let interval = null

    const req = { headers: { 'X-Requested-With': 'XMLHttpRequest' }, cache: 'no-store' }
    
    
    
    
    
    const fetch_date_events = () => {
        let num =  "&=" + new Date().getTime()
        let link = "https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=soccer&lang=es&region=ar&dates=" + format_date(date) + num

        fetch_json(link, req)
            .then(resp => {
                // set_leagues_id(resp.sports[0].leagues.map(league=>league.id))
                // set_leagues_info(resp.sports[0].leagues.map(league => ({"name":league.shortName,"id":league.id})))
                set_leagues(resp.sports[0].leagues)
                if(!is_match_in_play((resp.sports[0].leagues)) ){
                    clearInterval(interval)
                }

            })
            .catch(error=>set_error(error))
            .finally(() => set_loading(false))

    }


    /*

        Carga la pagina
        Fetch inmediato con la fecha de hoy
        Seteo intervalo 

        Cambia de fecha
        Limpio intervalo
        Fetch fecha seleccionada
        Verifico si hay partidos en juego
            Si hay, no hago nada
            Si no hay, limpio el intervalo

        *** Setear el link en un state ***
        



    */


    useEffect(() => {
        set_loading(true)
        fetch_date_events()

    }, [date])



    //  ||


    // useEffect(() => {
    //     fetch_date_events()
    // }, [])

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
        showing_leagues, set_showing_leagues
    




    }

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider


