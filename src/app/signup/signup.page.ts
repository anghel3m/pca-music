import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from "../services/auth.service";
import { StorageService } from "../services/storage.service";
import { RegisterService } from "../services/register.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-singup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule,]
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
  errror_Message: string = "";
  

  validation_messages = {
      name: [
      {
        type: "required", message: "el email es obligatorio"
      },
      {
        type: "minlength", message: "minimo 3 caracteres"
      }
    ],
     lastName: [
      {
        type: "required", message: "el email es obligatorio"
      },
      {
        type: "minlength", message: "minimo 3 caracteres"
      }
    ],
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

  constructor(private FormBuilder: FormBuilder, 
    private authService: AuthService,
    private navCtrl: NavController,
    private storageService: StorageService, 
    private registerService: RegisterService, 
    private router: Router ) {

    this.signupForm = this.FormBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required, //campo obligatorio
          Validators.minLength(3),
        ])
      ],
      lastName: [
        '',
        Validators.compose([
          Validators.required, //campo obligatorio
          Validators.minLength(3),
        ])
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
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

  signUpUser(credenciales: any) {
  const user = {
    email: credenciales.email,
    password: credenciales.password,
    password_confirmation: credenciales.password, // duplicamos para confirmación
    name: credenciales.name,
    last_name: credenciales.lastName
  };

  this.registerService.signup(user).then(async res => {
    if (res.status === "OK") {
      this.errror_Message = "";
      await this.storageService.set('logueado', 'si');
      await this.registerService.guardarUsuario(user);
      this.navCtrl.navigateForward("/menu/home");
    } else {
      this.errror_Message = res.msg || "Error al registrar";
    }
  }).catch(error => {
    console.error(error);
    this.errror_Message = "Error en el servidor";
  });
}
    async logueado() {
    await this.storageService.set('logueado', 'si');
  }

   goLogin() {
    this.router.navigateByUrl("/login");
  }
}
