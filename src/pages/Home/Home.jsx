/*

Estructura Home

-Flechas
  -Flecha <
  -Dia
  -Flecha >

-Ligas hoy
  -NombreLiga (con un switch)

-Tarjetas Liga
  -Tarjeta evento
    -EquipoLocal
    -Resultado
    -EquipoVisitante


*/

import React, { useEffect } from 'react'
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
      
      <Navigation />

      

      {/* <LeaguesNames /> */}
      

      {
        !data.loading?
        data.leagues.map((league,i)=>(
          <LeagueEvents key={i} league={league}/>
        ))
        :
        <Spinner />
      }


{/*      
      {
        data.events.map((event)=>(
          <LeagueEvents data={event}/>

        ))
      } */}


    </div>
  )
}

export default Home
