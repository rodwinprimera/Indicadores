import React from 'react';
import Button from '@material-ui/core/Button';


export default function BtnListar(props) 
{
  const {ListarTabla,consulta,disabled} = props

  return (
    <Button 
    id= {'Listar'} 
    className= "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary MuiButton-containedPrimary MuiButton-containedSizeSmall MuiButton-sizeSmall"
    type="button"
    title={'Listar'} 
    value={'Listar'}
    disabled={disabled}
    onClick=  {(e)=>{ListarTabla(consulta)} }
    >
    Listar 
  </Button>
  );
}
