import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // Inicializar Firebase
  app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);

  constructor() {}

  async guardarUbicacion(data: any) {
    try {
      await addDoc(collection(this.db, 'historial_ubicaciones'), data);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  }

  async guardarEncuesta(data: any) {
    try {
      await addDoc(collection(this.db, 'encuestas'), data);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  }
}