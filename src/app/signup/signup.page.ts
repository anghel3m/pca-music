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

  signUpUser(credentiales: any) {
   /*  console.log(credentiales) */
  this.registerService.registerUser(credentiales).then(res=> {
   /*  console.log(res) */
   this.errror_Message= "";
   this.navCtrl.navigateForward("/home");
    this.logueado() 
  }).catch(error =>{
    this.errror_Message= error;
  })
  }
    async logueado() {
    await this.storageService.set('logueado', 'si');
  }

   goLogin() {
    this.router.navigateByUrl("/login");
  }
}
