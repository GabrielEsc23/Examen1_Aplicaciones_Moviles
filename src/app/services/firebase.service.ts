import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, getDocs, orderBy } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);

  // VARIABLES PUENTE
  public ultimaUbicacionCapturada: string = '';
  public ultimaLatitud: number | null = null;
  public ultimaLongitud: number | null = null;

  constructor() {}

  async getEncuestas() {
    try {
      const q = query(collection(this.db, 'encuestas'), orderBy('fecha', 'desc'));
      const querySnapshot = await getDocs(q);
      const registros: any[] = [];
      querySnapshot.forEach((doc) => {
        registros.push({ id: doc.id, ...doc.data() });
      });
      return registros;
    } catch (error) {
      console.error("Error: ", error);
      return [];
    }
  }

  async guardarUbicacion(data: any) {
    try {
      await addDoc(collection(this.db, 'historial_ubicaciones'), data);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }

  async guardarEncuesta(data: any) {
    try {
      await addDoc(collection(this.db, 'encuestas'), data);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }
}