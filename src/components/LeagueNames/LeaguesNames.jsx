import React, { useContext } from 'react'
import { DataContext } from '../../context/DataContext'

const LeaguesNames = () => {

    const data = useContext(DataContext)
    return (
        <div className='leagues-names_container'>
            {
                !data.loading &&
                    data.leagues_names.map((league_name, i) => (
                        <div className="league-name" key={i}>{league_name}</div>
                    ))
            }
        </div>
    )
}

export default LeaguesNames