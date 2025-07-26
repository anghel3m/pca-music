import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  urlServer = "https://music.fly.dev";

  constructor(private storageService: StorageService) {}

  // SIMULACION DE REGISTRO
  registerUser(credentials: any) {
    return new Promise((accept, reject) => {
      if (
        credentials.email === 'adms95@outlook.es' &&
        credentials.password === '123456789'
      ) {
        this.guardarUsuario(credentials);
        accept("Registro correcto");
      } else {
        reject("Registro incorrecto");
      }
    });
  }

   async guardarUsuario(user: any) {
    await this.storageService.set('usuario', user);
  }

// REGISTRO API
  signup(user: {
    email: string,
    password: string,
    password_confirmation: string,
    name: string,
    last_name: string
  }) {
    return fetch(`${this.urlServer}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user })
    }).then(response => response.json());
  }
}