// Dependencies

import queryString from 'query-string';

import { decode_utf8 } from './UTF8';
export function apiFetch(endpoint, options = {}, query = false) {
  let qs;

  if (query) {
    qs = queryString.stringify(query);
  }

  const getPromise = async () => {
    try {
      const fetchOptions = apiOptions(options);
      const fetchEndpoint = apiEndpoint(endpoint, qs);
      //esto es mientras tanto
      var endpoint2= fetchEndpoint;
      if (fetchOptions.method ==="POST" || fetchOptions.method === "PUT" ){
        endpoint2=endpoint;
      }
       
      const response = await fetch(endpoint2, fetchOptions);
      var respuesta = await response.json();
      
      if(respuesta != null){
        if(respuesta.Error ==="Token"){
          console.log("Ya fallo El token")
        // Redirect.to="/Sistema/Login";
  
       // history.go("Sistema/Login");
   // history.replace("Login") 
      // history.go("/Sistema/Login");
        // return (<Redirect to='/Sistema/Login'  />)
         window.location.href = "/Sistema/Login";
          
        }
      }
   
      return JSON.parse(decode_utf8(JSON.stringify(respuesta))) ;
    } catch (e) {
      console.log('error Rodwin')
      console.log(e)
       throw e;
    }
    
  };

  return getPromise();
}

export function apiFetchArchivo(endpoint, options = {}, query = false) {
  let qs;

  if (query) {
    qs = queryString.stringify(query);
  }

  const getPromise = async () => {
    try {
      const fetchOptions = apiOptions(options);
      const fetchEndpoint = apiEndpoint(endpoint, qs);
      //esto es mientras tanto
      var endpoint2= fetchEndpoint;
      if (fetchOptions.method ==="POST" || fetchOptions.method === "PUT" ){
        endpoint2=endpoint;
      }
       console.log(endpoint2)
      const response = await fetch(endpoint2, fetchOptions);
      let blob = await response.blob()
      
      let type = blob.type
      let  extencion = type ==='application/vnd.ms-excel'?'xls' :'pdf' 
      const url = window.URL.createObjectURL(blob);
   const link = document.createElement("a");
   link.href = url;

   link.setAttribute("download", "Document."+extencion);
   document.body.appendChild(link);
   link.click();

      return JSON.parse(decode_utf8(JSON.stringify('{"Respose":"OK"}'))) ;
    } catch (e) {
       throw e;
    }
    
  };

  return getPromise();
}

export function apiEndpoint(endpoint, qs) {
  let query = '';

  if (qs) {
    query = `?${qs}`;
  }

  return `${endpoint}${query}`;
}

export function apiOptions(options = {}) {
  const {
    method = 'GET',
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body = false
  } = options;

  const newOptions = {
    method,
    headers,
    };

  if (body) {
   
    newOptions.body = body;
  }

  return newOptions;
}


export function  FechaEs(date){
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const dias_semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  let FechaTitulo = dias_semana[date.getDay()] + ', ' + date.getDate() + ' de ' + meses[date.getMonth()] + ' de ' + date.getUTCFullYear()
return FechaTitulo
}
export function sumarDias(dias){
  let fecha = new Date();
   fecha.setDate(fecha.getDate() + dias);
   return fecha;
 }

 export function  StringFecha(date){
  let dia  = date.getDate();
let mes  = date.getMonth();
let anio = date.getFullYear();
mes++
  let date2 = date.toLocaleDateString().split("T")[0].split("/")
  date2[0] = date2[0]<10 ? "0"+ date2[0]:date2[0];
  date2[1] = date2[1]<10 ? "0"+ date2[1]:date2[1];
  dia = parseInt(dia) < 10 ? "0" +dia : dia
  mes = parseInt(mes) < 10 ? "0" +mes : mes
  return anio  +"-"+ mes+'-'+dia;
 }

 export function restaFechas (f1,f2)
 {
  let date_1 = new Date(f1);
  let date_2 = new Date(f2);
  
  let day_as_milliseconds = 86400000;
  let diff_in_millisenconds = date_2 - date_1;
  let diff_in_days = diff_in_millisenconds / day_as_milliseconds;
  return diff_in_days
 }