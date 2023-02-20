
import React from 'react';
import TextField from '@material-ui/core/TextField'
import Stilo from './Stilo';

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
        var code = (evt.which) ? evt.which : evt.keyCode;
        if(code===8)
        {
          return true;
        }
        else if( (code>=95 && code<=122) || (code>=64 && code<=90) || (code>=160 && code<=165) || (code===130) || (code===45) || (code===129) || (code===46) || (code===32) ) 
        {
          return true;
        } 
        else
        {
          evt.preventDefault();
          return false;
        }
      
      }

    function validar3(evt) // Valida letras y numeros
      {
        var code = (evt.which) ? evt.which : evt.keyCode;
        if(code===8) 
        {
          return true;
        }
        else if((code>=95 && code<=122) || (code>=48 && code<=57) ||  (code>=64 && code<=90) || (code>=160 && code<=165)|| (code===130) || (code===45) || (code===129) || (code===46) || (code===32) ) 
        {
          return true;
        } 
        else
        {
          evt.preventDefault();
          return false;
        }
      
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
    function   Text_Onkey(e, primary, search, form)
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
        search({"petition":"Buscar","place":form, "filter":{  [KEY] : e.target.value, "13":"Activo" }, "Datos":array, "LIMIT":"1", "Cant":"No" });
         //search({"petition":"Buscar","place":form,  "Datos":[1,2,3,4,5,6,7,8,9,10,11,12,13] , "Ordenar":[1,1], "LIMIT":"2" });
        } 
        
    }


export default function CajadeTexto(props) 
 {
  const { id ,name, value, CajaOnchange, disabled, len, type,  primary, search, form, tipo } = props
  const  StiloCss = Stilo();
   if(type==='date' )
    {
      return (
      <TextField
      type ={type}
      id={name} 
      label={name}
      onKeyPress={(e)=>ValidarKeypres(e,tipo)}
      onChange = { (e) =>CajaOnchange(e) }
      onKeyUp = {(e)=>Text_Onkey(e, primary, search, form)}
      disabled={disabled}
      name={id}
      value={value}
      autoComplete="off" 
      className=  {StiloCss.root}
      inputProps={{ 
      maxLength: len,
      }}
      InputLabelProps={{
      shrink: true,
      }}
      title={"ingrese "+name}/>
      );
    }else
    {
      return (   
      <TextField
      error={false}
      type ={type}
      id={name} 
      label={name}
      onKeyPress={(e)=>ValidarKeypres(e,tipo)}
      onChange = { (e) =>CajaOnchange(e) }
      onKeyUp = {(e)=>Text_Onkey(e, primary, search, form)}
      disabled={disabled}
      name={id}
      value={value}
      autoComplete="off" 
      className=  {StiloCss.root} 
      inputProps={{ 
        maxLength: len,
      }}
      title={"ingrese "+name}/>
      );
  }
}


