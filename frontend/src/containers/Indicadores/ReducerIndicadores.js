
const CajaOnchangeIndicadores = 'CajaOnchangeIndicadores';
const ButtonStadeIndicadores = 'ButtonStadeIndicadores';
const MetaDataIndicadores = "MetaDataIndicadores_SUCCESS";
const LimpiarIndicadores = "LimpiarIndicadores"
const searchIndicadores = "searchIndicadores_SUCCESS"
const SelectOnchangeIndicadores = "SelectOnchangeIndicadores"
const ListarTablaIndicadores = "ListarTablaIndicadores_SUCCESS"
const msgIndicadores  = "MensajeIndicadores";

import { assignment } from '../../lib/utils/UTF8';
const fehcaOnchage = 'fehcaOnchage';
export default function FormIndicadores(state = {}, action) {
let fechas ="";
 let  Commands = [
   {
      id: "Incluir",
      name: "Incluir",
      disabled: false
  },
  {
      id: "Listar",
      name: "Listar",
      disabled: false
  },
  {
      id: "Limpiar",
      name: "Limpiar",
      disabled: false
  },
  {
      id: "Modificar",
      name: "Modificar",
      disabled: true
  },
  {
      id: "Eliminar",
      name: "Eliminar",
      disabled: true
  }
]
let General = {"table" : false, "Name": "Indicadores", "Datos":null,};
let Mensaje = null;
 let Campos = "s0|1|2|3|4|5|6|7";
 let formIndicadores =   { CajasDeTexto:null , Commands, Select:null, General,Cajaini:null,Selectini:null,Delimitador:null,Separador:null,Cod:null, Total:0,Campos,Mensaje, fechas}

 switch (action.type) {
    case fehcaOnchage:
        formIndicadores =JSON.parse(JSON.stringify(state.formIndicadores));
        console.log(action.payload)
        formIndicadores.fechas = action.payload.target.value.trim();
        return  Object.assign({}, state, { formIndicadores });
    case MetaDataIndicadores:
       
         formIndicadores =JSON.parse(JSON.stringify(state.formIndicadores));
         formIndicadores.CajasDeTexto="Cargando";
         formIndicadores.Select= JSON.parse(JSON.stringify(action.payload["Select"]))
         formIndicadores.Selectini=JSON.parse(JSON.stringify(action.payload["Select"]))
         formIndicadores.Delimitador=JSON.parse(JSON.stringify(action.payload["Delimitador"]))
         formIndicadores.Separador=JSON.parse(JSON.stringify(action.payload["Separador"]))
         formIndicadores.Total = action.payload["Total"];
         formIndicadores.Permisos = action.payload["Permiso"];
         delete  action.payload["Permiso"];
         delete  action.payload["Total"];
         delete  action.payload["Select"];
         delete  action.payload["Delimitador"];
         delete  action.payload["Separador"];
    
         formIndicadores.CajasDeTexto= action.payload;
         formIndicadores.Cajaini=action.payload
         return Object.assign({}, state, { formIndicadores });
    case CajaOnchangeIndicadores:

        formIndicadores =JSON.parse(JSON.stringify(state.formIndicadores));
        formIndicadores.CajasDeTexto[action.eve.target.name].value= action.eve.target.value.trim();
        formIndicadores.CajasDeTexto[action.eve.target.name].modified= true;
        return  Object.assign({}, state, { formIndicadores });
    case LimpiarIndicadores:
        formIndicadores.Total=state.formIndicadores.Total
        formIndicadores.Permisos = state.formIndicadores.Permisos;
        formIndicadores.CajasDeTexto=JSON.parse(JSON.stringify(state.formIndicadores.Cajaini))
        formIndicadores.Select= JSON.parse(JSON.stringify(state.formIndicadores.Selectini))
        formIndicadores.Cajaini=JSON.parse(JSON.stringify(state.formIndicadores.Cajaini))
        formIndicadores.Selectini= JSON.parse(JSON.stringify(state.formIndicadores.Selectini))
        formIndicadores.Delimitador=JSON.parse(JSON.stringify(state.formIndicadores.Delimitador))
        formIndicadores.Separador=JSON.parse(JSON.stringify(state.formIndicadores.Separador))
        formIndicadores.General.Cant = state.formIndicadores.General.Cant;
        formIndicadores.General.table=action.payload;
        return Object.assign({}, state, { formIndicadores });
    case searchIndicadores:
        formIndicadores =JSON.parse(JSON.stringify(state.formIndicadores));
         
       
        if(action.payload.length >0){
             formIndicadores.Cod = action.payload[0]['id'];
            formIndicadores = assignment( formIndicadores,action.payload[0]);
        }
         return Object.assign({}, state, { formIndicadores });
    case ListarTablaIndicadores:
        formIndicadores.Total=state.formIndicadores.Total
        formIndicadores.fechas = state.formIndicadores.fechas
        formIndicadores.Permisos = state.formIndicadores.Permisos;
        formIndicadores.CajasDeTexto=JSON.parse(JSON.stringify(state.formIndicadores.Cajaini))
        formIndicadores.Select= JSON.parse(JSON.stringify(state.formIndicadores.Selectini))
        formIndicadores.Cajaini=JSON.parse(JSON.stringify(state.formIndicadores.Cajaini))
        formIndicadores.Selectini= JSON.parse(JSON.stringify(state.formIndicadores.Selectini))
        formIndicadores.Delimitador=JSON.parse(JSON.stringify(state.formIndicadores.Delimitador))
        formIndicadores.Separador=JSON.parse(JSON.stringify(state.formIndicadores.Separador))
        formIndicadores.Commands[1].disabled=true;
        if(action.payload.Cant!== undefined){

            formIndicadores.General.Datos=action.payload.Registros;
            formIndicadores.General.Cant=action.payload.Cant;
        }else{
            formIndicadores.General.Cant = state.formIndicadores.General.Cant;
            formIndicadores.General.Datos=action.payload;
        }
        
        formIndicadores.General.table=true;
             
        return Object.assign({}, state, { formIndicadores });
    case ButtonStadeIndicadores:
            action.eve.preventDefault();
            alert(action.eve.target.value);
            return state;
    case SelectOnchangeIndicadores:
    
        formIndicadores =JSON.parse(JSON.stringify(state.formIndicadores));
       formIndicadores.Select[action.payload.target.name].value= action.payload.target.value;
       formIndicadores.Select[action.payload.target.name].modified= true;
        return  Object.assign({}, state, { formIndicadores });
    case msgIndicadores: 
    formIndicadores =JSON.parse(JSON.stringify(state.formIndicadores));
    formIndicadores.Mensaje = action.payload
        return  Object.assign({}, state, { formIndicadores });
    default:
        if (state.formIndicadores !== undefined){
            return state ;
        }else{
            return Object.assign({}, state, { formIndicadores });
        }
        
 }


 }
