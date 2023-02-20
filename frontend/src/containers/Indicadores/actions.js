// API
//import libraryApi from './api';
import Inquiries from '../../lib/Inquiries';

// Actions
const CajaOnchangeIndicadores = 'CajaOnchangeIndicadores';
const ButtonStadeIndicadores = 'ButtonStadeIndicadores';
const MetaDataIndicadores = "MetaDataIndicadores";
const LimpiarIndicadores = "LimpiarIndicadores"
const searchIndicadores = "searchIndicadores"
const SelectOnchangeIndicadores = "SelectOnchangeIndicadores"
const msgIndicadores  = "MensajeIndicadores";
const ListarTablaIndicadores = "ListarTablaIndicadores"
const fecha = 'fehcaOnchage';
 
export function  Fechaschange(e){
  return {
    type: fecha,
    payload: e
  };
}

export function Cajachange(e) {
  return {
    type: CajaOnchangeIndicadores,
    eve: e
  };
}
export function SetMensaje(msg){
  return {
    type: msgIndicadores,
    payload: msg
  }
}


export function Buttonclick(e) {
  return {
        type: ButtonStadeIndicadores,
        eve: e
  };
}

export function Limpiar(tabla=false) {
    return {
        type: LimpiarIndicadores,
        payload: tabla
    };
  }

  export function search(Busqueda=null,) {
    return {
        type: searchIndicadores,
        payload: Inquiries.Query(null,"Indicadores/"+Busqueda,"get")
    };
  }
  
  export function SelectOnchange(e) {
    return {
        type: SelectOnchangeIndicadores,
        payload: e
    };
  }

  export function ListarTabla(Busqueda=null) {
      return {
        type: ListarTablaIndicadores,
        payload: Inquiries.Query(null,"Indicadores/"+Busqueda,"get"),

    };
  }

  export function SetMeta() {
    return {
      type: MetaDataIndicadores,
      payload: Inquiries.Query(null,"IndicadoresMeta","get" ),

  };
}
  
  
