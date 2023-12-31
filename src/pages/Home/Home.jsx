import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import LeagueEvents from '../../components/LeagueEvents/LeagueEvents'
import LeaguesNames from '../../components/LeagueNames/LeaguesNames'
import Navigation from '../../components/Navigation/Navigation'
import Spinner from '../../components/Spinner/Spinner'
import { DataContext } from '../../context/DataContext'

const Home = () => {

  const data = useContext(DataContext)
  


  


  return (
    <div className="home_container">

      {

        data.error ?
          <div>Ha ocurrido un error</div>
          :
          <>
            <Navigation />
            <LeaguesNames />

            {
              data.loading ?
                <Spinner />
                :
                // data.leagues.filter(league=>data.showing_leagues.includes(league.id)).map((league, i) => (
                  // <LeagueEvents key={i} league={league} />
                // ))
                data.leagues.map((league, i) => (
                  <LeagueEvents key={i} league={league} />
                ))
            }
          </>

      }

    </div>
  )
}

export default Home
