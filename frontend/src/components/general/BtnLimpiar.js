import React from 'react';
import Button from '@material-ui/core/Button';


export default function BtnLimpiar(props) 
{
 

  return (
    <Button 
    id= {'Limpiar'} 
    className= "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary MuiButton-containedPrimary MuiButton-containedSizeSmall MuiButton-sizeSmall"
    type="button"
    title={'Limpiar'} 
    value={'Limpiar'}
    {...props}
    >
    Limpiar 
  </Button>
  );
}
