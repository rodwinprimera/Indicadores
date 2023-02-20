<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>

<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
     <link rel="icon" href="/Prueba.ico" >
    <title>Indicadores</title>
  </head>
  <body>
    <div id="root"></div>

    <script>
      // Initial state
      
      const initialState = {
        device: {
          isMobile: '{{{ isMobile }}}',
          Secion: "Si"
          
        }
      };

      window.initialState = initialState;
    </script>
    <script  src="./js/vendor.bundle.js"></script>
    <script  src="./js/main.bundle.js"></script>
   
    
  </body>
</html>