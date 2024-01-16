import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../context/DataContext'

const LeaguesNames = () => {
    const data = useContext(DataContext)
    const [selected, set_selected] = useState(false)
    
    
    const LeagueName = ({league})=>{
        const [selected, set_selected] = useState(false)
        return (
            <div className={`league-name `}
                 onClick={()=>set_selected(prev=>!prev)}
        >
            {league.shortName}
        </div>
        )
    }

    return (
        <div className='leagues-names_container'>
            {
                !data.loading &&

                data.leagues.map((league, i) => (
                   <LeagueName key={i} league={league}/>
                ))
            }
        </div>
    )
}

export default LeaguesNames