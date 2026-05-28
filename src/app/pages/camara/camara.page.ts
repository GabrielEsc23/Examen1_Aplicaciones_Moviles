import { Component } from '@angular/core';

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

// IMPORT CORRECTO
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

export class CamaraPage {

  constructor(
    public photoService: PhotoService
  ) {

    addIcons({

      'camera-outline':
      cameraOutline,

      'images-outline':
      imagesOutline

    });

  }

  async ngOnInit() {

    await this.photoService.loadPhotos();

  }

  addPhoto() {

    this.photoService.addNewPhoto();

  }

}