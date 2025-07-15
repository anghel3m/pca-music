import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from "../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class IntroPage implements OnInit {

  constructor(private router: Router, private storageService: StorageService) { }

    async ngOnInit() {
  
  }

  goBack() {
    this.router.navigateByUrl("/home");
  }

   async guardarVisita() {
    await this.storageService.set('visita intro', 'si');
  }

   
  }

