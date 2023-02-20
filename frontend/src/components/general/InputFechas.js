import React from 'react';
import TextField from '@material-ui/core/TextField'
import Stilo from './Stilo';
import Grid from '@material-ui/core/Grid';
import {isFunction } from '../../lib/utils/is'

function titleCase(texto) {
  const re = /(^|[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ])(?:([a-záéíóúüñ])|([A-ZÁÉÍÓÚÜÑ]))|([A-ZÁÉÍÓÚÜÑ]+)/gu;
  return texto.replace(re,
      (m, caracterPrevio, minuscInicial, mayuscInicial, mayuscIntermedias) => {
  
          //Son letras mayúsculas en el medio de la palabra
          // => llevar a minúsculas.
          if (mayuscIntermedias)
              return mayuscIntermedias.toLocaleLowerCase(locale);
          //Es la letra inicial de la palabra
          // => dejar el caracter previo como está.
          // => si la primera letra es minúscula, capitalizar
          //    sino, dejar como está.
          return caracterPrevio
               + (minuscInicial ? minuscInicial.toLocaleUpperCase(locale) : mayuscInicial);
      }
  );
}
const  formatRut = (rut)=>{
  const VoltearCadena= (cadena)=>{
    let cadenaAlrevez = ''
   for (let i = 0; i< cadena.length ; i++){
    cadenaAlrevez =    cadena[i] + cadenaAlrevez
   }
   return cadenaAlrevez;
  }
  const agregarCaracter = (cadena, caracter, pasos) => {
    let cadenaConCaracteres = "";
    const longitudCadena = cadena.length;
    for (let i = 0; i < longitudCadena; i += pasos) {
        if (i + pasos < longitudCadena) {
            cadenaConCaracteres += cadena.substring(i, i + pasos) + caracter;
        } else {
            cadenaConCaracteres += cadena.substring(i, longitudCadena);
        }
    }
    return cadenaConCaracteres;
}
  let reg = /[ .\-]/gi; // eliminamos todos los giones y puntos puntos por el usuario
  let RutLimpio = rut.replace(reg,'')

  let DigitoVerificador = RutLimpio.slice(-1) //Guardamos digito verificado
  RutLimpio =RutLimpio.substring(0, RutLimpio.length - 1) // sacamos digito verificador
  let cadenavolteada =VoltearCadena(RutLimpio);
  let cadenavolteadaConLosPuntos = agregarCaracter(cadenavolteada,'.',3)
  let cadenaDerecha = VoltearCadena(cadenavolteadaConLosPuntos)
  let RutConFromato = cadenaDerecha +'-' +DigitoVerificador
  return RutConFromato;
}
    function  validar(evt) //Valida solo numeros
      {
        var code = (evt.which) ? evt.which : evt.keyCode;
           if(code===8) 
           {
           //backspace
            return true;
           }
            else if(code>=48 && code<=57) 
           {
            //is a number
            return true;
           }
           else
           {
            evt.preventDefault();
            return false;
          }
      }

    
function validar2(evt) // Valida solo letras
{
 
  let  code = (evt.which) ? evt.which : evt.keyCode;
  
  let re = /^([a-zA-ZñÑáéíóúÁÉÍÓÚ@, .\-_])*$/;
if(!re.test(String.fromCharCode(code))){
  evt.preventDefault();
}
  return re.test(String.fromCharCode(code));
}


