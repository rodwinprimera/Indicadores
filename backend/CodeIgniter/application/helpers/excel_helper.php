<?php
 function Excel($libros,$Titulos,$Leyenda){
    if(!empty($libros)) {
     $filename = "libros.xls";
     header("Content-Type: application/vnd.ms-excel"); 
     header("Content-Disposition: attachment; filename=".$filename); 
     $mostrar_columnas = false; 
     echo utf8_decode(utf8_decode($Leyenda. "\n"));
     foreach($libros as $libro) {
      if(!$mostrar_columnas) {
       echo utf8_decode(utf8_decode(implode("\t", array_values($Titulos)) . "\n"));
      
        $mostrar_columnas = true;
         } echo utf8_decode(utf8_decode(implode("\t", get_object_vars($libro)) . "\n")); 
          
       } 
     }else{
      echo 'No hay datos a exportar'; 
    } exit; 
   
   }

      function myUrlEncode($string) {
        return urlencode($string);
    }




?>