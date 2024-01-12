import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../context/DataContext'

const LeaguesNames = () => {
    const data = useContext(DataContext)


    return (
        <div className='leagues-names_container'>
            {
                !data.loading &&

                data.leagues.map((league, i) => (
                    
                    <div
                        key={i}
                        className={`league-name`}
                    >
                        {/* {league.slug.toUpperCase().replaceAll(".","-").replaceAll("_"," ")} */}
                        {league.shortName}
                        {/* {league.slug.split(".")[0].toUpperCase()} */}
                        {/* {league.slug.split(".")[1].replaceAll("_"," ")} */}

                    </div>
                ))
            }
        </div>
    )
}

export default LeaguesNames