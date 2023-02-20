// Utils
import { apiFetch } from '../../lib/utils/api';
//const direction = "http://localhost:800/Inventario/php/Ejemplo.php";
const direction = "http://localhost:3000/ProcesarPost";
const init = {
    // el método de envío de la información será POST
   method: "POST",
   headers: { // cabeceras HTTP
       // vamos a enviar los datos en formato JSON
       'Content-Type': 'application/json'
   },
 
   // el cuerpo de la petición es una cadena de texto 
   // con los datos en formato JSON
   body: JSON.stringify({ "hola":"como"}) // convertimos el objeto a texto
};
class Inquiries {
  static Query(Busqueda=null) {
    if (Busqueda!=null){
      init.body =JSON.stringify(Busqueda);  
    }else{
      init.body= JSON.stringify({ "hola":"como"})
    }
       return apiFetch(direction,init);
  }
}
export default Inquiries;