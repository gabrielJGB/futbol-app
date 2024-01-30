import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import Config from '../../components/Config/Config'
import Error from '../../components/Error/Error'
import LeagueEvents from '../../components/LeagueEvents/LeagueEvents'
import Navigation from '../../components/Navigation/Navigation'
import Spinner from '../../components/Spinner/Spinner'

import LeaguesMenu from '../../components/LeaguesMenu/LeaguesMenu'

import { DataContext } from '../../context/DataContext'

const Home = () => {
  const data = useContext(DataContext)


  if (data.error)
    return <Error />

  return (
    <div className="home_container">

      <Navigation />
      <Config />


      {data.loading && <Spinner />}

      {
        !data.loading && !data.error &&
        data.leagues.map((league, i) => (
          <LeagueEvents key={i} league={league} />
        ))
      }

      <LeaguesMenu />

    </div>
  )
}

export default Home
