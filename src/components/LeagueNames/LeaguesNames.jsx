import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../context/DataContext'

const LeaguesNames = () => {
    const data = useContext(DataContext)





    return (
        <div className='leagues-names_container'>
            {
                !data.loading &&

                data.leagues.map((league, i) => (
                    <div key={i} className={`league-name ${data.selected_id === league.id && "selected"}`}
                        onClick={() => { }}
                    >
                        {league.shortName}
                    </div>
                ))
            }
        </div>
    )
}

export default LeaguesNames