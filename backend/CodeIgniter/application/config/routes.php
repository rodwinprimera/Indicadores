<?php
defined('BASEPATH') OR exit('No direct script access allowed');
// los Router son las rutas que vamos a colocar en el navegador para acceder a las funcionalidades
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/


$route['default_controller'] = 'welcome'; // ruta inicio 

// rutas indicadores

$route['Indicadores'] = 'IndicadoresCtr/index';// En esta ruta vamos a usar los metodos Get/post/delete/put 
// si se usa el metodo get se resuelve con todos los registros de la tabla Indicadores

// El resto de las rutas Indicadores solo aceptaran el metodo get y seran usadas para buscar informacion 

// cuando veamos (:num) signigica que estamos validando una entrada de solo numeros
// cuando veamos (:any) significa que estamos aceptando cualquier caracter
// cuando veamos $1,$2,$3...$6 significa que vamos a recibir valores en ese orden esto se recibira en forma de array()

$route['Indicadores/(:num)'] = 'IndicadoresCtr/index/$1'; // Aqui recibimos solo un valor el id del Indicador http//:codeignier/Indicadores/id 

$route['Indicadores/(:num)/(:num)'] = 'IndicadoresCtr/index/$1/$2'; // $1 cantidad, $2 la posicion
$route['Indicadores/(:num)/(:num)/(:num)/(:num)'] = 'IndicadoresCtr/index/$1/$2/$3/$4'; // $1 cantidad, $2 posicion, $3 Columna, $4 orden. 

$route['Indicadores/(:num)/(:num)/(:any)/(:num)'] = 'IndicadoresCtr/index/$1/$2/$3/$4'; // ase lo mismo que la anterior pero puedo especificar el nombre del campo a ordenar

$route['Indicadores/(:num)/(:num)/(:num)/(:num)/(:any)'] = 'IndicadoresCtr/index/$1/$2/$3/$4/$5'; // lo mismo pero se indica las tablas s0|1|2|3..etc

$route['Indicadores/(:num)/(:num)/(:any)/(:num)/(:any)'] = 'IndicadoresCtr/index/$1/$2/$3/$4/$5';  //  lo mismo pero asignando el nombre del campo a ordenar
$route['Indicadores/(:any)'] = 'IndicadoresCtr/Buscar1/$1';                                // filtrar s1^pedro|2^primera 
$route['Indicadores/(:any)/(:num)/(:num)'] = 'IndicadoresCtr/Buscar1/$1/$2/$3';            // filtrar y extraer una porcion 
$route['Indicadores/(:any)/(:num)/(:num)/(:num)/(:num)'] = 'IndicadoresCtr/Buscar1/$1/$2/$3/$4/$5';  // filtrar y extraer porcion ordenada 
$route['Indicadores/(:any)/(:num)/(:num)/(:any)/(:num)'] = 'IndicadoresCtr/Buscar1/$1/$2/$3/$4/$5';
$route['Indicadores/(:any)/(:num)/(:num)/(:num)/(:num)/(:any)'] = 'IndicadoresCtr/Buscar1/$1/$2/$3/$4/$5/$6'; // filtrar, extraer porcion ordenadas + columna
$route['Indicadores/(:any)/(:num)/(:num)/(:any)/(:num)/(:any)'] = 'IndicadoresCtr/Buscar1/$1/$2/$3/$4/$5/$6';
$route['Indicadores/(:any)/(:num)/(:num)/(:any)/(:num)/(:any)'] = 'IndicadoresCtr/Buscar1/$1/$2/$3/$4/$5/$6';
$route['Indicadores/(:num)/(:any)'] = 'IndicadoresCtr/Buscar3/$1/$2';                     // registro por id y selecciona algunas columnas
$route['Indicadores/(:any)/(:any)'] = 'IndicadoresCtr/Buscar2/$1/$2';                     // filtrar y seleciona columnas
$route['Indicadores/(:num)/(:num)/(:any)'] = 'IndicadoresCtr/Buscar4/$1/$2/$3';          // porcion seleccionando columnas
$route['Indicadores/(:any)/(:num)/(:num)/(:any)'] = 'IndicadoresCtr/Buscar5/$1/$2/$3/$4';// filtra luego saca una porcion y selecciona las columnas
$route['IndicadoresExcel'] = 'IndicadoresCtr/ExportExcel';
$route['IndicadoresMeta'] = 'IndicadoresCtr/MetaData';


/** nota las columnas se de la base de datos se identifican por su posicion 
 * si es 0 indica el id, si es 1 el nombre etc
 * 
  */
//esto va al final
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;