import React from 'react';
import { ValidarDatos, Registrar, ValidarModificar, ValidarEliminar } from '../../lib/utils/UTF8';
import Button from '@material-ui/core/Button';



function handleClick(e,formArr,form,Limpiar, ListarTabla, ConsultaTabla)
{
  var Boton ="";
     if(e.target.type==="button")
     {
        Boton= e.target.id;
     }
     else
     {
        Boton=e.target.innerHTML;
     }

  switch (Boton) 
  {
    case  "Listar":
     
      ListarTabla(ConsultaTabla);
      break;  
    case  "Limpiar":
      Limpiar();
      break;
    case  "Incluir":
     Registrar(ValidarDatos(formArr),form,"Guardar",Limpiar);
      break;
    case  "Modificar":
      Registrar(ValidarModificar(formArr),form,"Modificar",Limpiar);
      break;
    case  "Eliminar":
    Registrar(ValidarEliminar(formArr),form,"Eliminar",Limpiar);
      break;    
  }  
}

export default function Command(props) 
{
  const { key ,name , disabled, ButtonStade, tap, Limpiar, formArr, form, ListarTabla, ConsultaTabla} = props
  return (
    <Button key = {key}
    id= {name} 
    className= "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary MuiButton-containedPrimary MuiButton-containedSizeSmall MuiButton-sizeSmall"
    type="button"
    title={name} 
    value={name}
    disabled={disabled}
    onClick=  {(e)=> handleClick(e,formArr,form, Limpiar, ListarTabla, ConsultaTabla) }
    >
    {name} 
  </Button>
  );
}
