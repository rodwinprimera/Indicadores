<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class IndicadoresModels extends CI_Model
{
    private $Tabla = "indicadores"; 
    private $Delimitador= "|";
    private $Separador = "^";
    private $CamposInternos = ['Status'=>'Status', 'id'=>'id','fecha'=>'fecha'];
    private $Select =  [];
    private $SoloLetras = [];
    private $CamposNecesarios = ['nombre'=>'nombre', 'codigo'=>'codigo',
    'unidadMedida'=>'unidadMedida','valor'=>'valor'];
    // recibe una cadena y entrega un array con los filtros a apicar
  private function Filtros($Filtros){
        $Filtros= str_replace('ø','/',$Filtros);
       
        $arr1 = explode($this->Delimitador,$Filtros);
        $array_num = count($arr1);
        for ($i = 0; $i < $array_num; ++$i){
           
            $posicion_coincidencia = strpos($arr1[$i], $this->Separador);
            if(  $posicion_coincidencia != FALSE ){
              $Array2 = explode($this->Separador,$arr1[$i]);
              $Array2[0]= $this->columna($Array2[0]);
            
             
                
               
                
              
              $arr1[$i] =  $Array2;
              $posicion_coincidencia = strpos( $Array2[1], ',');

              if($posicion_coincidencia === false ){
               
              }else{
             
                 
                $Fechas =  explode(',',$Array2[1]);

                if(count($Fechas) ===2 and $Fechas[1] != ''){
                    $this->db->where($Array2[0]." BETWEEN '".$Fechas[0]."' AND '".$Fechas[1]."'", NULL, FALSE );
                    
                 
                    unset($arr1[$i]);
                 
                }
                
              }
              

             
            }else {
                $arr1[$i]= array("Todo", $arr1[$i]);
            }
        }
        $arr1 = array_values($arr1);
   
       return  $arr1;
    }

   
    private  function columna($id = null,$Mascara = false){
        $fields = $this->db->list_fields($this->Tabla);
        if($id === null){
          
            $array_num = count($fields);
            for ($i = 0; $i < $array_num; ++$i){
                $fields[$i] =  $fields[$i]. " AS ". $this->Mascara($fields[$i]);
            }
            return $fields;

        }

        if(is_numeric($id)===false){
            $array_num = count($fields);
            for ($i = 0; $i < $array_num; ++$i){
                if($id === $fields[$i] ||  $this->Mascara($fields[$i]) === $id ){
                    if($Mascara=== false){
                        return $fields[$i];
                    }else{
                        return $fields[$i]. " AS ". $this->Mascara($fields[$i]);
                    }
                  
                }
              
            }
            return $fields[0];
        }else{

       

        if($Mascara === false){
            if(intval($id) < count($fields) && intval($id) > 0 ){
                return  $fields[intval($id)];
              }else{
                return $fields[0];
              }
        }else{
            if(intval($id) < count($fields) && intval($id) > 0 ){
                return  $fields[intval($id)]. " AS ". $this->Mascara($fields[intval($id)]);
              }else{
                return $fields[0]. " AS ". $this->Mascara($fields[0]);
              }        
        }
    }
       
    }
    private function Columnas($col = null,$Mascara = false){
          if($col=== null){
           $Arra =  $this->columna(null);
           return $Arra;
          }

        $Colu = substr($col, 1);
        $posicion_coincidencia = strpos($Colu, $this->Delimitador);
        if(  $posicion_coincidencia === FALSE ){
            $arr1 = str_split($Colu);
        }else{
            $arr1 = explode($this->Delimitador,$Colu);
        }
     
        $array_num = count($arr1);
        for ($i = 0; $i < $array_num; ++$i){
            $arr1[$i] =  $this->columna($arr1[$i],$Mascara);
        }
        return $arr1;
    }
    public function getIndicadores($id=NULL)
    {
       
       if ($id === NULL){
        $this->db->select($this->Columnas());
        return  $this->db->get_where($this->Tabla,array("Status"=>"Activo"))->result();
       }else{
           $Columna = $this->columna(0);
           $this->db->select($this->Columnas());
        return  $this->db->get_where($this->Tabla,array("$Columna"=>$id))->result();
       }
       
    }
    public function getIndicadoresLimite($Canti,$Desde){
        $this->db->select($this->Columnas());
        
        return  $this->db->get_where($this->Tabla,array("Status"=>"Activo"),$Canti,$Desde)->result();
    }
    public function getIndicadoresLimiteOrden($Canti,$Desde,$Columna,$Orden){
        $Direccion ="Error en el Orden";
        $Direccion = $Orden ==="0" ? "ASC" :   $Direccion;
        $Direccion = $Orden ==="1" ? "DESC" :   $Direccion;
     
        if($Direccion ==="Error en el Orden" ) 
        {
            return array("Error"=> $Direccion);
        }
        $this->db->select($this->Columnas());
        $this->db->order_by($this->columna($Columna), $Direccion);
        return  $this->db->get_where($this->Tabla,array("Status"=>"Activo"),$Canti,$Desde)->result();
    }
    public function getIndicadoresLimiteOrdenColumnas($Canti,$Desde,$Columna,$Orden,$Columnas){
        $Direccion ="Error en el Orden";
        $Direccion = $Orden ==="0" ? "ASC" :   $Direccion;
        $Direccion = $Orden ==="1" ? "DESC" :   $Direccion;
        if($Direccion ==="Error en el Orden" ) 
        {
            return array("Error"=> $Direccion);
        }
        
       
     
        $this->db->select($this->Columnas($Columnas,true));
        $this->db->order_by($this->columna($Columna), $Direccion);
        return  $this->db->get_where($this->Tabla,array("Status"=>"Activo"),$Canti,$Desde)->result();
    }
    public function getIndicadoresIdColum($id,$Columnas){
  
        $this->db->select($this->Columnas($Columnas,true));
        $Columna = $this->columna(0);
        return  $this->db->get_where($this->Tabla,array("Status"=>"Activo", "$Columna"=>$id))->result();
    }
    public function getIndicadoresLimiteColum($Canti,$Desde,$Columnas){
        $this->db->select($this->Columnas($Columnas,true));
        return  $this->db->get_where($this->Tabla,array("Status"=>"Activo"),$Canti,$Desde)->result();
    }
    public function getIndicadoresFiltro($Filtros){
        $Filtro = substr($Filtros, 1);
        $cont = 0;
      $arrayconsulta=  $this->Filtros($Filtro);
      $this->db->where('Status',"Activo" ); 
      $array_num = count($arrayconsulta);
        for ($i = 0; $i < $array_num; ++$i){
           if($arrayconsulta[$i][0] != "Todo"){
            $this->db->where($arrayconsulta[$i][0],$arrayconsulta[$i][1]);
           }else{
            $cont++;
           }
        }
        if($cont >0){
            $fields = $this->db->list_fields($this->Tabla);
            $poli=false;
            for ($i = 0; $i < $array_num; ++$i){
            if($arrayconsulta[$i][0] === "Todo"){
                 for($e =0 ; $e <count( $fields)-1; ++$e )
                 {
                if( $poli===false){
                    $this->db->like('('.$fields[$e],$arrayconsulta[$i][1] );
                    $poli= true; 
                }else{ 
                    $this->db->or_like($fields[$e],$arrayconsulta[$i][1]);
                }
            }
            $this->db->or_where($fields[count( $fields)-1].' LIKE',"'%".$arrayconsulta[$i][1]."%')",false );
            $this->db->like('('."Status",$arrayconsulta[$i][1] );
               }
            }
            $this->db->or_where('Status =',"'Activo')",false ); 
        }
      
        $this->db->select($this->Columnas());
     return  $this->db->get($this->Tabla)->result();
      
    }
    private function total(){
        $this->db->select("count(*) As Total");
        return  $this->db->get($this->Tabla)->result();
    }
    public function getIndicadoresFiltroLimite($Filtros,$Canti,$Desde){
        $Filtro = substr($Filtros, 1);
        $cont = 0;
      $arrayconsulta=  $this->Filtros($Filtro);
      $this->db->where('Status',"Activo" ); 
      $array_num = count($arrayconsulta);
        for ($i = 0; $i < $array_num; ++$i){
           if($arrayconsulta[$i][0] != "Todo"){
            $this->db->where($arrayconsulta[$i][0],$arrayconsulta[$i][1]);
           }else{
            $cont++;
           }
        }
        if($cont >0){
            $fields = $this->db->list_fields($this->Tabla);
            $poli=false;
            for ($i = 0; $i < $array_num; ++$i){
            if($arrayconsulta[$i][0] === "Todo"){
                 for($e =0 ; $e <count( $fields)-1; ++$e )
                 {
                if( $poli===false){
                    $this->db->like('('.$fields[$e],$arrayconsulta[$i][1] );
                    $poli= true; 
                }else{ 
                    $this->db->or_like($fields[$e],$arrayconsulta[$i][1]);
                }
            }
            $this->db->or_where($fields[count( $fields)-1].' LIKE',"'%".$arrayconsulta[$i][1]."%')",false );
            $this->db->like('('."Status",$arrayconsulta[$i][1] );
               }
            }
            $this->db->or_where('Status =',"'Activo')",false ); 
        }
      
        $this->db->select($this->Columnas());
     return  $this->db->get($this->Tabla,$Canti,$Desde)->result();
      
    }
    public function getIndicadoresFiltroLimiteOrden($Filtros,$Canti,$Desde,$Columna,$Orden){
        $Filtro = substr($Filtros, 1);
        $cont = 0;
      $arrayconsulta=  $this->Filtros($Filtro);
      $this->db->where('Status',"Activo" ); 
      $array_num = count($arrayconsulta);
        for ($i = 0; $i < $array_num; ++$i){
           if($arrayconsulta[$i][0] != "Todo"){
            $this->db->where($arrayconsulta[$i][0],$arrayconsulta[$i][1]);
           }else{
            $cont++;
           }
        }
        if($cont >0){
            $fields = $this->db->list_fields($this->Tabla);
            $poli=false;
            for ($i = 0; $i < $array_num; ++$i){
            if($arrayconsulta[$i][0] === "Todo"){
                 for($e =0 ; $e <count( $fields)-1; ++$e )
                 {
                if( $poli===false){
                    $this->db->like('('.$fields[$e],$arrayconsulta[$i][1] );
                    $poli= true; 
                }else{ 
                    $this->db->or_like($fields[$e],$arrayconsulta[$i][1]);
                }
            }
            $this->db->or_where($fields[count( $fields)-1].' LIKE',"'%".$arrayconsulta[$i][1]."%')",false );
            $this->db->like('('."Status",$arrayconsulta[$i][1] );
               }
            }
            $this->db->or_where('Status =',"'Activo')",false ); 
        }
        $Direccion ="Error en el Orden";
        $Direccion = $Orden ==="0" ? "ASC" :   $Direccion;
        $Direccion = $Orden ==="1" ? "DESC" :   $Direccion;
        if($Direccion ==="Error en el Orden" ) 
        {
            return array("Error"=> $Direccion);
        }
        
       
     
        $this->db->select($this->Columnas());
     $this->db->order_by($this->columna($Columna), $Direccion);
     return  $this->db->get($this->Tabla,$Canti,$Desde)->result();
      
    }
    public function getIndicadoresFiltroLimiteOrdenColumnas($Filtros,$Canti,$Desde,$Columna,$Orden,$Columnas){
        $Filtro = substr($Filtros, 1);
        $cont = 0;
      $arrayconsulta=  $this->Filtros($Filtro);
      $this->db->where('Status',"Activo" ); 
      $array_num = count($arrayconsulta);
        for ($i = 0; $i < $array_num; ++$i){
           if($arrayconsulta[$i][0] != "Todo"){
            $this->db->where($arrayconsulta[$i][0],$arrayconsulta[$i][1]);
           }else{
            $cont++;
           }
        }
        if($cont >0){
            $fields = $this->db->list_fields($this->Tabla);
            $poli=false;
            for ($i = 0; $i < $array_num; ++$i){
            if($arrayconsulta[$i][0] === "Todo"){
                 for($e =0 ; $e <count( $fields)-1; ++$e )
                 {
                if( $poli===false){
                    $this->db->like('('.$fields[$e],$arrayconsulta[$i][1] );
                    $poli= true; 
                }else{ 
                    $this->db->or_like($fields[$e],$arrayconsulta[$i][1]);
                }
            }
            $this->db->or_where($fields[count( $fields)-1].' LIKE',"'%".$arrayconsulta[$i][1]."%')",false );
            $this->db->like('('."Status",$arrayconsulta[$i][1] );
               }
            }
            $this->db->or_where('Status =',"'Activo')",false ); 
        }
        $Direccion ="Error en el Orden";
        $Direccion = $Orden ==="0" ? "ASC" :   $Direccion;
        $Direccion = $Orden ==="1" ? "DESC" :   $Direccion;
        if($Direccion ==="Error en el Orden" ) 
        {
            return array("Error"=> $Direccion);
        }
        
       
     
     $this->db->select($this->Columnas($Columnas,true));
     $this->db->order_by($this->columna($Columna), $Direccion);
     return  $this->db->get($this->Tabla,$Canti,$Desde)->result();
      
    }
    public function getIndicadoresFiltroColumnas($Filtros,$Columnas){
        $Filtro = substr($Filtros, 1);
        $cont = 0;
      $arrayconsulta=  $this->Filtros($Filtro);
      $this->db->where('Status',"Activo" ); 
      $array_num = count($arrayconsulta);
        for ($i = 0; $i < $array_num; ++$i){
           if($arrayconsulta[$i][0] != "Todo"){
            $this->db->where($arrayconsulta[$i][0],$arrayconsulta[$i][1]);
           }else{
            $cont++;
           }
        }
        if($cont >0){
            $fields = $this->db->list_fields($this->Tabla);
            $poli=false;
            for ($i = 0; $i < $array_num; ++$i){
            if($arrayconsulta[$i][0] === "Todo"){
                 for($e =0 ; $e <count( $fields)-1; ++$e )
                 {
                if( $poli===false){
                    $this->db->like('('.$fields[$e],$arrayconsulta[$i][1] );
                    $poli= true; 
                }else{ 
                    $this->db->or_like($fields[$e],$arrayconsulta[$i][1]);
                }
            }
            $this->db->or_where($fields[count( $fields)-1].' LIKE',"'%".$arrayconsulta[$i][1]."%')",false );
            $this->db->like('('."Status",$arrayconsulta[$i][1] );
               }
            }
            $this->db->or_where('Status =',"'Activo')",false ); 
        }
        $this->db->select($this->Columnas($Columnas,true));

     return  $this->db->get($this->Tabla)->result();
      
    }

    public function getIndicadoresFiltroLimitesColumnas($Filtros,$Canti,$Desde,$Columnas){
        $Filtro = substr($Filtros, 1);
        $cont = 0;
      $arrayconsulta=  $this->Filtros($Filtro);
      $this->db->where('Status',"Activo" ); 
      $array_num = count($arrayconsulta);
        for ($i = 0; $i < $array_num; ++$i){
           if($arrayconsulta[$i][0] != "Todo"){
            $this->db->where($arrayconsulta[$i][0],$arrayconsulta[$i][1]);
           }else{
            $cont++;
           }
        }
        if($cont >0){
            $fields = $this->db->list_fields($this->Tabla);
            $poli=false;
            for ($i = 0; $i < $array_num; ++$i){
            if($arrayconsulta[$i][0] === "Todo"){
                 for($e =0 ; $e <count( $fields)-1; ++$e )
                 {
                if( $poli===false){
                    $this->db->like('('.$fields[$e],$arrayconsulta[$i][1] );
                    $poli= true; 
                }else{ 
                    $this->db->or_like($fields[$e],$arrayconsulta[$i][1]);
                }
            }
            $this->db->or_where($fields[count( $fields)-1].' LIKE',"'%".$arrayconsulta[$i][1]."%')",false );
            $this->db->like('('."Status",$arrayconsulta[$i][1] );
               }
            }
            $this->db->or_where('Status =',"'Activo')",false ); 
        }
        $this->db->select($this->Columnas($Columnas,true));

     return  $this->db->get($this->Tabla,$Canti,$Desde)->result();
      
    }
   
// desde aqui comianza la configuracion

    private function Mascara($Clave){
$ArrayIndicadores["codigo"]= utf8_encode('código');
if (isset($ArrayIndicadores[$Clave])){
return $ArrayIndicadores[$Clave];
}else{
return $Clave;
}
}

    private function verificarExistencia($dato,$Array)
    {
        $array_num = count($Array);
        for ($id = 0; $id < $array_num; ++$id){
            if($Array[$id]["nombre"] == $dato){
              return $id;
            }
        }
        return false;
    }
private function validar($Datos){
    $meta = $this->MetaData(false);
    $ArrayDatos = array();
    while (current($Datos)!==false) {
        $verificar = current($Datos);
        if(is_numeric(key($Datos))===false){
            $clave=  $this->verificarExistencia(key($Datos),$meta);
            if ($clave=== false){
                return false;
            }
        }else{
            $clave = intval(key($Datos));
        }
        
        if (!isset($meta[$clave])){
            end($Datos);
            return false;
        }else{
        if (intval($meta[$clave]["len"]) < strlen($verificar) && $meta[$clave]["len"]!= null ){
            end($Datos);
            return false;
        } 

        }
        $ArrayDatos[$meta[$clave]["nombre"]] = $verificar;

          next($Datos);
          }
          return $ArrayDatos;     
}
public function Add($datos){
        
    $ArrayDatos= $this->validar($datos);
    if( $ArrayDatos === false){
        return array("Error"=>"Verificar Datos");
    }
        
         foreach ($this->CamposNecesarios as $campo){
            if (!isset($ArrayDatos[$campo])){
                return array("Error"=>"Debe Enviar Campo $campo");
            }
         }

         $ArrayDatos["fecha"] =  date("Y-m-d");
        $ArrayDatos["Status"] = "Activo";

 
    return $this->db->insert($this->Tabla, $ArrayDatos);
   
}
public function Edit($datos){
  
    $ArrayDatos= $this->validar($datos);
    if( $ArrayDatos === false){
        return array("Error"=>"Verificar Datos");
    } 
 
 
    if (!isset($ArrayDatos["id"])){
        return array("Error"=>"Debe Enviar el id del Indicador");
    }
 
   $Buscar = $this->getIndicadoresFiltro("sid".$this->Separador.$ArrayDatos["id"]);
 
   if (count($Buscar)===0){
    return array("Error"=>"Indicador No Existe");
   }else{
    
   $where = "id = '".$ArrayDatos["id"]."' ";
    return $this->db->update($this->Tabla, $ArrayDatos, $where );

   }
}
public function Delete($ID){

   $Buscar = $this->getIndicadoresFiltro("sid".$this->Separador.intval($ID));
   if (count($Buscar)===0){
    return array("Error"=>"indicador No Existe");
   }else{
    $ArrayDatos["id"] = intval($ID);
    $ArrayDatos["Status"] = "Inactivo";
   //$where = "id = '".$ArrayDatos["id"]."' ";

   $this->db->where('id', $ID);
    return $this->db->delete($this->Tabla);

   }
}


   Public function MetaData($Mascara = true){
      
    $meta = $this->db->field_data($this->Tabla);

    $meta2 =array();
    $meta3 = array();
    $i=0;
    foreach ($meta as $field)
{ 
if($Mascara=== true){
   
   if(!isset($this->CamposInternos[$field->name]) && !isset($this->Select[$field->name]) ){
    $id= (string)$i;
    $meta2[$id] = [
        "name"=> $this->Mascara($field->name),
        "value"=> $field->type === "date"? date("Y-m-d") : "" ,
        "Tipo"=>  $field->type === "longtext" || $field->type === "varchar" || $field->type === "date" ? "a":"n",       
        "disabled"=> false, 
        "len"=> $field->type === "date"? 10 :$field->max_length,         
        "type"=> $field->type === "date"? $field->type : "text",    
        "necessary"=> isset($this->CamposNecesarios[$field->name]), 
        "modified"=> false,  
        "Buscar" => $field->name =="none",
    ];
    
    if(isset($this->SoloLetras[$field->name])){
        $meta2[$id]["Tipo"] = $this->SoloLetras[$field->name];
    }
   }
   if (isset($this->Select[$field->name])){
    $id= (string)$i;
    $meta3[$id] = [
        "name"=> $this->Mascara($field->name),
        "value"=> "",     
        "disabled"=> false,      
        "primary"=>$field->name =="id",
        "date"=>$this->Select[$field->name]["date"],
        "option"=>$this->Select[$field->name]["option"],
        "filter"=>$this->Select[$field->name]["filter"],
        "Datos"=>$this->Select[$field->name]["Datos"],
        "necessary"=> $this->Select[$field->name]["necessary"], 
        "modified"=> false,  
    ];
   
   } 
   $Total = $this->total();
   $meta2["Total"] = $Total[0]->Total;
   $meta2["Select"]= $meta3;
   $meta2["Delimitador"] = $this->Delimitador;
   $meta2["Separador"]  = $this->Separador;


       
}else{
    $meta2[$i] = ["nombre"=> $field->name, "len"=> $field->max_length, "type"=> $field->type, "Obligatorio"=>isset($this->CamposNecesarios[$field->name]),"ID"=>$i];
   
}

$i++;
}

   return   $meta2;
} 

}
