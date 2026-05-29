import { Component } from '@angular/core';
import {
  IonicModule,
  ToastController
} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { addIcons } from 'ionicons';
import {
  personOutline,
  calendarOutline,
  peopleOutline,
  gameControllerOutline,
  desktopOutline,
  sparklesOutline,
  chatbubbleOutline,
  saveOutline // <--- IMPORTANTE: Faltaba este
} from 'ionicons/icons';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class EncuestaPage {
  encuesta = {
    alias: '',
    edad: '',
    rol: '',
    videojuego: '',
    plataforma: '',
    genero: '',
    comentario: ''
  };

  constructor(
    private toastController: ToastController,
    private firebaseService: FirebaseService
  ) {
    // Registro de iconos para que Ionic pueda renderizarlos
    addIcons({
      'person-outline': personOutline,
      'calendar-outline': calendarOutline,
      'people-outline': peopleOutline,
      'game-controller-outline': gameControllerOutline,
      'desktop-outline': desktopOutline,
      'sparkles-outline': sparklesOutline,
      'chatbubble-outline': chatbubbleOutline,
      'save-outline': saveOutline // <--- IMPORTANTE: Faltaba este
    });
  }

  // =========================
  // GUARDAR ENCUESTA
  // =========================
  async guardarEncuesta() {
    console.log('Datos a enviar:', this.encuesta); // Debug en consola

    try {
      const data = {
        ...this.encuesta,
        fecha: new Date().toISOString()
      };

      const resultado = await this.firebaseService.guardarEncuesta(data);

      if (resultado.success) {
        const toast = await this.toastController.create({
          message: 'Encuesta guardada correctamente en Firebase',
          duration: 2000,
          color: 'success'
        });
        await toast.present();

        // LIMPIAR FORMULARIO
        this.encuesta = {
          alias: '',
          edad: '',
          rol: '',
          videojuego: '',
          plataforma: '',
          genero: '',
          comentario: ''
        };
      } else {
        throw new Error('No se pudo guardar');
      }

    } catch (error) {
      console.error('Error detallado:', error);
      const toast = await this.toastController.create({
        message: 'Error al conectar con Firebase',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }
}