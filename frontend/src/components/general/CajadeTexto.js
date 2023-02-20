
import React from 'react';
import TextField from '@material-ui/core/TextField'
import Stilo from './Stilo';
import Grid from '@material-ui/core/Grid';
    function  validar(evt) //Valida solo numeros
      {
       
        let  code = (evt.which) ? evt.which : evt.keyCode;
  
        var re = /^([0-9.\-])*$/;
      if(!re.test(String.fromCharCode(code))){
        evt.preventDefault();
      }
        return re.test(String.fromCharCode(code));
      }

    function validar2(evt) // Valida solo letras
      { 
       
    let  code = (evt.which) ? evt.which : evt.keyCode;
  
    let re = /^([a-zA-ZñÑáéíóúÁÉÍÓÚ@!#$%&'*+/=? _`{}~.(),\-:;<>])*$/;
    if(!re.test(String.fromCharCode(code))){
  evt.preventDefault();
    }
    return re.test(String.fromCharCode(code));
      
      }

    function validar3(evt) // Valida letras y numeros
      {
        let  code = (evt.which) ? evt.which : evt.keyCode;
  
  var re = /^([0-9a-zA-ZñÑáéíóúÁÉÍÓÚ@!#$%&'*+/=?^ _`{}~.(),\-:;<>])*$/;
      if(!re.test(String.fromCharCode(code))){
        evt.preventDefault();
        }
  return re.test(String.fromCharCode(code));
      
      }
    function ValidarKeypres(evt,tipo) // Asigna la validacion segun el tipo numer string o alfanumero
      {
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
    function   Text_Onkey(e, primary, search, form, formTope,CajaOnchange,Separador)
     {
        var code = (e.which) ? e.which : e.keyCode;
        e.preventDefault();
        if(code===13 && primary === true )
        {
        var Texto = document.getElementsByClassName("MuiInput-input");
        var array  = []; 
        var KEY= e.target.name
            for(var i=0;i<Texto.length;i++)
             {
                if(Texto[i].name != "Buscar")
                {
                  array[i] = parseInt(Texto[i].name) ;
                }
             }
           
             
             search(`s${KEY+Separador}`+e.target.value);
       
         
        } 
        
    }

// explico como funciona 
/*
no unso el CajaOnchange directamente en el evento change debido  a que cada vez que tipee una tecla se
renderizara todo el formulario completo lo que hacer muy lento el proceso 
en vez uso un Hooks en el changue que guarde la informacion
este Hooks lo inicio con el valor que me viene del stado y unso useEffect para que me actualize el Hooks
si resivo un valor distinto del stado

cuando uso CajaOnchange 
justamente cuando el imput pierde el foco y me da la oportunidad de cambiar el estado y renderizar el formulario 
claro solo actualizo el estado si vale la pena es decir si el valor del estado es distinto al valor de mi Hooks 

*/
export default function CajadeTexto(props) 
 {
  const { id ,name, value, CajaOnchange, disabled, len, type,  primary, search, form, tipo, formTope,Separador ,necessary} = props
  const  StiloCss = Stilo();
  const [Value, setValue] =  React.useState(value)
  React.useEffect(()=>{
  
        if(Value !=value ){
          setValue(value)
        }
        
  },[value])
  const Onchange =(e)=> {
    e.preventDefault()
    setValue(e.target.value)
  }
  const Onblue = (e)=>{
    if (value !=e.target.value){
      CajaOnchange(e)
    }
  }

   if(type==='date' )
    {
      return (
        <Grid container 

        alignItems="center"
        justify="center"
        >

        <Grid container 
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid
            item xs={12} sm={12} md={12} lg={12} xl={12} >
      <TextField
      type ={type}
      id={name} 
      label={necessary === true ?'* '+name: name}
      onKeyPress={(e)=>ValidarKeypres(e,tipo)}
      onChange = { (e) =>Onchange(e) }
      onKeyUp = {(e)=>Text_Onkey(e, primary, search, form, formTope,CajaOnchange,Separador)}
      disabled={disabled}
      name={id}
      onBlur = {Onblue}
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
        </Grid>
        </Grid>
      );
    }else
    {
      
      return (
        <Grid container 

        alignItems="center"
        justify="center"
        >

        <Grid container 
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid
            item xs={12} sm={12} md={12} lg={12} xl={12} >
            
      <TextField
      error={false}
      type ={type}
      id={name} 
      label={necessary === true ?'* '+name: name}
      onKeyPress={(e)=>ValidarKeypres(e,tipo)}
      onChange = { (e) =>Onchange(e) }
      onKeyUp = {(e)=>Text_Onkey(e, primary, search, form, formTope,CajaOnchange,Separador)}
      disabled={disabled}
      name={id}
      value={Value}
      onBlur = {Onblue}
      autoComplete="off" 
      className=  {StiloCss.root} 
      inputProps={{ 
        maxLength: len,
      }}
      title={"ingrese "+name}/>
        
          </Grid>
        </Grid>
        </Grid>

      
      );
  }
}


