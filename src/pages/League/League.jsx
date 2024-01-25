
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner'
import Table from '../../components/Table/Table'

const League = () => {
  const { league_code } = useParams()
  const [loading, set_loading] = useState(true)
  const [tables, set_tables] = useState([])


  const get_tables = (parsed) => {
    console.log(parsed)
    parsed.children.forEach(child => child.standings.entries.sort((a, b) => a.stats[10].value - b.stats[10].value))
    return parsed
  }

  const fetch_season = () => {

    let date = new Date().getTime()
    let link = `https://site.web.api.espn.com/apis/v2/sports/soccer/${league_code}/standings?lang=es&region=ar?${date}`

    fetch(link)
      .then(resp => resp.json())
      .then(parsed => get_tables(parsed))
      .then(tables => set_tables(tables))
      .catch(error => console.log(error))
      .finally(() => set_loading(false))

  }


  useEffect(() => {
    fetch_season()

  }, [])




  if (loading)
    return <Spinner />

  return (
    <div className='league_container'>

      <div className="header">
        <h2>{tables.name?.replace("Argentine", "")}</h2>
      </div>

      <div className="content">

        <div 
        
        className={`tables ${"children" in tables && tables.children.length === 1? "container":""}` }>
          {
            tables.children?.map((elem, i) => (
              <Table key={i} table={elem} />
            ))
          }
        </div>


        <div className="events">
          <button>clclcl</button>
        </div>

      </div>
    </div>
  )
}

export default League