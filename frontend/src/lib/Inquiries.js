// Utils
import { apiFetch, apiFetchArchivo } from './utils/api';
import Config from  '../config'
import queryString from 'query-string';
const direction = Config.baseUrl+ "/";
const Post = {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({}) 
};
const Get = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const Put = {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({})
  };
  const Delete = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
  };
class Inquiries {
  static Query(Cuerpo = null, endpoint = '', Met = null, Token = null) {
    let miStorage = window.localStorage;
      if (Token == null) {
        if( miStorage.Token != null){
         Token =  miStorage.Token
        }
      }
  
     if(Token  != null && Token!= 'null' ){
      Get.headers.Authorization = 'Bearer ' + Token;
      Post.headers.Authorization = 'Bearer ' + Token;
      Put.headers.Authorization = 'Bearer ' + Token;
      Delete.headers.Authorization = 'Bearer ' + Token;
     }else{
      if(Get.headers.Authorization){
       delete Get.headers.Authorization
      }
      if(Post.headers.Authorization){
        delete Post.headers.Authorization
       }
       if(Put.headers.Authorization){
        delete Put.headers.Authorization
       }
       if(Delete.headers.Authorization){
        delete Delete.headers.Authorization
       }
     }
     
     switch(Met){
         case 'get':
          console.log(endpoint)
             return apiFetch(direction+endpoint, Get,true)
         case 'post':
             Post.body = JSON.stringify(Cuerpo);
             console.log(Post)
             return apiFetch(direction+endpoint,Post)
          case 'put':
            console.log(Put)
            Put.body = JSON.stringify(Cuerpo);
            return apiFetch(direction+endpoint,Put)
          case 'delete':
            return apiFetch(direction+endpoint,Delete,true)
          case 'Paralelo':
              Post.body = Cuerpo;
              console.log(Post)
              return apiFetch(endpoint,Post,true)
         default:
             break;
     }
   return new Promise((resolve, reject)=>{
        return reject({Erro: "Parametos Errados"});
   })
    

  }

  static QueryArchivo(Cuerpo = null, endpoint = '', Met = null, Token = null) {
    let miStorage = window.localStorage;
    if (Token == null) {
      if( miStorage.Token != null){
       Token =  miStorage.Token
      }
    }

   if(Token  != null && Token!= 'null' ){
    Get.headers.Authorization = 'Bearer ' + Token;
    Post.headers.Authorization = 'Bearer ' + Token;
    Put.headers.Authorization = 'Bearer ' + Token;
    Delete.headers.Authorization = 'Bearer ' + Token;
   }else{
    if(Get.headers.Authorization){
     delete Get.headers.Authorization
    }
    if(Post.headers.Authorization){
      delete Post.headers.Authorization
     }
     if(Put.headers.Authorization){
      delete Put.headers.Authorization
     }
     if(Delete.headers.Authorization){
      delete Delete.headers.Authorization
     }
   }
   
    switch(Met){
        case 'get':
           
            return apiFetchArchivo(direction+endpoint, Get,true)
        case 'post':
            Post.body = JSON.stringify(Cuerpo);
            console.log(Post)
            return apiFetchArchivo(direction+endpoint,Post)
         case 'put':
           console.log(Put)
           Put.body = JSON.stringify(Cuerpo);
           return apiFetchArchivo(direction+endpoint,Put)
         case 'delete':
           return apiFetchArchivo(direction+endpoint,Delete,true)
         case 'Paralelo':
             Post.body = Cuerpo;
             console.log(Post)
             return apiFetchArchivo(endpoint,Post,true)
        default:
            break;
    }
  return new Promise((resolve, reject)=>{
       return reject({Erro: "Parametos Errados"});
  })
   

 }
}
export default Inquiries;