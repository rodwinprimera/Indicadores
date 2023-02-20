import React from 'react';
import Button from '@material-ui/core/Button';
import Inquiries from '../../lib/Inquiries';


 async function  handleClick({Code,SetMensaje,Limpiar})
{

    let opcion = confirm("Esta Seguro que desea Eliminar el Registro ?");
    if (!opcion == true) {
   return
    }

 try {
   let consulta = await  Inquiries.Query(null,'Indicadores'+"/"+Code,'delete')
  
   
    if(consulta.Error){
        SetMensaje({"msg":"Error del Servidor: "+consulta.Error ,"type":1})
        return ({"Error": "Error Con el Servidor"})
      }else{
        Limpiar(false)
        SetMensaje({"msg":"Se Proceso Con Existo","type":0})
        return ({"ok": "Se Proceso Con Existo"})
      }
 } catch (error) {
    console.log(error)
    return SetMensaje({"msg":'Error del servidor',"type":1});
 }
 
}

export default function BtnEliminar(props) 
{
  const {Code,SetMensaje,Limpiar,disabled} = props

  return (
    <Button 
    id= {'Eliminar'} 
    className= "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary MuiButton-containedPrimary MuiButton-containedSizeSmall MuiButton-sizeSmall"
    type="button"
    title={'Eliminar'} 
    value={'Eliminar'}
    disabled={disabled}
    onClick=  {(e)=> handleClick({Code,SetMensaje,Limpiar}) }
    >
    Eliminar
  </Button>
  );
}
