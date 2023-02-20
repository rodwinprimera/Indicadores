<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class IndicadoresCtr extends MY_Controller {

  public function __construct($config = 'rest')
  {
    // Damos acceso para que pueda acceptar peticiones desde distintos origenes
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    header('content-type: application/json; charset=utf-8');
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }
      parent::__construct();
  
   
  }
  public function _remap($enpont,$parametros = array()){

  $method = $_SERVER['REQUEST_METHOD'];
 
 switch ($enpont)  
 { case 'Buscar1':
     $this->Buscar1($parametros); 
     break;
   case 'Buscar2': 
     $this->Buscar2($parametros);   
   break;
   case 'Buscar3': 
     $this->Buscar3($parametros); 
   break; 
   case 'Buscar4': 
    $this->Buscar4($parametros);
   break; 
   case 'Buscar5': 
    $this->Buscar5($parametros);
   break; 
   case "MetaData":
    $this->MetaData($parametros);
   break;

 }
 if($enpont ==="index"){

  switch ($method)  
  { case 'PUT':
      $this->Edit(); 
    break;
    case 'POST': 
      $this->Add();
    break;
    case 'GET': 
      $this->Search($parametros);
 break;
    case 'HEAD': 
      // echo json_encode( $method );
    break; 
    case 'DELETE': 
      $this->Delete($parametros); 
    break; 
    case 'OPTIONS': 
     // echo json_encode( $method );
   break; 
   default: 
   echo json_encode( "Error" );
   break; 
  }
}


 }
private function Add(){
  $Datos = count($_POST) ===0 ? $this->input->raw_input_stream :  $this->input->post();
  if(is_string($Datos) ===true){
    $Datos =  json_decode($Datos, true);
  }

    $Indicadoreses= $this->IndicadoresModels->Add($Datos);

  header('Content-type: application/json; charset=utf-8');
  echo json_encode($Indicadoreses);
}
     
private function Edit(){
  $Datos = $this->input->raw_input_stream;
  if(is_string($Datos) ===true){
    $Datos =  json_decode($Datos, true);
  }
  $Indicadoreses= $this->IndicadoresModels->Edit($Datos);
  header('Content-type: application/json; charset=utf-8');
  echo json_encode($Indicadoreses);
    
}

private function Delete($ID ){
  $Indicadoreses= $this->IndicadoresModels->Delete($ID[0]);
  header('Content-type: application/json; charset=utf-8');
  echo json_encode($Indicadoreses);
}

// aqui viene los metodos de buscar



private function Search($Arr =array() ){
  $Indicadoreses =array();
  switch (count($Arr)) 
  { case 0:
    $Indicadoreses= $this->IndicadoresModels->getIndicadores();
    break;
    case 1: 
      $Indicadoreses = $this->IndicadoresModels->getIndicadores($Arr[0]);
    break;
    case 2: 
      $Indicadoreses = $this->IndicadoresModels->getIndicadoresLimite($Arr[0],$Arr[1]);
    break; 
    case 4: 
      $Indicadoreses = $this->IndicadoresModels->getIndicadoresLimiteOrden($Arr[0],$Arr[1],$Arr[2],$Arr[3]);
    break; 
    case 5: 
      $Indicadoreses = $this->IndicadoresModels->getIndicadoresLimiteOrdenColumnas($Arr[0],$Arr[1],$Arr[2],$Arr[3],urldecode($Arr[4]));
   break; 
   default: 
   echo json_encode( "Error" );
   break; 
  }
  header('Content-type: application/json; charset=utf-8');
  echo json_encode($Indicadoreses); 
}

private function Buscar1 ($Arr = array()){
  $Indicadoreses =array();
  switch (count($Arr)) 
  {
    case 1: 
      $Indicadoreses = $this->IndicadoresModels->getIndicadoresFiltro(urldecode($Arr[0]));
    break;
    case 3: 
      $Indicadoreses = $this->IndicadoresModels->getIndicadoresFiltroLimite(urldecode($Arr[0]),$Arr[1],$Arr[2]);
    break; 
    case 5: 
      $Indicadoreses = $this->IndicadoresModels->getIndicadoresFiltroLimiteOrden(urldecode($Arr[0]),$Arr[1],$Arr[2],$Arr[3],$Arr[4]);
   break; 
   case 6: 
    $Indicadoreses = $this->IndicadoresModels->getIndicadoresFiltroLimiteOrdenColumnas(urldecode($Arr[0]),$Arr[1],$Arr[2],$Arr[3],$Arr[4],urldecode($Arr[5]));
    break; 
   default: 
   echo json_encode( $Arr );
   break; 
  }
  header('Content-type: application/json; charset=utf-8');
  echo json_encode($Indicadoreses); 
  
}
private function Buscar2 ($Arr =array()){
  $Indicadoreses =array();
  $Indicadoreses = $this->IndicadoresModels->getIndicadoresFiltroColumnas(urldecode($Arr[0]),urldecode($Arr[1]));
  header('Content-type: application/json; charset=utf-8');
  echo json_encode($Indicadoreses); 
}

private function Buscar3 ($Arr =array()){
  $Indicadoreses =array();
    $Indicadoreses= $this->IndicadoresModels->  getIndicadoresIdColum($Arr[0],urldecode($Arr[1]));
  header('Content-type: application/json; charset=utf-8');
  echo json_encode($Indicadoreses); 
}
private function Buscar4 ($Arr = array()){
  $Indicadoreses =array();
    $Indicadoreses= $this->IndicadoresModels->getIndicadoresLimiteColum($Arr[0],$Arr[1],urldecode($Arr[2]));
  header('Content-type: application/json; charset=utf-8');
  echo json_encode($Indicadoreses); 
}
private function Buscar5 ($Arr =  array()){
  $Indicadoreses =array();
  $Indicadoreses = $this->IndicadoresModels->getIndicadoresFiltroLimitesColumnas(urldecode($Arr[0]),$Arr[1],$Arr[2],urldecode($Arr[3]));
  header('Content-type: application/json; charset=utf-8');
  echo json_encode($Indicadoreses); 

}

private function MetaData(){
  $Indicadoreses =array();
  $Indicadoreses = $this->IndicadoresModels->MetaData();
  header('Content-type: application/json; charset=utf-8');
  echo json_encode($Indicadoreses); 
}

    protected function middleware()
    {
      return [];
    }

	
}