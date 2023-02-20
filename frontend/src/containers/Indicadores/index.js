import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CajadeTexto from '../../components/general/CajadeTexto';
import Tabla2 from '../../components/general/Tabla2';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles } from '@material-ui/styles';
import { withWidth } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Mensaje2 from '../../components/general/Mensaje2'
import InputFechas from '../../components/general/InputFechas'
import BtnIncluir from '../../components/general/BtnIncluir';
import BtnListar from '../../components/general/BtnListar';
import BtnLimpiar from '../../components/general/BtnLimpiar';
import BtnModificar from '../../components/general/BtnModificar';
import BtnEliminar from '../../components/general/BtnEliminar';
// Actions
import * as actions from './actions';
//import items from '../../data/menu';
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 2,
    height: '60vh',
  },
  paper2: {
    padding: 2,
    textAlign: 'center',
    height: '5vh',
  },
  paginacion: {
    position: 'absolute',
    border: '1px solid #CCC',
    padding: ' .5em',
    width: '20%',
    height: '8%',
    left: ' 250px',
    top: '110px',
    overflow: 'hidden',
    float: "left",
    clear: 'left',
    display: 'block',
    opacity: '0',
  },
  Contentxs: {
    width: '100%',
    margin: '0 auto',
	height: '100%',
	align:'center',
	backgroundColor: 'white',
	WebkitBoxShadow: '7px 8px 12px -4px rgba(20,33,117,0.68)',
MozBoxShadow: '7px 8px 12px -4px rgba(20,33,117,0.68)',
boxShadow: '7px 8px 12px -4px rgba(20,33,117,0.68)',

  },
  Contentnormal: {
    width: '70%',
    margin: '0 auto',
	height: '100%',
	align:'center',
	backgroundColor: 'white',
	WebkitBoxShadow: '7px 8px 12px -4px rgba(20,33,117,0.68)',
MozBoxShadow: '7px 8px 12px -4px rgba(20,33,117,0.68)',
boxShadow: '7px 8px 12px -4px rgba(20,33,117,0.68)',

  }


});



class Home extends Component {
  static propTypes = {
    isMobile: PropTypes.bool,
    FormGeneral: PropTypes.object,
    Cajachange: PropTypes.func,
    Buttonclick: PropTypes.func,
    Limpiar: PropTypes.func,
    ListarTabla: PropTypes.func,
    search: PropTypes.func,
    SelectOnchange: PropTypes.func,
  };

