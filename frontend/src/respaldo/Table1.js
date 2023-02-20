import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import TableSortLabel from "@material-ui/core/TableSortLabel";






const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});


function BuscarCampo (event,search,form){
  event.preventDefault(); 
  
    
  var Texto = document.getElementsByClassName("MuiInput-input");
  var array  = []; 

            for(var i=0;i<Texto.length;i++){
      array[i] = parseInt(Texto[i].name) ;
    
    }

search({"petition":"Buscar","place":form, "filter":{  "1" : event.target.innerHTML, "13":"Activo" }, "Datos":array, "LIMIT":"1" });
}



function Table1(props) {
  const { datosTabla ,ListarTabla, ConsultaTabla, Cant,search,form} = props
  
var columns=[];
var keytable ="";

  if(datosTabla.length> 0){
   
   var arrayKeys= Object.keys(datosTabla[0]);
   var i =0;
   for (let value of arrayKeys) {
     if (i ===0){
      keytable= value;
     }
    columns[i]= { id: value , label: value , minWidth: 50 },
    i++;
   
   }
   }

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const handleChangePage = (event, newPage) => {
  
   setPage(newPage);

   var x1= rowsPerPage*newPage +1;

   if(x1===1){
    x1=0;
   }
  
   ConsultaTabla.LIMIT= ""+x1+","+rowsPerPage+"";
   ListarTabla(ConsultaTabla);
 

  };

  const handleChangeRowsPerPage = (event) => {

    setRowsPerPage(+event.target.value);
    setPage(0);
    var x1=0;
    
    
   
    ConsultaTabla.LIMIT= ""+x1+","+event.target.value+"";
    ListarTabla(ConsultaTabla);
  };
   //search({"petition":"Buscar","place":form,  "Datos":[1,2,3,4,5,6,7,8,9,10,11,12,13] , "Ordenar":[1,1], "LIMIT":"2" });
   

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {datosTabla.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={row[keytable]} key={row[keytable]}>
                  {columns.map((column) => {
                    const value = row[column.id];
                   if (column.id===keytable){
                    return (
                      <TableCell key={column.id} align={column.align} className="td" ><Link  href="#" to="#" onClick={(e)=>{BuscarCampo(e,search,form)}}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                        </Link></TableCell>
                    );
                   }else{
                    return (
                      <TableCell key={column.id} align={column.align}  >
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                    );
                   }
                   
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={parseInt(Cant)}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
export default (Table1);