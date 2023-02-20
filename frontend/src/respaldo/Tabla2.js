import React from "react";
import PropTypes from "prop-types";
import {  makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField'
function TextBuscar_Onkey(e, ConsultaTabla, ListarTabla,setPage){
  var code = (e.which) ? e.which : e.keyCode;
        e.preventDefault();
        
        if(code===13){
          setPage(0);
          if (e.target.value!=""){
            ConsultaTabla.Cant='cantidad';
            ConsultaTabla.filter2=e.target.value;
          
            ListarTabla(ConsultaTabla); 
          }else{
            ConsultaTabla.Cant='cantidad';
            ListarTabla(ConsultaTabla);
          }
          
        }
}

function BuscarCampo (event,search,form){
    event.preventDefault(); 
    
      
    var Texto = document.getElementsByClassName("MuiInput-input");
    var array  = []; 
  
              for(var i=0;i<Texto.length;i++){
                if(Texto[i].name != "Buscar"){
        array[i] = parseInt(Texto[i].name) ;
                }
      }
  
  search({"petition":"Buscar","place":form, "filter":{  "1" : event.target.innerHTML, "13":"Activo" }, "Datos":array, "LIMIT":"1" , "Cant":"No" });
  }
  
function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, columns, rowsPerPage, ConsultaTabla, ListarTabla, handleOrdenar,setPage } = props;
  const createSortHandler = property => event => {
    var ord = 0;
    var cam = "0";
    if (property!=orderBy){
     
      ord =0;
    }else{
    if(order==="asc"){
    
     ord =1;
    }else{
     
      ord =0;
    }
    }
    var elemen = document.getElementById(property);
    if(elemen!= null){
      cam = elemen.name;
    }else{
      cam= property;
    }
     onRequestSort(event, property);
   
      
    ConsultaTabla.LIMIT= ""+0+","+rowsPerPage+"";
    ConsultaTabla.Ordenar = [cam,ord]
    handleOrdenar([cam,ord])
    var inputBuscar= document.getElementById('Buscar');
    if(inputBuscar.value!=""){
      ConsultaTabla.filter2=inputBuscar.value;
    }
    ConsultaTabla.Cant='No';
    ListarTabla(ConsultaTabla);
    setPage(0);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  ConsultaTabla: PropTypes.object.isRequired,
  ListarTabla: PropTypes.func.isRequired,
  columns: PropTypes.array,
  handleOrdenar: PropTypes.func,
  setPage: PropTypes.func
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  container: {
    maxHeight: 440,
  },
}));

export default function Tabla2(props) {
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
         columns[i]= { id: value , label: value , numeric: false, disablePadding: false },
           i++;
        
        }
        }
     
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("1");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [Ordenar, setOrdenar] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = datosTabla.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleOrdenar = (or) => {
    setOrdenar(or);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);

    var x1= rowsPerPage*newPage +1;
 
    if(x1===1){
     x1=0;
    }
   if (Ordenar.length >0){
    ConsultaTabla.Ordenar=Ordenar;
   }
    ConsultaTabla.LIMIT= ""+x1+","+rowsPerPage+"";
    var inputBuscar= document.getElementById('Buscar');
    if(inputBuscar.value!=""){
      ConsultaTabla.filter2=inputBuscar.value;
    }
    ConsultaTabla.Cant='No';
    ListarTabla(ConsultaTabla);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    var x1=0;
    
    if (Ordenar.length >0){
      ConsultaTabla.Ordenar=Ordenar;
     }
     var inputBuscar= document.getElementById('Buscar');
     if(inputBuscar.value!=""){
       ConsultaTabla.filter2=inputBuscar.value;
     }
    ConsultaTabla.LIMIT= ""+x1+","+event.target.value+"";
    ConsultaTabla.Cant='No';
    ListarTabla(ConsultaTabla);
    
  };

  

   
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
      <TextField
   
   type ='text'
   id='Buscar' 
   label='Buscar'
   disabled={false}
   name='Buscar'
   autoComplete="off"
   onKeyUp = {(e)=>TextBuscar_Onkey(e, ConsultaTabla, ListarTabla,setPage )}
     title="Buscar "/>
        <TableContainer className={classes.container}>
          <Table className={classes.table} stickyHeader aria-labelledby="tableTitle">
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={datosTabla.length}
              columns ={columns}
              rowsPerPage={rowsPerPage}
              ConsultaTabla ={ConsultaTabla}
              ListarTabla={ListarTabla}
              handleOrdenar={handleOrdenar}
              setPage={setPage}
            />
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
    </div>
  );
}
