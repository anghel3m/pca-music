import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
loginUser (credentials :any){
  return  new Promise ((accept, reject)=>{
    if (
      credentials.email == 'adms95@outlook.es' &&
      credentials.password =='123456789'
    ){
      accept("login correcto")
    } else{
      reject("login Incorrecto")
    }
  })
}
}