function validar3(evt) // Valida letras y numeros
{
  
  let  code = (evt.which) ? evt.which : evt.keyCode;
  
  var re = /^([0-9a-zA-ZñÑáéíóúÁÉÍÓÚ@!#$%&'*+/=?^ _`{|}~.(),\-:;<>])*$/;
if(!re.test(String.fromCharCode(code))){
  evt.preventDefault();
}
  return re.test(String.fromCharCode(code));

}
function validarRut(evt) // validamos Si es rut
{
  
  let  code = (evt.which) ? evt.which : evt.keyCode;
  
  var re = /^([0-9kK.\-])*$/;
if(!re.test(String.fromCharCode(code))){
  evt.preventDefault();
}
  return re.test(String.fromCharCode(code));

}
    function ValidarKeypres(evt,tipo,name) // Asigna la validacion segun el tipo numer string o alfanumero

    
      {
        if( name ==='Rut'){
          validarRut(evt)
          return
        }
      switch  (tipo) 
      {
        case 'n':
          validar(evt);
          break;
        case 's':
          validar2(evt);
          break;
        case  'a':
        validar3(evt);
            break;
        default:
      }
     }
       function Text_Onkey(e, primary, search,setValue) {
      let code = (e.which) ? e.which : e.keyCode;
      e.preventDefault();
      if (code === 13 && primary === true) {
        let Texto = document.getElementsByClassName("MuiInput-input");
        let array = [];
        let KEY = e.target.name
        for (var i = 0; i < Texto.length; i++) {
          if (Texto[i].name != "Buscar") {
            array[i] = parseInt(Texto[i].name);
          }
        }
    
       if(isFunction(search)){
       
        search(e);
       }
       
        
      }
      
    
    }
    const ExtraerFechas = (Dato)=>{
        if(Dato === "") return ["",""];
       return Dato.split("%2C")
      }

export default function InputFechas(props) 
 {
  const { id ,name, value, CajaOnchange, disabled, len, type,  primary, search, tipo ,necessary} = props
  const  StiloCss = Stilo();
  const [Value, setValue] =  React.useState(ExtraerFechas(value)[0])
  const [Value2, setValue2] =  React.useState(ExtraerFechas(value)[1])
  React.useEffect(()=>{
        if(Value !=value   ){
          setValue(ExtraerFechas(value)[0])
          setValue2(ExtraerFechas(value)[1])
        }
        
  },[value])
  const Onchange =(e,name)=> {
    e.preventDefault()
    setValue(e.target.value)
  }
  const Onchange1 =(e,name)=> {
    e.preventDefault()
    setValue2(e.target.value)
  }
  const Onblue = (e)=>{
    if (value !=e.target.value){
       
    if (name ==='Rut'){
    
      e.target.value = formatRut(e.target.value)
    
      setValue(e.target.value)
    }
    if(name === "Nombres" || name=== "Apellidos" ){
      e.target.value = titleCase(e.target.value)
    }
  let text =    e.target.value + "%2C"+Value2
       
    CajaOnchange({target:{name:name,id:id,value:text }, persist:()=>{}})
    }
  }

  const Onblue1 = (e)=>{
    if (value !=e.target.value){
       
    if (name ==='Rut'){
    
      e.target.value = formatRut(e.target.value)
    
      setValue(e.target.value)
    }
    if(name === "Nombres" || name=== "Apellidos" ){
      e.target.value = titleCase(e.target.value)
    }
    let text =   Value  + "%2C"+ e.target.value 
    CajaOnchange({target:{name:name,id:id,value:text }, persist:()=>{}})
    }
  }

   if(type==='date' || type ==='datetime-local' )
    {
      return (
        <Grid container 

        alignItems="center"
        justify="center"
        >

        
          <Grid
          style = {{ padding : '0 10px 5px 10px'}}
          item xs={12} sm={12} md={3} lg={3} xl={3} >

       
         
      <TextField
      fullWidth 
      style = {{padding :'10xp'}}
      type ={type}
      id={name} 
      label={necessary === true ?'* Inicio '+name: name +' Inicio '}
      onKeyPress={(e)=>ValidarKeypres(e,tipo,name)}
      onChange = { (e) =>Onchange(e) }
      onKeyUp = {(e)=>Text_Onkey(e, primary, search,setValue)}
      disabled={disabled}
      name={id}
      onBlur = {(e)=>Onblue(e,name)}
      value={Value}
      autoComplete="off" 
      className=  {StiloCss.root}
      inputProps={{ 
      maxLength: len,
      }}
      InputLabelProps={{
      shrink: true,
      }}
      title={"ingrese "+name}/>
    </Grid>

    <Grid
          style = {{ padding : '0 10px 5px 10px'}}
            item xs={12} sm={12} md={3} lg={3} xl={3} >

       
         
      <TextField
      fullWidth 
      style = {{padding :'10xp'}}
      type ={type}
      id={name} 
      label={necessary === true ?'* Fin '+name: name+' Fin '}
      onKeyPress={(e)=>ValidarKeypres(e,tipo,name)}
      onChange = { (e) =>Onchange1(e) }
      onKeyUp = {(e)=>Text_Onkey(e, primary, search,setValue2)}
      disabled={disabled}
      name={id}
      onBlur = {(e)=>Onblue1(e,name)}
      value={Value2}
      autoComplete="off" 
      className=  {StiloCss.root}
      inputProps={{ 
      maxLength: len,
      }}
      InputLabelProps={{
      shrink: true,
      }}
      title={"ingrese "+name}/>
    </Grid>
        </Grid>
      );
    }else
    {
      
      return (
      <div>

      </div>);
  }
}


