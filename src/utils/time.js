const format_date = (fecha_num) => {
  let fecha = new Date(fecha_num)
  return String(fecha.getFullYear()).padStart(2, "0") + String((fecha.getMonth() + 1)).padStart(2, "0") + String(fecha.getDate()).padStart(2, "0")
}


const convertTimestampToDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}


const convert_to_timestamp = (fecha) => {
  var fechaObj = new Date(fecha);
  var timestamp = fechaObj.getTime();

  return timestamp + 1000 * 60 * 60 * 4;
}


const get_time_selected = (timestamp) => {

  if (timestamp != "") {
    const fecha = new Date(timestamp);
    const hoy = new Date();
    const ayer = new Date(hoy);
    ayer.setDate(hoy.getDate() - 1);
    const mañana = new Date(hoy);
    mañana.setDate(hoy.getDate() + 1);


    const formatearParaComparacion = (fecha) => fecha.toISOString().split('T')[0];


    if (formatearParaComparacion(fecha) === formatearParaComparacion(hoy)) {
      return 'Hoy';
    } else if (formatearParaComparacion(fecha) === formatearParaComparacion(ayer)) {
      return 'Ayer';
    } else if (formatearParaComparacion(fecha) === formatearParaComparacion(mañana)) {
      return 'Mañana';
    } else {

      const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

      return `${dias[fecha.getDay()].slice(0, 3)} ${fecha.getDate()}/${String(fecha.getMonth() + 1).padStart("2", "0")}/${String(fecha.getFullYear()).slice(2)}`;
    }
  }
}


const format_time = (detail) => {

  if (detail === "Por def.") {
    return detail
  } else if (detail.includes("P.A.")) {
    return "Agendado"
  }

  let arr = detail.match(/at (\d+)\:(\d+) (\w\w)/)
  let hora = Number(arr[1])
  let minutos = Number(arr[2])
  let is_pm = arr[3] === "PM"


  let t = new Date()
  t.setHours(hora + (is_pm && hora != 12 ? 14 : 2))
  t.setMinutes(minutos)

  return (String(t.getHours()).padStart(2, "0") + ":" + String(t.getMinutes()).padStart(2, "0"))
}


const format_main_date = (date) => {
  let a = date.split("T")[0]
  let b = a.split("-")

  const month_arr = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  let day = b[2]
  let month = month_arr[parseInt(b[1]) - 1]
  let year = b[0]

  return `${parseInt(day)} de ${month} de ${year}`

}

const format_game_date = (date) => {

  let a = date.split("T")[0]
  let b = a.split("-")

  return `${b[2]}/${b[1]}/${b[0].slice(2)}`
}


export {
  format_date,
  get_time_selected,
  convert_to_timestamp,
  convertTimestampToDate,
  format_time,
  format_main_date,
  format_game_date
}
