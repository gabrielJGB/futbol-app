import { ConstructionOutlined } from '@mui/icons-material'
import React, { createContext, useEffect, useState } from 'react'
import { fetch_json } from '../utils/fetch_json'
import { format_date } from '../utils/time'
export const DataContext = createContext({
    loading:null,
    set_loading:()=>{},
    leagues:null, 
    set_leagues:()=>{},
    selected_date:null, 
    set_selected_date:()=>{},
    date:null,
    set_date:()=>{}
})

export function DataProvider({ children }) {
    const [loading, set_loading] = useState(true)
    const [leagues, set_leagues] = useState(true)
    const [selected_date, set_selected_date] = useState(false)
    const [date,set_date] = useState(new Date())

    useEffect(() => {
        let num = new Date().getTime()
        // let link = "https://site.api.espn.com/apis/site/v2/sports/soccer/all/scoreboard?region=ar&lang=es&contentorigin&date=" + format_date(date)
        
        let link = "https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=soccer&lang=es&region=ar&dates="+ format_date(date) +"&="+ num
        set_loading(true)
        fetch_json(link)
            .then(resp => set_leagues(resp.sports[0].leagues))
            .finally(() => set_loading(false))
        
    }, [date])

 useEffect(() => {
    console.log(leagues)
 }, [leagues])
 


    const contextValue = {
        loading, set_loading,
        leagues, set_leagues,
        selected_date, set_selected_date,
        date,set_date,



    }

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider


