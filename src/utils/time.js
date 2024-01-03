const format_date = (fecha_num) => {
  let fecha = new Date(fecha_num)

  return String(fecha.getFullYear()).padStart(2, "0") + String((fecha.getMonth() + 1)).padStart(2, "0") + String(fecha.getDate()).padStart(2, "0")
}

function get_time_selected(timestamp) {
  const fecha = new Date(timestamp);
  const hoy = new Date();
  const ayer = new Date(hoy);
  ayer.setDate(hoy.getDate() - 1);
  const mañana = new Date(hoy);
  mañana.setDate(hoy.getDate() + 1);

  // Formatea la fecha para ser comparada sin tiempo
  const formatearParaComparacion = (fecha) => fecha.toISOString().split('T')[0];

  // Compara las fechas
  if (formatearParaComparacion(fecha) === formatearParaComparacion(hoy)) {
      return 'Hoy';
  } else if (formatearParaComparacion(fecha) === formatearParaComparacion(ayer)) {
      return 'Ayer';
  } else if (formatearParaComparacion(fecha) === formatearParaComparacion(mañana)) {
      return 'Mañana';
  } else {
      // Formatea la fecha en el estilo "Día de la semana, Número"
      const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      return `${dias[fecha.getDay()]} ${fecha.getDate()}`;
  }
}
export {
  format_date,
  get_time_selected
}
