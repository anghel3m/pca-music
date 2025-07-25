import * as dataArtists from './artista.json';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  urlServer = "https://music.fly.dev";

  constructor() { }

  getTracks() {
    return fetch( `${this.urlServer}/tracks`).then(
      response => response.json()
    );
  }
   getAlbums() {
    return fetch( `${this.urlServer}/albums`).then(
      response => response.json()
    );
  }
  getLocalArtists (){
    return dataArtists;
  }
}
