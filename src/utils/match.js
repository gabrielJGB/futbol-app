import {format_time} from '../utils/time'

const get_status = (elem) => {
    let status = elem.type.name

    switch (status) {
        case "STATUS_HALFTIME":
          return "E.T.";
        
        case "STATUS_SCHEDULED":
          return format_time(elem.type.detail);
      
        case "STATUS_FULL_TIME":
          return "Final";
      
        case "STATUS_POSTPONED":
          return "Suspendido";
      
        case "STATUS_SECOND_HALF":
        case "STATUS_FIRST_HALF":
        case "STATUS_OVERTIME":
        case "STATUS_HALFTIME_ET":
          return elem.displayClock;
      
        case "STATUS_CANCELED":
          return "Cancelado";
      
        case "STATUS_FINAL_PEN":
          return "Final (P)";
      
        case "STATUS_FINAL_AET":
          return "Final (Extra)";
      
        case "STATUS_END_OF_EXTRATIME":
          return "Pen.";
      
        default:
          return "";
      }
      

  }



const is_playing = (elem) => {
    let status = elem.type.name
    if (status === "STATUS_FIRST_HALF" || status === "STATUS_SECOND_HALF" || status === "STATUS_HALFTIME" || status === "STATUS_HALFTIME_ET" || status === "STATUS_OVERTIME") {
        return true
    } else {
        return false
    }

}


const match_active = objeto => {

  if (objeto.hasOwnProperty("state") && objeto["state"] === "in") {
      return true;
  }

  for (let propiedad in objeto) {
      if (objeto[propiedad] !== null && typeof objeto[propiedad] === "object") {
          let resultado = match_active(objeto[propiedad], "state");
          if (resultado) {
              return true;
          }
      }
  }

  return false;
}


export{
    get_status,
    is_playing,
    match_active
}



  