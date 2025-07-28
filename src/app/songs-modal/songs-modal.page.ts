import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavParams, ModalController  } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, FormsModule ]
})
export class SongsModalPage implements OnInit {
  songs: any;
  constructor(private navparams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.songs = this.navparams.data['songs'];
    console.log(this.songs, "songs from modal");
  }

  async closeModal() {
  await this.modalCtrl.dismiss();
}
  async selectSong(song:any){
    await this.modalCtrl.dismiss(song);
  }

}
