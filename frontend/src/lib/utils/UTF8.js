
import Inquiries from '../../lib/Inquiries';
import { isObject } from './is';
import queryString from 'query-string';
export function encode_utf8(unicodeString) {
    if (typeof unicodeString != 'string') throw new TypeError('parameter ‘unicodeString’ is not a string');
    const utf8String = unicodeString.replace(
        /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
        function(c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
    ).replace(
        /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
        function(c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
    );
    return utf8String;
}
export function decode_utf8(utf8String) {
   if (utf8String!=null){
    if (typeof utf8String != 'string') throw new TypeError('parameter ‘utf8String’ is not a string');
    // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
    const unicodeString = utf8String.replace(
        /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
        function(c) {  // (note parentheses for precedence)
            var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f);
            return String.fromCharCode(cc); }
    ).replace(
        /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
        function(c) {  // (note parentheses for precedence)
            var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
            return String.fromCharCode(cc); }
    );
    return unicodeString;
   }else{
      return null;
   }
}


export function assignment ( form, dato) {
    Object.keys(form.CajasDeTexto).forEach((value , key ) => {
        
        dato[form.CajasDeTexto[value].name]= dato[form.CajasDeTexto[value].name] === null ? '': dato[form.CajasDeTexto[value].name];
        if (form.CajasDeTexto[value].type==="date"){
            dato[form.CajasDeTexto[value].name] = dato[form.CajasDeTexto[value].name].substr(0,10);
        }
        form.CajasDeTexto[value].value= dato[form.CajasDeTexto[value].name];
        form.CajasDeTexto[value].modified= false;
        if(form.CajasDeTexto[value].primary=== true){
            form.CajasDeTexto[value].disabled=true;
                     
        }
    });
    if(form.Select!=undefined){
    Object.keys(form.Select).forEach((value , key ) => {
       form.Select[value].value= dato[form.Select[value].name];
       form.Select[value].modified= false;
        if(form.Select[value].primary=== true){
            form.Select[value].disabled=true;
        }
    });
} 
    form.Commands[4].disabled= false;   
    form.Commands[3].disabled= false;
    form.Commands[0].disabled= true; 
   return form;
}
export function ValidarDatos ( form) {
    let array  = {}; 
    let mensaje = "";
    let arrayText= Object.keys(form.CajasDeTexto);
    
    for (let value of arrayText) {
        if( form.CajasDeTexto[value].value=== "" && form.CajasDeTexto[value].necessary===true ){
          let elemem =  document.getElementById (form.CajasDeTexto[value].name);
          if(elemem != null){
            elemem.focus();
          }
           return  mensaje= "debe rellenar el campo: "+form.CajasDeTexto[value].name;
        }   
        if(form.CajasDeTexto[value].value!== ""){
            array[value] =form.CajasDeTexto[value].value  ;  
        }
        
      }
      if(form.Select!=undefined){
        let arraySelet= Object.keys(form.Select);
      for (let value of arraySelet) {
        if(form.Select[value].value=== "" && form.Select[value].necessary===true ){
            let elemem =  document.getElementById(form.Select[value].name);
            if(elemem != undefined){
                elemem.focus();
            }
            
            return mensaje="debe rellenar el campo: "+form.Select[value].name; 
        }
        if(form.Select[value].value!== ""){
            array[value] =form.Select[value].value  ;  
        }
      }
    }


    return array;
 

   
}
export function ValidarModificar ( form,Cod,Restablecer=null) {
    let array  = {}; 
    let filter= {};
    let mensaje = "";
    let arrayText= Object.keys(form.CajasDeTexto);
   
    for (let value of arrayText) {

    
        if(form.CajasDeTexto[value].primary===true){
            filter[value]= form.CajasDeTexto[value].value
        }
        if( form.CajasDeTexto[value].value=== "" && form.CajasDeTexto[value].necessary===true ){
          let elemem =  document.getElementById (form.CajasDeTexto[value].name);
          if(elemem != null){
            elemem.focus();
          }
        
            return  mensaje= "debe rellenar el campo: "+form.CajasDeTexto[value].name;
        }   
        if(form.CajasDeTexto[value].modified === true){
            array[value] =form.CajasDeTexto[value].value  ;  
        }
        
      }
      if(form.Select!=undefined){
        let arraySelet= Object.keys(form.Select);
      for (let value of arraySelet) {
        if(form.Select[value].primary===true){
            filter[value]= form.Select[value].value
        }
        if(form.Select[value].value=== "" && form.Select[value].necessary===true ){
            let elemem =  document.getElementById (form.Select[value].name);
            if(elemem != null){
                elemem.focus();
              }
            return mensaje="debe rellenar el campo: "+form.Select[value].name; 
        }
        if(form.Select[value].modified === true){
            array[value] =form.Select[value].value  ;  
        }
      }
    }
  
    if (Restablecer!= null){
        let ClaveArray= Object.keys(array);
        let pibo = "";
        for (var i=0; i<ClaveArray.length; i++){
            if (i ===0){
                pibo= array[ClaveArray[i]];
            }
            if ( pibo != array[ClaveArray[i]]){
         return mensaje="Las claves No Coinciden ";
            }

        }
    }else{
        
        array["0"]=Cod;
    }

    return array;
 

   
}


export function Registrar (data,form,action,Limpiar,SetMensaje) {

    if(isObject(data)){
        let metodo = "";
    switch (action) {
        case  "Guardar":
            var obj =    {"petition":action,"place":form, "Datos":data };
            metodo = "post"
          break;  
        case  "Modificar":
            var obj =    {"petition":action,"place":form, "Datos":data };
            metodo = "put"
          break;
        case  "Eliminar":
            metodo = "delete"
         
            Inquiries.Query(null,form+"/"+data.Cod,metodo)
            Limpiar(false,form,"Eliminar")
            SetMensaje({"msg":"Se Elimino Con Existo","type":0})
           
            return 
  
     }
  
     if (obj!=null){
      
         
     const ingresarConsulta =  Inquiries.Query(data,form,metodo);
     ingresarConsulta.then((x)=>{
      console.log(x)
        if(x.Error){
          SetMensaje({"msg":"Error del Servidor: "+x.Error ,"type":1})
          return ({"Error": "Error Con el Servidor"})
        }else{
          Limpiar(false,form,action,x)
          SetMensaje({"msg":"Se Proceso Con Existo","type":0})
          return ({"ok": "Se Proceso Con Existo"})
        }
    
      },
      (err)=>{
          console.log(err)
          SetMensaje({"msg":"Error del Servidor","type":1})
          return ({"Error": "Error Con el Servidor"})
            
      });
            
      return  ({"ok": "Se Proceso Con Existo"});
    }else{
        Limpiar(false,form,action);
        SetMensaje({"msg":"Se Proceso Con Existo","type":0})
  
        return ({"ok": "Se Proceso Con Existo"})
    
    }
    }else{
       
        SetMensaje({"msg":data,"type":1})
        return ({"Error": data})
        
    }
    
   
}



export function round(num, decimales = 2) {
    if(isNaN(num)){
           return num;
    }else{
     let signo = (num >= 0 ? 1 : -1);
 
     num = num * signo;
     if (decimales === 0) //con 0 decimales
         return signo * Math.round(num);
     // round(x * 10 ^ decimales)
     num = num.toString().split('e');
     num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
     // x * 10 ^ (-decimales)
     num = num.toString().split('e');
     return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
     }
 }






 export function CodUrl(Url){
    Url= Url.replaceAll('/','ø')
    Url= queryString.stringify({ROD:Url}).replace('ROD=','');
    return Url;
  }
  export function DeCodUrl(Url){
    Url= decodeURIComponent(Url)
    Url= Url.replaceAll('ø','/')
    return Url;
  }