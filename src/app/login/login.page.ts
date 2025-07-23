import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from "../services/auth.service";
import { StorageService } from "../services/storage.service";

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

  constructor(private FormBuilder: FormBuilder, private authService: AuthService, private navCtrl: NavController,private storageService: StorageService, ) {
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

  loginUser(credentiales: any) {
   /*  console.log(credentiales) */
  this.authService.loginUser(credentiales).then(res=> {
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

}
