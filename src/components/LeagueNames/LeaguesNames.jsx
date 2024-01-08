import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../context/DataContext'

const LeaguesNames = () => {
    const data = useContext(DataContext)

    const League = ({ league }) => {

        return (
            <div
                className={`league-name`}
            >
                {league.name}

            </div>
        )
    }

    return (
        <div className='leagues-names_container'>
            {
                !data.loading &&

                data.leagues.map((league, i) => (
                    // <div>{league.id}</div>
                    <League key={i} league={league} />
                ))
            }
        </div>
    )
}

export default LeaguesNames