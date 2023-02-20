import React from 'react';
import { ValidarDatos } from '../../lib/utils/UTF8';
import Button from '@material-ui/core/Button';
import Inquiries from '../../lib/Inquiries';
import { isObject } from '../../lib/utils/is';
 async function  handleClick({formArr,Limpiar,SetMensaje})
{

 let  data =ValidarDatos(formArr)
 if (!isObject(data)) return SetMensaje({"msg":data,"type":1});

 try {
  let  consulta = await Inquiries.Query(data,'Indicadores','post');

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

export default function BtnIncluir(props) 
{
  const { disabled, Limpiar, formArr, SetMensaje} = props

  return (
    <Button 
    id= {'Incluir'} 
    className= "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary MuiButton-containedPrimary MuiButton-containedSizeSmall MuiButton-sizeSmall"
    type="button"
    title={'Incluir'} 
    value={'Incluir'}
    disabled={disabled}
    onClick=  {(e)=> handleClick({formArr, Limpiar, SetMensaje}) }
    >
    Incluir
  </Button>
  );
}
