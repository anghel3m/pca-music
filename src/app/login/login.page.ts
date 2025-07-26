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
  this.authService.login(credenciales.email, credenciales.password)
    .then(async (res: any) => {
      if (res.status === "OK") {
        this.errror_Message = "";
        await this.storageService.set('logueado', 'si');
        await this.storageService.set('usuario', res.user);
        this.navCtrl.navigateForward("/menu/home");
      } else {
        this.errror_Message = res.msg || "Error al iniciar sesión";
      }
    })
    .catch(err => {
      console.error(err);
      this.errror_Message = "Error en el servidor o credenciales incorrectas";
    });
}

    async logueado() {
    await this.storageService.set('logueado', 'si');
  }

   goSignUp() {
    this.router.navigateByUrl("/signup");
  }
}
