import { Component, OnInit } from '@angular/core';

import {

  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonImg,
  IonCard,
  IonCardContent,
  IonIcon

} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';

// SERVICIO FOTO
import { PhotoService }
from '../../services/photo';

import { addIcons }
from 'ionicons';

import {
  cameraOutline,
  imagesOutline
} from 'ionicons/icons';

@Component({

  selector: 'app-camara',

  templateUrl: './camara.page.html',

  styleUrls: ['./camara.page.scss'],

  standalone: true,

  imports: [

    CommonModule,

    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonImg,
    IonCard,
    IonCardContent,
    IonIcon

  ]

})

export class CamaraPage
implements OnInit {

  constructor(
    public photoService: PhotoService
  ) {

    // ICONOS
    addIcons({

      'camera-outline':
      cameraOutline,

      'images-outline':
      imagesOutline

    });

  }

  // =========================
  // CARGAR FOTOS GUARDADAS
  // =========================

  async ngOnInit() {

    await this.photoService
      .loadPhotos();

  }

  // =========================
  // TOMAR FOTO
  // =========================

  async addPhoto() {

    await this.photoService
      .addNewPhoto();

  }

}