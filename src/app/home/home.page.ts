import { Component } from '@angular/core';

import {
  IonicModule
} from '@ionic/angular';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { addIcons } from 'ionicons';

import {
  gameControllerOutline,
  documentTextOutline,
  locationOutline,
  cameraOutline,
  albumsOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ]
})
export class HomePage {

  constructor() {

    addIcons({

      'game-controller-outline':
      gameControllerOutline,

      'document-text-outline':
      documentTextOutline,

      'location-outline':
      locationOutline,

      'camera-outline':
      cameraOutline,

      'albums-outline':
      albumsOutline

    });

  }

}