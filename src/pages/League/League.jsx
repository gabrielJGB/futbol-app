
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Event from '../../components/Event/Event'
import Spinner from '../../components/Spinner/Spinner'
import Table from '../../components/Table/Table'
import { get_time_selected, format_main_date, format_time } from '../../utils/time'

const League = () => {
  const { league_code } = useParams()
  const [events, set_events] = useState(false)
  const [loading, set_loading] = useState(true)
  const [tables, set_tables] = useState([])
  const [calendar, set_calendar] = useState(false)
  const [date, set_date] = useState(false)
  const [index, set_index] = useState(0)




  const get_tables = (parsed) => {

    parsed.children.forEach(child => child.standings.entries.sort((a, b) => a.stats[10].value - b.stats[10].value))
    return parsed
  }

  // function _format_date(fechaStr) {

  //   let año = fechaStr.substring(0, 4);
  //   let mes = fechaStr.substring(4, 6);
  //   let día = fechaStr.substring(6, 8);

  //   // Construye y devuelve la nueva cadena de fecha
  //   return `${año}-${mes}-${día}`;
  // }



  const fetch_tables = () => {

    let num = new Date().getTime()
    let link = `https://site.web.api.espn.com/apis/v2/sports/soccer/${league_code}/standings?lang=es&region=ar?${num}`

    fetch(link)
      .then(resp => resp.json())
      .then(parsed => get_tables(parsed))
      .then(tables => set_tables(tables))
      .catch(error => console.log(error))
    // .finally(() => set_loading(false))

  }


  const fetch_calendar = () => {

    let link = `https://site.web.api.espn.com/apis/site/v2/sports/soccer/scorepanel?league=${league_code}&region=ar&lang=es&contentorigin=deportes&limit=250`

    fetch(link)
      .then(resp => resp.json())
      .then(parsed => {
        console.log(parsed)
        set_calendar(parsed.scores[0].leagues[0].calendar.map(c => (c.split("T")[0].replaceAll("-", ""))))
      })
      .then(() => set_date(calendar[index]))
      .catch(error => console.log(error))
      .finally(() => set_loading(false))


  }


  const fetch_events = () => {
    // let link = `https://site.web.api.espn.com/apis/v2/sports/soccer/${league_code}/standings?lang=es&region=ar?${date}`
    let link = `https://site.web.api.espn.com/apis/site/v2/sports/soccer/scorepanel?league=${league_code}&region=ar&lang=es&contentorigin=deportes&limit=250&dates=${get_dates(new Date())}`

    fetch(link)
      .then(resp => resp.json())
      .then(parsed => {
        set_events(parsed)
        console.log(parsed)
      })
      .catch(error => console.log(error))
      .finally(() => set_loading(false))

  }


  const get_dates = (date) => {

    const pad = (number) => (number < 10 ? `0${number}` : number);


    const twoDaysBefore = new Date(date);
    twoDaysBefore.setDate(date.getDate() - 2);

    const eightDaysAfter = new Date(date);
    eightDaysAfter.setDate(date.getDate() + 28);


    const format = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;


    return `${format(twoDaysBefore)}-${format(eightDaysAfter)}`;
  };




  useEffect(() => {
    fetch_tables()
    fetch_events()

  }, [])

  

  const translate_slug = (slug) => {

    
    switch (slug) {
      case "group-stage":
        return "FASE DE GRUPOS"
      case "semifinals":
        return "Semifinales"
      default:
          return "Calendario"
    }


  }

  let last_date = ''

  const get_match_date = (date_string) => {

    let formated_date = _format_date(date_string)
    

    if(last_date != formated_date.date){
      last_date = formated_date.date
      return  <h3 className="date">{`${formated_date.day_of_week} ${formated_date.day} de ${formated_date.month}`}</h3>
    }



    // console.log(last_date,formated_date.date)

    // if(last_date != formated_date.date)
    //   last_date = formated_date.date
    // else
    //   return (<h3 className="date">{formated_date.date}</h3>)

  }

  const _format_date = (date_string) => {

    

    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let x = date_string.replace("Z", "")

    let date = x.split("T")[0]
    let time = x.split("T")[1]

    let day = date.split("-")[2]
    let month = date.split("-")[1]
    let year = date.split("-")[0]

    let hours = time.split(":")[0]
    let minutes = time.split(":")[1]

    let new_date = new Date()

    new_date.setYear(year)
    new_date.setMonth(month -1)
    new_date.setDate(day)
    new_date.setHours(hours)
    new_date.setMinutes(minutes)

    new_date.setHours(new_date.getHours() - 3)



    let obj ={
      "date": `${new_date.getDate()}/${new_date.getMonth() }`,
      "day_of_week": days[new_date.getDay()],
      "month":months[new_date.getMonth()],
      "day": new_date.getDate(),
      "hours": new_date.getHours(),
      "minutes": new_date.getMinutes()
    }

    return obj

  }



  if (loading)
    return <Spinner />

  return (
    <div className='league_container'>

      <div className="header">
        <h2>{events.scores[0].leagues[0].name?.replace("Argentine", "")}</h2>
        {/* <h4>{events.scores[0].season.slug.replaceAll("-"," ").toUpperCase()}</h4> */}
      </div>

      <div className="content">



        {"children" in tables && tables.children.length != 0 &&



          <div
            className={`tables ${"children" in tables && tables.children.length === 1 ? "container" : ""}`}>
            {
              tables.children?.map((elem, i) => (
                <Table key={i} table={elem} />
              ))
            }
          </div>
        }



        <div className="events">
          {
            events &&
            <div className="events-header">
              {/* <button onClick={() => { set_index(prev => prev - 1) }}>{"<"}</button>
                <div>{format_main_date(_format_date(date))}</div>
                <button onClick={() => { set_index(prev => prev + 1) }}>{">"}</button> */}

              <div></div>
              <h3> {translate_slug(events.scores[0].season.slug)}</h3>
              <div></div>

            </div>
          }

          {
            events &&
            events.scores[0].events.map((elem, i) => (
              <>
                {
                  get_match_date(elem.date)
                }
                <Event
                  match={elem}
                  key={i} />
              </>
            ))
          }


        </div>




      </div>
    </div>
  )
}

export default League