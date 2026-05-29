import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { GameService } from '../../services/game';
import { addIcons } from 'ionicons';
import {
  personOutline,
  calendarOutline,
  peopleOutline,
  gameControllerOutline,
  desktopOutline,
  sparklesOutline,
  chatbubbleOutline,
  saveOutline,
  searchOutline,
  locationOutline,
  navigateOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EncuestaPage {
  // Objeto principal de la encuesta
  encuesta = {
    alias: '',
    edad: '',
    rol: '',
    videojuego: '',
    imagen_url: '',
    ubicacion: '',
    plataforma: '',
    genero: '',
    comentario: ''
  };

  // Variables auxiliares para la búsqueda y coordenadas
  busqueda: string = '';
  juegosSugeridos: any[] = [];
  lat: number | null = null;
  lng: number | null = null;

  constructor(
    private toastController: ToastController,
    private firebaseService: FirebaseService,
    private gameService: GameService
  ) {
    // Registro de todos los iconos necesarios
    addIcons({
      personOutline,
      calendarOutline,
      peopleOutline,
      gameControllerOutline,
      desktopOutline,
      sparklesOutline,
      chatbubbleOutline,
      saveOutline,
      locationOutline,
      navigateOutline,
      'search-outline': searchOutline
    });
  }

  /**
   * Se ejecuta al entrar a la vista. 
   * Recupera la ubicación y coordenadas guardadas en el "puente" del servicio.
   */
  async ionViewWillEnter() {
    if (this.firebaseService.ultimaUbicacionCapturada) {
      this.encuesta.ubicacion = this.firebaseService.ultimaUbicacionCapturada;
      this.lat = this.firebaseService.ultimaLatitud;
      this.lng = this.firebaseService.ultimaLongitud;

      const toast = await this.toastController.create({
        message: `Ubicación detectada: ${this.encuesta.ubicacion}`,
        duration: 2000,
        color: 'secondary',
        position: 'top'
      });
      await toast.present();
    }
  }

  /**
   * Busca videojuegos en la API de FreeToGame según lo que el usuario escribe.
   */
  buscarJuegoAPI() {
    if (this.busqueda.length > 2) {
      this.gameService.getGames().subscribe({
        next: (res) => {
          this.juegosSugeridos = res.filter((g: any) =>
            g.title.toLowerCase().includes(this.busqueda.toLowerCase())
          ).slice(0, 5); // Limitamos a 5 sugerencias para no saturar la UI
        },
        error: (err) => console.error('Error al consultar API:', err)
      });
    } else {
      this.juegosSugeridos = [];
    }
  }

  /**
   * Asigna el juego seleccionado de la lista de sugerencias al formulario.
   */
  seleccionarJuego(juego: any) {
    this.encuesta.videojuego = juego.title;
    this.encuesta.imagen_url = juego.thumbnail;
    this.encuesta.genero = juego.genre; // Opcional: auto-llena el género
    this.busqueda = juego.title;
    this.juegosSugeridos = [];
  }

  /**
   * Guarda todos los datos en Firebase, incluyendo las coordenadas GPS.
   */
  async guardarEncuesta() {
    // Validación básica de ubicación
    if (!this.encuesta.ubicacion) {
      this.encuesta.ubicacion = 'Sin ubicación registrada';
    }

    try {
      const data = {
        ...this.encuesta,
        latitud: this.lat,
        longitud: this.lng,
        fecha: new Date().toISOString()
      };

      const resultado = await this.firebaseService.guardarEncuesta(data);

      if (resultado.success) {
        const toast = await this.toastController.create({
          message: '¡Encuesta guardada con éxito!',
          duration: 2000,
          color: 'success'
        });
        await toast.present();

        // Reseteo del formulario y variables puente
        this.limpiarFormulario();
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      const toast = await this.toastController.create({
        message: 'Error al conectar con el servidor',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }

  private limpiarFormulario() {
    this.busqueda = '';
    this.juegosSugeridos = [];
    this.lat = null;
    this.lng = null;
    this.encuesta = {
      alias: '',
      edad: '',
      rol: '',
      videojuego: '',
      imagen_url: '',
      ubicacion: '',
      plataforma: '',
      genero: '',
      comentario: ''
    };
    // Opcional: limpiar también el puente del servicio si solo quieres usar la ubicación una vez
    // this.firebaseService.ultimaUbicacionCapturada = '';
  }
}