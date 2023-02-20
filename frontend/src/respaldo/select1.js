import React, {Component} from 'react';
import PropsTypes from 'prop-types';
import Inquiries from './api';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/styles';
const styles = theme => ({
  root: {
     '& > *': {
      margin: 8,
      width: '25ch',
    },
  }
});
class  select1 extends Component{
  static PropsTypes= {
    classes: PropsTypes.object.isRequired,
    id: PropsTypes.string.isRequired,
    name: PropsTypes.string.isRequired,
    value: PropsTypes.string.isRequired,
    disabled: PropsTypes.bool.isRequired,
    date: PropsTypes.string.isRequired,
    option: PropsTypes.object.isRequired,
    SelectOnchange: PropsTypes.func.isRequired,
  };

    constructor(props) {
        super(props);
        
       
      }

      componentDidMount(){
        const { id, value, date, filter } = this.props
        
        if(date!== ""){
          if(filter===""){
           var obj= {"petition":"Buscar","place":date,  "Datos":[0,1] , "Ordenar":[1,1], "Cant":"No"}
          }else{
            var obj= {"petition":"Buscar","place":date,"filter":filter,  "Datos":[0,1] , "Ordenar":[1,1], "Cant":"No"}
          }
        const x=  Inquiries.Query(obj)
          x.then((x)=>{
          var select = document.getElementById(id);
          var opt = document.createElement('option');
                 opt.name=""
                 opt.value = "";
                 opt.innerHTML = "";
                 select.appendChild(opt);
              x.map((j,k)=>{
               
                 opt = document.createElement('option');
                 opt.name="12"
                 opt.value = j.Código;
                 opt.innerHTML = j.Tienda;
                 select.appendChild(opt);
                 })
           select.value= value;
         },
         ()=>{
          alert('error con el servidor')
         });
        }
      }
    
    render(){

      const { classes } = this.props;
      const { id, name ,value, SelectOnchange ,disabled, option } = this.props
      
      if(value===""){
        return(
          <div className="form-group">
          <FormControl className={classes.root}
          
          >
          <InputLabel htmlFor="age-native-simple">{id}</InputLabel>
          <Select 
           native
          value={value}
          onChange = { (e) =>SelectOnchange(e) }
          disabled={disabled}
        
            name= {name}
            id= {id}
          
           >
          {
            
              Object.keys(option).map((j,key) =>(
              
                <option key = {key} value ={j} > 
                { option[j] }    
                </option>
            ))
          }
          
          </Select>
          
          </FormControl>

          </div>
        );
      }else{
        return(
          <div className="form-group">
          <FormControl className={classes.root}
          
          >
          <InputLabel htmlFor="age-native-simple"
            shrink= {true}
          >{id}</InputLabel>
          <Select 
           native
          value={value}
          onChange = { (e) =>SelectOnchange(e) }
          disabled={disabled}
        
            name= {name}
            id= {id}
          
           >
          {
            
              Object.keys(option).map((j,key) =>(
              
                <option key = {key} value ={j} > 
                { option[j] }    
                </option>
            ))
          }
          
          </Select>
          
          </FormControl>

          </div>
        );

      }

        
    }
}



export default withStyles(styles)(select1);