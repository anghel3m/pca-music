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
  login(email: string, password: string) {
    return fetch(`${this.urlServer}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }).then(response => response.json());
  }

  signup(user: {
    email: string,
    password: string,
    name: string,
    username: string
  }) {
    return fetch(`${this.urlServer}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user })
    }).then(response => response.json());
  }

  logout() {
    return fetch(`${this.urlServer}/logout`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json());
  }
}
