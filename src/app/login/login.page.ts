import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from "../services/auth.service";
import { StorageService } from "../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule,]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  errror_Message: string = "";
  

  validation_messages = {
    email: [
      {
        type: "required", message: "el email es obligatorio"
      },
      {
        type: "email", message: "el email es invalido"
      }
    ],
    password: [
      {
        type: "required", message: "el password es obligatorio"
      },
      {
        type: "minlength", message: "minimo 6 caracteres"
      }
    ]
  }

  constructor(private FormBuilder: FormBuilder, private authService: AuthService, private navCtrl: NavController,private storageService: StorageService, private router: Router ) {
    this.loginForm = this.FormBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required, //campo obligatorio
          Validators.email
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ])
      ]
    })
  }

  ngOnInit() {

  }

 loginUser(credenciales: any) {
  this.authService.login({ email: credenciales.email, password: credenciales.password })
    .then(async (res: any) => {
      this.errror_Message = "";
      await this.storageService.set('logueado', 'si');
      await this.storageService.set('usuario', res.user);
      this.navCtrl.navigateForward("/menu/home");
    })
    .catch(err => {
      console.error("Login error:", err);
      if (err?.errors && Array.isArray(err.errors)) {
        this.errror_Message = err.errors[0]; // Mensaje devuelto por la API
      } else if (err?.msg) {
        this.errror_Message = err.msg; // Otro posible formato
      } else {
        this.errror_Message = "Credenciales incorrectas o error de red";
      }
    });
}


    async logueado() {
    await this.storageService.set('logueado', 'si');
  }

   goSignUp() {
    this.router.navigateByUrl("/signup");
  }
}
