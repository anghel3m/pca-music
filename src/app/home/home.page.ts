import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {

  generes = [{
    title: "Musica Clasica",
    image: "/../../assets/images/musica clasica.png",
    description: "La música clásica es una excelente compañía para estudiar, ya que su estructura armónica y ritmos suaves favorecen la concentración. Al no tener letras, evita distracciones y ayuda a mantener la mente enfocada en las tareas académicas. Estudios demuestran que piezas de Mozart o Bach estimulan la memoria y la retención de información. Además, reduce el estrés y la ansiedad, creando un ambiente tranquilo ideal para el aprendizaje. Su efecto relajante también mejora la productividad y la claridad mental. Por ello, escuchar música clásica puede ser una herramienta valiosa para optimizar el rendimiento académico."

  }]
  constructor() { }
}
