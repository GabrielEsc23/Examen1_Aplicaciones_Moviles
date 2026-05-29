import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular/standalone';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: UserPhoto[] = [];
  private PHOTO_STORAGE = 'photos';

  constructor(private platform: Platform) {}

  // =========================
  // TOMAR FOTO
  // =========================
  async addNewPhoto() {
    if (this.platform.is('hybrid')) {
      // ✅ Dispositivo físico (Android/iOS)
      await this.addPhotoNative();
    } else {
      // ✅ Web/browser — usa input file
      await this.addPhotoWeb();
    }
  }

  // =========================
  // FOTO EN DISPOSITIVO
  // =========================
  private async addPhotoNative() {
    const permissions = await Camera.requestPermissions();

    if (permissions.camera === 'denied') {
      console.error('Permiso de cámara denegado');
      return;
    }

    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 90
    });

    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);
    await this.saveToStorage();
  }

  // =========================
  // FOTO EN WEB (input file)
  // =========================
  private addPhotoWeb(): Promise<void> {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';

      input.onchange = async (event: any) => {
        const file: File = event.target.files[0];
        if (!file) { resolve(); return; }

        const reader = new FileReader();
        reader.onload = async (e: any) => {
          const base64Data = e.target.result as string;
          const fileName = new Date().getTime() + '.jpeg';

          await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Data
          });

          this.photos.unshift({
            filepath: fileName,
            webviewPath: base64Data
          });

          await this.saveToStorage();
          resolve();
        };

        reader.readAsDataURL(file);
      };

      input.click();
    });
  }

  // =========================
  // GUARDAR EN STORAGE
  // =========================
  private async saveToStorage() {
    await Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(
        this.photos.map(p => ({ filepath: p.filepath }))
      )
    });
  }

  // =========================
  // GUARDAR FOTO NATIVA
  // =========================
  private async savePicture(photo: Photo): Promise<UserPhoto> {
    const base64Data = await this.readAsBase64(photo);
    const fileName = new Date().getTime() + '.jpeg';

    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    return {
      filepath: fileName,
      webviewPath: photo.webPath
    };
  }

  // =========================
  // CARGAR FOTOS
  // =========================
  async loadPhotos() {
    const { value } = await Preferences.get({ key: this.PHOTO_STORAGE });
    const savedPhotos: UserPhoto[] = value ? JSON.parse(value) : [];
    const photos: UserPhoto[] = [];

    for (const photo of savedPhotos) {
      try {
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data
        });
        photos.push({
          filepath: photo.filepath,
          webviewPath: `data:image/jpeg;base64,${readFile.data}`
        });
      } catch (e) {
        console.warn('No se pudo leer la foto:', photo.filepath);
      }
    }

    this.photos = photos;
  }

  // =========================
  // BASE64
  // =========================
  private async readAsBase64(photo: Photo): Promise<string> {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
}