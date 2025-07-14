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
  //temas
  temaClaro = 'var( --tema-claro-fondo)';
  temaOscuro = 'var( --tema-oscuro-fondo)';
  temaActual = this.temaOscuro;

  temaClaroTexto = 'var(--tema-claro-texto)';
  temaOscuroTexto = 'var(--tema-oscuro-texto)';
  tematextoActual = this.temaOscuroTexto;

  generes = [
    {
    title: "musica clasica",
    image: "/../../assets/images/musica-clasica.png",
    description: "La música clásica es una excelente compañía para estudiar, ya que su estructura armónica y ritmos suaves favorecen la concentración. Al no tener letras, evita distracciones y ayuda a mantener la mente enfocada en las tareas académicas. Estudios demuestran que piezas de Mozart o Bach estimulan la memoria y la retención de información."
  },
   {
    title: "Deep House",
    image: "/../../assets/images/musica-deephouse.png",
    description: "La música deep house, con sus ritmos envolventes y melodías repetitivas, aumenta la energía y la concentración al trabajar. Su tempo constante favorece la productividad, manteniendo un flujo de trabajo constante sin distracciones. Además, el bajo profundo y los sonidos atmosféricos crean un ambiente dinámico que combate el agotamiento."
  },
    {
    title: "Vallenato",
    image: "/../../assets/images/musica-vallenato.png",
    description: "El vallenato, con sus letras emotivas y ritmo alegre, anima el ambiente laboral. Su melodía de acordeón y caja motiva sin distraer, ideal para trabajos creativos o en equipo. Además, su esencia folclórica genera un ambiente cálido y energizante. Perfecto para mantener el ánimo alto durante la jornada."
  },
      {
    title: "Reggaetón",
    image: "/../../assets/images/musica-reggeton.png",
    description: "El reggaetón, con su ritmo contagioso y beats energéticos, acelera el ánimo y la productividad en trabajos dinámicos. Su flow repetitivo ayuda a mantener el ritmo en tareas repetitivas o físicas, mientras que las letras motivadoras (o el instrumental) pueden aumentar la energía. "
  }  
 ]
  constructor() { }

cambiarTema(){
//if ternario
this. temaActual = this.temaActual === this.temaOscuro ? this.temaClaro : this.temaOscuro
this. tematextoActual = this.tematextoActual === this.temaOscuroTexto ? this.temaClaroTexto : this.temaOscuroTexto
}
}