  constructor() {
    super();
    this.poli = false;
  }
  componentDidMount() {
    
 
  }
  render() {
    const { classes } = this.props;
    const { FormGeneral,SetMeta, Fechaschange } = this.props;
    const { Cajachange } = this.props;
    const { Limpiar } = this.props;
    const { search } = this.props;
    const { ListarTabla } = this.props;
    const { width } = this.props;
    const {SetMensaje } = this.props;
   
    if (FormGeneral.CajasDeTexto === null){
      SetMeta();
      return (
        <div>
          Cargando...
        </div>
      )
    }
    if (FormGeneral.CajasDeTexto === "Cargando"){
      return (
        <div>
          Cargando...
        </div>
      )
    }



    let ConsultaTabla="10/0";
    let Botones = FormGeneral.Commands.map(el=>el)


    return (
      <div  className={width === "sm" || width === "xs" ?classes.Contentxs :classes.Contentnormal}>
        <Grid container 

          alignItems="center"
          justify="center"
          style={{ minHeight: '30vh' }}>

          <Grid container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid
              item xs={12} sm={12} md={12} lg={12} xl={12} >
              <h2 className = "hcolro"  >{ "Indicadores" }</h2>
          
            </Grid>
          </Grid>

  
          <Grid className={classes.root} container 
            direction="column"
            alignItems="center"
            justify="center"
            >
            <Grid

              container
              direction="row"

              alignItems="stretch"
              item xs={10}>
              {
              
                FormGeneral.CajasDeTexto != null
                  ? Object.keys(FormGeneral.CajasDeTexto).map((j, key) => (
                    <Grid key={j} item xs={12} sm={6} md={6} lg={4} xl={4}  >
                       <CajadeTexto 
                         id = {j}
                         name = {FormGeneral.CajasDeTexto[j].name} 
                         value ={FormGeneral.CajasDeTexto[j].value} 
                         CajaOnchange = {Cajachange} 
                         tipo ={FormGeneral.CajasDeTexto[j].Tipo}  
                         disabled={FormGeneral.CajasDeTexto[j].disabled}
                         len={FormGeneral.CajasDeTexto[j].len}
                         search = {search}
                         form = {FormGeneral.General.Name}
                         primary = {FormGeneral.CajasDeTexto[j].primary}
                         type ={FormGeneral.CajasDeTexto[j].type}
                         formTope = {FormGeneral.General.formTope}
                         Separador= {FormGeneral.Separador}
                         necessary = {FormGeneral.CajasDeTexto[j].necessary}
                         /> 
                    </Grid>
                   
                  ))
                  : ''
              }

              
            
            </Grid>
          </Grid>

          <Grid container 
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '30vh' }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
            <ButtonGroup size="small" orientation=  {width==='xs' ? 'vertical' : 'horizontal'} variant="contained" color="primary" aria-label="contained primary button group">
            <BtnIncluir  
                  Limpiar ={Limpiar}
                  formArr={FormGeneral}
                  disabled={Botones[0].disabled}
                  SetMensaje = {SetMensaje}
            />
            <BtnListar  
                 ListarTabla ={ListarTabla}
                 consulta = {"10/0/"+FormGeneral.Campos}
                disabled={Botones[1].disabled}
            />
             <BtnLimpiar
                onClick = {()=>Limpiar()}
                disabled={Botones[2].disabled}
            />
             <BtnModificar
                Limpiar ={Limpiar}
                formArr={FormGeneral}
                disabled={Botones[3].disabled}
                SetMensaje = {SetMensaje}
                Code={FormGeneral.Cod}
            />
             <BtnEliminar
                Limpiar ={Limpiar}
                formArr={FormGeneral}
                disabled={Botones[3].disabled}
                SetMensaje = {SetMensaje}
                Code={FormGeneral.Cod}
            />
            </ButtonGroup>
              
            </Grid>
          </Grid>

          {

            FormGeneral.General.table === true ?
            <Grid container 
            direction="column"
            justify="center"
            style={{ minHeight: '30vh' }}
          >
            
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
          <InputFechas
                        id = {'fecha'}
                        name = {'fecha'} 
                        value ={FormGeneral.fechas} 
                        CajaOnchange = {Fechaschange}   
                        disabled={false}
                        primary = {false}
                        option ={[]}
                        necessary = {false}
                        type= {'date'}
                        tipo={'a'}
                        /> 
            </Grid>  
            </Grid>        
          :null}
          {
            FormGeneral.General.table === true ? <Tabla2 datosTabla={FormGeneral.General.Datos} ListarTabla={ListarTabla} ConsultaTabla2={ConsultaTabla} Cant={FormGeneral.Total} form={FormGeneral.General.Name} search={search} formTope={FormGeneral.General.formTope} FormGeneral={FormGeneral} Campos = {FormGeneral.Campos} filtro = {FormGeneral.fechas == ''?'':'sfecha^'+FormGeneral.fechas} /> : ''
          }
        </Grid>
       
        {
          FormGeneral.Mensaje != null ?
          <Mensaje2 Mensaje = {FormGeneral.Mensaje} Open = {true} SetMensaje = {SetMensaje}/>
          :''
        }
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default connect(state => ({
  isMobile: state.device.isMobile,
  FormGeneral: state.Indicadores.formIndicadores,

}), actions)(withStyles(styles)(withWidth()(Home)));

