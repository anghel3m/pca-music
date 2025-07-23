import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private storageService: StorageService) { }

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

  async guardarUsuario(credentials: any) {
    await this.storageService.set('usuario', credentials);
  }
}
