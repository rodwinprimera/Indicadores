// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './components/App';
import About from './components/About';
import Page404 from './components/Page404';

// Container
import Indicadores from './containers/Indicadores';
const AppRoutes = () =>
  <App>
    <Switch>
      <Route exact path="/about" component={About} />
      <Route exact path="/Indicadores" component={Indicadores} />
      Indicadores
      <Route component={Page404} />
    </Switch>
  </App>;

export default AppRoutes;
