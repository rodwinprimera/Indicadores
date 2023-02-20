// Dependencies
import { combineReducers } from 'redux';
// Shared Reducers
import device from './deviceReducer';
// Apps Reducers 
import Indicadores from '../containers/Indicadores/ReducerIndicadores';
const rootReducer = combineReducers({
  device,
  Indicadores
});

export default rootReducer;
