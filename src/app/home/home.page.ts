import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from "../services/storage.service";
import { Router } from "@angular/router";
import { MusicService } from "../services/music.service";
import { SongsModalPage } from '../songs-modal/songs-modal.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  //temas
  temaClaro = 'var( --tema-claro-fondo)';
  temaOscuro = 'var( --tema-oscuro-fondo)';
  temaActual = this.temaOscuro;

  temaClaroTexto = 'var(--tema-claro-texto)';
  temaOscuroTexto = 'var(--tema-oscuro-texto)';
  tematextoActual = this.temaOscuroTexto;

  tracks: any;
  albums: any;
  LocalArtists: any;
  artists: any;
  song = {
    name: '',
    playing: false,
    preview_url: ''
  }
  currentSong:any = {};
  newTime:any;

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

  constructor(private router: Router, private storageService: StorageService, private musicService: MusicService, private modalCtr: ModalController ) { }

  async ngOnInit() {
    await this.loadStorageData();
    this.loadTracks();
    this.loadAlbums();
    this.loadLocalArtists() 
    this.loadArtists();

    this.musicService.getArtists().then(data =>{
    this.artists = data;
    console.log(data)
   })
  }

  goBack() {
    this.router.navigateByUrl("/intro");
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

  async loadTracks() {
    this.musicService.getTracks().then(tracks => {
      this.tracks =  tracks
      console.log(this.tracks,"aqui la musica")
    })
  }
  async loadAlbums() {
    this.musicService.getAlbums().then(albums => {
      this.albums=  albums
      console.log(this.albums,"aqui los albumes")
    })
  }

    async loadLocalArtists() {
      this.LocalArtists = this.musicService.getLocalArtists().artists;
      console.log(this.LocalArtists.artists)
  }

    loadArtists() {
  try {
    this.musicService.getArtists().then(artists => {
      this.artists = artists;
      console.log("Artistas cargados:", this.artists);
    });
  } catch (error) {
    console.error("Error al cargar artistas:", error);
  }
}
    async showSongs(albumsId: string) {
      const songs = await this.musicService.getSongsByAlbum(albumsId);
      console.log( songs)
      const modal = await this.modalCtr.create({
        component: SongsModalPage,
        componentProps: {
          songs: songs,
          albumId: albumsId
        }
      });
        modal.onDidDismiss().then(dataReturned => {
      this.song = dataReturned.data;
    })
      modal.present();
  }

     async showSongsArtist(artistId: string) {
      const songs = await this.musicService.getSongsByArtist(artistId);
      console.log( songs)
      const modal = await this.modalCtr.create({
        component: SongsModalPage,
        componentProps: {
          songs: songs,
          artistId: artistId
        }
      });
      modal.present();
  }

  play(){
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate", ()=>{
      this.newTime = (1 / this.currentSong.duration) * this.currentSong.currentTime;
    })
    this.song.playing = true;
  }
  pause(){
    this.currentSong.pause();
    this.song.playing = false;
  }

  parseTime(time = "0.00"){
    if (time) {
      const partTime = parseInt(time.toString().split(".")[0], 10);
      let minutes = Math.floor(partTime/60).toString();
      if (minutes.length == 1){
        minutes = "0" + minutes;
      }
      let seconds = (partTime % 60).toString();
      if (seconds.length == 1){
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds
    }
    return null
  }

}
