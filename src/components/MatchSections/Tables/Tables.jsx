import React, { useEffect, useState } from 'react'
import { escudo } from '../../../assets'

const Tables = ({ info }) => {

  const [tables, set_tables] = useState(info.standings.groups)
  const [ids, set_ids] = useState([info.boxscore.teams[0].team.id, info.boxscore.teams[1].team.id])
  const IMG_SIZE = 20



  return (

    <div className="tables_container_">


      {

        tables.map((table, j) => (
          <div key={j}>
            <h3 className='title'>{table.header}</h3>
            <table key={j}>
              <tbody>
                <tr>
                  <th>#</th>
                  <th>Equipo</th>
                  <th>Pts</th>
                  <th>PJ</th>
                  <th>PG</th>
                  <th>PE</th>
                  <th>PP</th>
                  <th>Dif</th>
                </tr>


                {
                  table.standings.entries.map((team, i) => (
                    <tr
                      className={`table-row ${ids.includes(team.id) && "highlight"}`}
                      key={i}
                    >
                      <td className='bold'>{team.stats[6].displayValue}</td>
                      <td className='team'>
                        <img src={"logo" in team ? team.logo[0]?.href : escudo} alt={"Escudo " + team.team} width={IMG_SIZE} height={IMG_SIZE} />
                        <span>{team.team}</span>
                      </td>
                      <td className='bold'>{team.stats[3].displayValue}</td>
                      <td>{team.stats[0].displayValue}</td>
                      <td>{team.stats[5].displayValue}</td>
                      <td>{team.stats[4].displayValue}</td>
                      <td>{team.stats[1].displayValue}</td>
                      <td>{team.stats[2].displayValue}</td>
                    </tr>
                  ))
                }

              </tbody>

            </table>
          </div>
        ))

      }



      {/* <table>
        <tbody>
          <tr>
            <th>#</th>
            <th>Equipo</th>
            <th>Pts</th>
            <th>PJ</th>
            <th>PG</th>
            <th>PE</th>
            <th>PP</th>

            <th>Dif</th>
          </tr>


          {
            tables.map((team, i) => (
              <tr 
                className={`table-row ${ids.includes(team.id) && "highlight"}`} 
                key={i}
              >
                <td className='bold'>{team.stats[6].displayValue}</td>
                <td className='team'>
                  <img src={"logo" in team ? team.logo[0]?.href : escudo} alt={"Escudo " + team.team} width={IMG_SIZE} height={IMG_SIZE} />
                  <span>{team.team}</span>
                </td>
                <td className='bold'>{team.stats[3].displayValue}</td>
                <td>{team.stats[0].displayValue}</td>
                <td>{team.stats[5].displayValue}</td>
                <td>{team.stats[4].displayValue}</td>
                <td>{team.stats[1].displayValue}</td>

                <td>{team.stats[2].displayValue}</td>
              </tr>
            ))
          }

        </tbody>

      </table> */}
    </div>

  )
}

export default Tables