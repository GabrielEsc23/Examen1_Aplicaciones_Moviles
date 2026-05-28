import { Injectable } from '@angular/core';

import {

  Camera,
  CameraResultType,
  CameraSource,
  Photo

} from '@capacitor/camera';

import {

  Filesystem,
  Directory

} from '@capacitor/filesystem';

import {

  Preferences

} from '@capacitor/preferences';

export interface UserPhoto {

  filepath: string;

  webviewPath?: string;

}

@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  public photos: UserPhoto[] = [];

  private PHOTO_STORAGE =
    'photos';

  constructor() {}

  // =========================
  // TOMAR FOTO
  // =========================

  async addNewPhoto() {

    const capturedPhoto =
      await Camera.getPhoto({

        resultType:
          CameraResultType.Uri,

        source:
          CameraSource.Prompt,

        quality: 90

      });

    const savedImageFile =
      await this.savePicture(
        capturedPhoto
      );

    this.photos.unshift(
      savedImageFile
    );

    Preferences.set({

      key: this.PHOTO_STORAGE,

      value: JSON.stringify(
        this.photos
      )

    });

  }

  // =========================
  // GUARDAR FOTO
  // =========================

  private async savePicture(
    photo: Photo
  ): Promise<UserPhoto> {

    const base64Data =
      await this.readAsBase64(photo);

    const fileName =
      new Date().getTime() + '.jpeg';

    const savedFile = await Filesystem.writeFile({

      path: fileName,

      data: base64Data,

      directory: Directory.Data

    });

    return {

      filepath: fileName,

      webviewPath:
        photo.webPath

    };

  }

  // =========================
  // CARGAR FOTOS
  // =========================

  async loadPhotos() {

    const { value } =
      await Preferences.get({

        key: this.PHOTO_STORAGE

      });

    this.photos = value
      ? JSON.parse(value)
      : [];

  }

  // =========================
  // BASE64
  // =========================

  private async readAsBase64(
    photo: Photo
  ) {

    const response =
      await fetch(photo.webPath!);

    const blob =
      await response.blob();

    return await this.convertBlobToBase64(
      blob
    ) as string;

  }

  private convertBlobToBase64 =
    (blob: Blob) =>
      new Promise((resolve, reject) => {

        const reader =
          new FileReader();

        reader.onerror = reject;

        reader.onload = () => {

          resolve(
            reader.result
          );

        };

        reader.readAsDataURL(blob);

      });

}