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
import { CodUrl } from "../../lib/utils/UTF8";
var ordent = ""
let ConsultaTabla = "0/10"+ordent
function TextBuscar_Onkey(e, ListarTabla,setPage,Campos,filtro = ""){
  let code = (e.which) ? e.which : e.keyCode;
        e.preventDefault();
        
        if(code===13){
          setPage(0);
          if (e.target.value!=""){
            if(filtro ==""){
              ConsultaTabla= CodUrl("s"+e.target.value.replace(/ /g,"|"))+"/" +ConsultaTabla;
            }else{
              ConsultaTabla= filtro + CodUrl("|"+e.target.value.replace(/ /g,"|"))+"/" +ConsultaTabla;
            }
           
            //filtroOpcional = e.target.value
            ListarTabla(ConsultaTabla+"/"+Campos); 
          }else{
            //filtroOpcional = null
           // ConsultaTabla.Cant='cantidad';
         
            ListarTabla(filtro+"/"+ ConsultaTabla+"/"+Campos);
           
           
    
          }
          
        }


}

function BuscarCampo (event,search){
    event.preventDefault(); 
    
 

    search(event.target.innerHTML)


 
  }
  
function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, columns, rowsPerPage, ListarTabla, handleOrdenar,setPage,Campos,filtro } = props;

  const createSortHandler = property => event => {
    let ord = 0;
    let cam = "0";
    if (property!=orderBy){
     
      ord =0;
    }else{
    if(order==="asc"){
    
     ord =1;
    }else{
     
      ord =0;
    }
    }
    let elemen = document.getElementById(property);
    if(elemen!= null){
      cam = property;
    }else{
      cam= property;
    }
     onRequestSort(event, property);
   
     ordent = `/${cam}/${ord}/`
    ConsultaTabla= rowsPerPage+"/"+0+`/${cam}/${ord}`;

    //ConsultaTabla.Ordenar = [cam,ord]
    handleOrdenar([cam,ord])
    let inputBuscar= document.getElementById('Buscar');
    if(inputBuscar.value!=""){
      if(filtro != "" && filtro != undefined ){
        ConsultaTabla= filtro + "|" + CodUrl(inputBuscar.value.replace(/ /g,"|")) +"/" +ConsultaTabla;
      }else{
        ConsultaTabla="s"+CodUrl(inputBuscar.value.replace(/ /g,"|")) +"/" +ConsultaTabla;
      }
     
    }else{
      if(filtro!=""  && filtro != undefined ){
        ConsultaTabla= filtro+"/"+ConsultaTabla
      }
    }
   
  
   ListarTabla(ConsultaTabla+"/"+Campos);
    setPage(0);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map(headCell => (
          <TableCell
          style={{ whiteSpace: 'nowrap'}}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              style={{ whiteSpace: 'nowrap'}}
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
  ListarTabla: PropTypes.func.isRequired,
  columns: PropTypes.array,
  Campos: PropTypes.string.isRequired,
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
    maxWidth:'1200px',
    [theme.breakpoints.only('xl')]:{
      maxWidth: '1200px',
    },
    [theme.breakpoints.only('lg')]:{
      maxWidth: '1200px',
    },
    [theme.breakpoints.only('md')]:{
      maxWidth: '1200px',
    },
    [theme.breakpoints.only('sm')]:{
      maxWidth: '800px',
    },
    [theme.breakpoints.only('xs')]:{
      maxWidth: '500px',
    },
    maxHeight: 440,
  },
}));

