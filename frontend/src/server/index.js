// Dependencies
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import open from 'open';
import exphbs from 'express-handlebars'; // sirve para obtener vistas del lado del servidor


function obtener(sql) {
  return new Promise((resolve, reject) => {
    
  
    
      conexion.query(sql,
          (err, resultados) => {
              if (err) reject(err);
              else resolve(resultados);
          });
  });
}

var body_parser = require('body-parser');
// se puede mandar variables a nuestro tempeny
// Config
import config from '../config';

// Webpack Configuration
import webpackConfig from '../../webpack.config.babel';

// API

import conexion from './views/ModeloMysql/conexion';

import ColsultasSql from './views/ModeloMysql/ObjDb';
// Helpers
import * as hbsHelper from '../lib/handlebars';

// Utils
import { isMobile } from '../lib/utils/device'; // detecta si es una pantalla pequeña

// Environment
const isDevelopment = process.env.NODE_ENV !== 'production';

// Express app
var cors = require('cors')
const app = express();
app.use(cors())


app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json())
// Public
app.use(express.static(path.join(__dirname, '../public')));

// Handlebars setup
app.engine(config.views.engine, exphbs({
  extname: config.views.extension,
  helpers: hbsHelper
}));

// View Engine Setup
app.set('views', path.join(__dirname, config.views.path));
app.set('view engine', '.hbs');

// Webpack Compiler
const webpackCompiler = webpack(webpackConfig);

if (isDevelopment) {
  app.use(webpackDevMiddleware(webpackCompiler));
  app.use(webpackHotMiddleware(webpackCompiler));
}

// Device detector
app.use((req, res, next) => {
  res.locals.isMobile = isMobile(req.headers['user-agent']);

  return next();
});

// API dispatch

app.post('/ProcesarPost', function (req, res) {
  ColsultasSql.GetConsulta(req.body,res);

});
// Sending all the traffic to React
app.get('*', (req, res) => {
  res.render('frontend/index', {
    layout: false
  });
});

// Listen port 3000
app.listen(config.serverPort, err => {
  if (!err) {
    open(`${config.baseUrl}`);
  }
});
