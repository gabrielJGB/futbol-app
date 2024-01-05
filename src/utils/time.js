const format_date = (fecha_num) => {
  let fecha = new Date(fecha_num)

 
 
 
  return String(fecha.getFullYear()).padStart(2, "0") + String((fecha.getMonth() + 1)).padStart(2, "0") + String(fecha.getDate()).padStart(2, "0")
}

function convert_to_timestamp(fecha) {
  // Crear un objeto Date a partir de la cadena de fecha
  var fechaObj = new Date(fecha);

  // Obtener el timestamp en milisegundos
  var timestamp = fechaObj.getTime();

  return timestamp;
}

// Uso de la función


function get_time_selected(timestamp) {
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
      return `${dias[fecha.getDay()]} ${fecha.getDate()}`;
  }
}
export {
  format_date,
  get_time_selected,
  convert_to_timestamp
}