export default function Tabla2(props) {
    const { datosTabla ,ListarTabla, Cant,search,form,ConsultaTabla2, FormGeneral,Campos,camposFn, QR, filtro } = props
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);
    React.useEffect(()=>{
  
      setPage(0);
      
        if(filtro==""  || filtro == undefined ){
         
        }else{
          ConsultaTabla= filtro+"/" +ConsultaTabla;
          ListarTabla(ConsultaTabla+"/"+Campos,form); 
        }
        
        
     
      
},[filtro])

    let columns=[];
    let keytable ="";

    if(datosTabla.length> 0){
   
        let arrayKeys= Object.keys(datosTabla[0]);
        let i =0;
        for (let value of arrayKeys) {
          if (i ===0){
           keytable= value;
          }
         columns[i]= { id: value , label: value , numeric: false, disablePadding: false },
           i++;
        
        }
        } 
        ConsultaTabla= ConsultaTabla2 + ordent;

   
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("1");
  const [selected, setSelected] = React.useState([]);

  const [Ordenar, setOrdenar] = React.useState([]);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = datosTabla &&  datosTabla.map(n => n.name);
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

    let x1= rowsPerPage*newPage +1;
 
    if(x1===1){
     x1=0;
    }
   if (Ordenar.length >0){
    //ConsultaTabla=Ordenar;
   }
   let x2= rowsPerPage;
   x1=x1-1
   x1 = x1<0 ? 0: x1
    ConsultaTabla=x2+"/"+x1;
    let inputBuscar= document.getElementById('Buscar');
    if(inputBuscar.value!=""){
      if(filtro!= ""  && filtro != undefined){
        ConsultaTabla=filtro +"|"+CodUrl(inputBuscar.value.replace(/ /g,"|"))+"/" +ConsultaTabla+ordent
      }else{
        ConsultaTabla="s"+CodUrl(inputBuscar.value.replace(/ /g,"|"))+"/" +ConsultaTabla+ordent
      }
     
    }else{
      if(filtro!= ""  && filtro != undefined){
        ConsultaTabla= filtro + "/"+ ConsultaTabla+ordent
      }else{
        ConsultaTabla= ConsultaTabla+ordent
      }
     
    }
  
   
    ListarTabla(ConsultaTabla+"/"+Campos);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    let x1=0;
    
    if (Ordenar.length >0){
     // ConsultaTabla=Ordenar;
     }
     let inputBuscar= document.getElementById('Buscar');
     ConsultaTabla= event.target.value+"/"+x1;
     if(inputBuscar.value!=""){
       if(filtro!= ""  && filtro != undefined){
        ConsultaTabla=filtro+"|"+CodUrl(inputBuscar.value.replace(/ /g,"|"))+ "/"+ ConsultaTabla+ordent;
       }else{
        ConsultaTabla="s"+CodUrl(inputBuscar.value.replace(/ /g,"|"))+ "/"+ ConsultaTabla+ordent;
       }
      
     }else{
      if(filtro!= ""  && filtro != undefined){
        ConsultaTabla= filtro + "/"+ ConsultaTabla+ordent
      }else{
        ConsultaTabla= ConsultaTabla+ordent
      }
    
     }
    

  
  ListarTabla(ConsultaTabla+"/"+Campos);
    
  };

  

   
  const onclinkID = (e, ID,row)=>{
    window.scroll(0,0)

    BuscarCampo(e,search);
    if(camposFn){
      if(camposFn[ID]){
        camposFn[ID](row)
      }
    }

  }
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
   fullWidth
   onKeyUp = {(e)=>TextBuscar_Onkey(e, ListarTabla,setPage,Campos,filtro )}
     title="Buscar "/>
        <TableContainer className={classes.container}>
          <Table size="small" className={classes.table} stickyHeader aria-labelledby="tableTitle">
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
              ListarTabla={ListarTabla}
              handleOrdenar={handleOrdenar}
              setPage={setPage}
              Campos= {Campos}
              filtro ={filtro}
            />
            <TableBody>
            { datosTabla && datosTabla.map((row) => {
              return (
                <TableRow hover role="button" style= {{cursor:'pointer'}}  tabIndex={row[keytable]} key={row[keytable]}>
                  {columns.map((column) => {
                    const value = row[column.id];
                   if (column.id===keytable){
                    return (
                      <TableCell   style={{ whiteSpace: 'nowrap'}} key={column.id} align={column.align} className="td" ><Link  href="#" to="#" onClick={(e)=>onclinkID(e,column.id,row)}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                        </Link></TableCell>
                    );
                   }else{
                    if(camposFn && camposFn[column.id]){
                      return (
                        <TableCell   style={{ whiteSpace: 'nowrap'}} key={column.id} align={column.align} className="td" ><Link  href="#" to="#" onClick={()=>camposFn[column.id](value)}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                          </Link></TableCell>
                      );
                    }else{
                      if(column.id === "QR"){
                        return (
                          <TableCell style={{ whiteSpace: 'nowrap'}} key={column.id} align={column.align}  >
                           
                           'Hola'
                       
                            </TableCell>
                        );
                      }else{
                        return (
                          <TableCell role="button"  onClick={(e)=>onclinkID({target:{innerHTML:row[keytable]},preventDefault:()=>{}},row[keytable],row)}style={{ whiteSpace: 'nowrap'}} key={column.id} align={column.align}  >
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                        );
                      }
                      }
                     
                    
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
