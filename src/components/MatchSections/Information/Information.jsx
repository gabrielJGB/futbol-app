import React from 'react'
import MainInfo from './MainInfo'
import Penalties from './Penalties'
import History from './History'
import LastGames from './LastGames'

const Information = ({ info }) => {

  return (
    <div className='info_container'>

      <MainInfo info={info} />
      <Penalties info={info} />
      <History info={info} />
      <LastGames info={info} />

    </div>
  )
}

export default Information