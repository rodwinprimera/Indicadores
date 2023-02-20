import React from 'react';
import { ValidarModificar } from '../../lib/utils/UTF8';
import Button from '@material-ui/core/Button';
import Inquiries from '../../lib/Inquiries';
import { isObject } from '../../lib/utils/is';
 async function  handleClick({formArr,Limpiar,SetMensaje,Code})
{

 let  data =ValidarModificar(formArr,Code)
 if (!isObject(data)) return SetMensaje({"msg":data,"type":1});

 try {
   let consulta = await Inquiries.Query(data,'Indicadores','put');
    if(consulta.Error){
        SetMensaje({"msg":"Error del Servidor: "+consulta.Error ,"type":1})
        return ({"Error": "Error Con el Servidor"})
      }else{
        Limpiar(false)
        SetMensaje({"msg":"Se Se Modifico Con Existo","type":0})
        return ({"ok": "Se Proceso Con Existo"})
      }
 } catch (error) {
    return SetMensaje({"msg":'Error del servidor',"type":1});
 }
 
}

export default function BtnModificar(props) 
{
  const { disabled, Limpiar, formArr, SetMensaje,Code} = props

  return (
    <Button 
    id= {'Modificar'} 
    className= "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary MuiButton-containedPrimary MuiButton-containedSizeSmall MuiButton-sizeSmall"
    type="button"
    title={'Modificar'} 
    value={'Modificar'}
    disabled={disabled}
    onClick=  {(e)=> handleClick({formArr, Limpiar, SetMensaje,Code}) }
    >
  Modificar
  </Button>
  );
}
