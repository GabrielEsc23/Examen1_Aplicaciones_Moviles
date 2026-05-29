import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
// Mantenemos addDoc e importamos query, getDocs y orderBy para la lectura
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  getDocs, 
  orderBy 
} from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // Inicialización de Firebase
  app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);

  constructor() {}

  // ==========================================
  // NUEVA FUNCIÓN: OBTENER ENCUESTAS
  // ==========================================
  async getEncuestas() {
    try {
      // Consultamos la colección 'encuestas' ordenada por fecha (más reciente primero)
      const q = query(collection(this.db, 'encuestas'), orderBy('fecha', 'desc'));
      const querySnapshot = await getDocs(q);
      const registros: any[] = [];
      
      querySnapshot.forEach((doc) => {
        // Agregamos el ID de Firebase y los datos del documento al arreglo
        registros.push({ id: doc.id, ...doc.data() });
      });
      
      console.log("Datos recuperados de Firestore:", registros.length);
      return registros;
    } catch (error) {
      console.error("Error al obtener documentos: ", error);
      return [];
    }
  }

  // ==========================================
  // TUS FUNCIONES FUNCIONALES (NO TOCAR)
  // ==========================================
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