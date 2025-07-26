import { Injectable } from '@angular/core';
import * as dataArtists from './artista.json';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  urlServer = "https://music.fly.dev";

  constructor() {}

  // ARTISTS
  getArtists() {
    return fetch(`${this.urlServer}/artists`)
      .then(response => response.json());
  }

  getArtistById(id: number) {
    return fetch(`${this.urlServer}/artists/${id}`)
      .then(response => response.json());
  }

  createArtist(artist: {
    name: string,
    followers: number,
    genres: string[],
    image: string,
    popularity: number
  }) {
    return fetch(`${this.urlServer}/artists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ artist })
    }).then(response => response.json());
  }

  // ALBUMS
  getAlbums() {
    return fetch(`${this.urlServer}/albums`)
      .then(response => response.json());
  }

  getAlbumsByArtist(artistId: number) {
    return fetch(`${this.urlServer}/albums/artist/${artistId}`)
      .then(response => response.json());
  }

  // TRACKS
  getTracks() {
    return fetch(`${this.urlServer}/tracks`)
      .then(response => response.json());
  }

  searchTracks(query: string) {
    return fetch(`${this.urlServer}/search_track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: query })
    }).then(response => response.json());
  }

  getSongsByArtist(artistId: number) {
    return fetch(`${this.urlServer}/tracks/artist/${artistId}`)
      .then(response => response.json());
  }

   getSongsByAlbum(albumId: string) {
    return fetch(`${this.urlServer}/tracks/album/${albumId}`)
      .then(response => response.json());
  }

  // LOCAL ARTISTS (dummy)
  getLocalArtists() {
    return dataArtists;
  }
}
