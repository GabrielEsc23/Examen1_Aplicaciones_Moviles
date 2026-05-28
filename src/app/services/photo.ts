import { Injectable } from '@angular/core';

import {
  Camera,
  CameraResultType,
  CameraSource
} from '@capacitor/camera';

export interface UserPhoto {

  webviewPath?: string;

}

@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  public photos: UserPhoto[] = [];

  constructor() {}

  async addNewPhoto() {

    try {

      const capturedPhoto =
        await Camera.getPhoto({

          resultType:
            CameraResultType.Uri,

          source:
            CameraSource.Camera,

          quality: 90,

          allowEditing: false

        });

      const savedImageFile = {

        webviewPath:
          capturedPhoto.webPath

      };

      this.photos.unshift(
        savedImageFile
      );

    } catch (error) {

      console.error(error);

      alert(
        'No se pudo abrir la cámara'
      );

    }

  }

  async loadPhotos() {

    this.photos = [];

  }

}