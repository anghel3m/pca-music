import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   urlServer = "https://music.fly.dev";

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


   // AUTENTICACION API
 login(credentials: { email: string; password: string }) {
  return fetch(`https://music.fly.dev/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: credentials })
  }).then(async response => {
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  });
}


  logout() {
    return fetch(`${this.urlServer}/logout`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json());
  }
}
