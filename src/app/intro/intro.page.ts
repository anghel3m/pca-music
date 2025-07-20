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
    //temas
  temaClaro = 'var( --tema-claro-fondo)';
  temaOscuro = 'var( --tema-oscuro-fondo)';
  temaActual = this.temaOscuro;

  temaClaroTexto = 'var(--tema-claro-texto)';
  temaOscuroTexto = 'var(--tema-oscuro-texto)';
  tematextoActual = this.temaOscuroTexto;

 introSlides = [
  {
    title: "Bienvenido a PCA Music",
    icon: "musical-notes",
    description: "Explora una app creada por estudiantes de la Universidad PCA en Barranquilla. Nuestra misión es mejorar tu experiencia académica a través del poder de la música. ¡Comienza el viaje!"
  },
  {
    title: "Música que potencia tu mente",
    icon: "headset",
    description: "Selecciona géneros que te ayuden a concentrarte, estudiar o relajarte. Desde lo clásico hasta lo urbano, adaptamos la música a tu momento académico."
  },
  {
    title: "Estilo PCA: 100% Caribe",
    icon: "sunny",
    description: "Nuestra app refleja la diversidad y energía de nuestra región. El vallenato, la champeta y el sabor local hacen parte de tu experiencia musical personalizada."
  },
  {
    title: "Sin distracciones, solo enfoque",
    icon: "book-outline",
    description: "Creamos ambientes musicales que te acompañan en el estudio, el trabajo o la relajación. Todo pensado para maximizar tu rendimiento sin distracciones."
  },
  {
    title: "¡Empieza a disfrutar!",
    icon: "play-circle",
    description: "Listo para descubrir el poder de la música en tu rutina universitaria. Conéctate, elige tu estilo y deja que PCA Music te inspire todos los días."
  }
];


  constructor(private router: Router, private storageService: StorageService) { }

    async ngOnInit() {
    await this.loadStorageData();
  }
   async cambiarTema() {
    const esOscuro = this.temaActual === this.temaOscuro;

    this.temaActual = esOscuro ? this.temaClaro : this.temaOscuro;
    this.tematextoActual = esOscuro ? this.temaClaroTexto : this.temaOscuroTexto;

    await this.storageService.set('theme', this.temaActual);
    await this.storageService.set('theme-text', this.tematextoActual);
  }

  async loadStorageData() {
    const savedTheme = await this.storageService.get('theme');
    if (savedTheme) {
      this.temaActual = savedTheme;
    }

    const savedTextTheme = await this.storageService.get('theme-text');
    if (savedTextTheme) {
      this.tematextoActual = savedTextTheme;
    }
  }

  goHome() {
    this.router.navigateByUrl("/home");
  }

   async guardarVisita() {
    await this.storageService.set('visita-intro', 'si');
  }

   
  }

