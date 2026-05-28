import { Component } from '@angular/core';

import { Geolocation } from '@capacitor/geolocation';

import { Browser } from '@capacitor/browser';

import { SupabaseService } from '../../services/supabase.service';

import { FirebaseService } from '../../services/firebase.service';

import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';

import { addIcons } from 'ionicons';

import {
  locationOutline,
  navigateOutline,
  mapOutline,
  businessOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class UbicacionPage {

  latitud: number | null = null;

  longitud: number | null = null;

  lugar: string = '';

  cargando = false;

  constructor(
    private supabaseService: SupabaseService,
    private firebaseService: FirebaseService
  ) {

    addIcons({

      'location-outline':
      locationOutline,

      'navigate-outline':
      navigateOutline,

      'map-outline':
      mapOutline,

      'business-outline':
      businessOutline

    });

  }

  async registrarUbicacion() {

    this.cargando = true;

    try {

      // USUARIO ACTUAL
      const {
        data: { user }
      } = await this.supabaseService
        .supabase
        .auth
        .getUser();

      const usuarioActual =
        user?.email || 'usuario_desconocido';

      // =========================
      // WEB
      // =========================

      if (window.location.protocol.startsWith('http')) {

        if (!navigator.geolocation) {

          alert('Geolocalización no soportada');

          this.cargando = false;

          return;

        }

        navigator.geolocation.getCurrentPosition(

          async (position) => {

            this.latitud =
              position.coords.latitude;

            this.longitud =
              position.coords.longitude;

            // DETECTAR LUGAR
            this.lugar = this.obtenerLugar(
              this.latitud,
              this.longitud
            );

            const data = {

              latitud: this.latitud,

              longitud: this.longitud,

              lugar: this.lugar,

              fecha: new Date().toISOString(),

              usuario: usuarioActual

            };

            // GUARDAR EN FIREBASE
            await this.firebaseService
              .guardarUbicacion(data);

            this.cargando = false;

            alert(
              'Ubicación guardada correctamente'
            );

          },

          (error) => {

            console.error(error);

            this.cargando = false;

            alert(
              'Error obteniendo ubicación'
            );

          },

          {

            enableHighAccuracy: true,

            timeout: 15000,

            maximumAge: 0

          }

        );

        return;

      }

      // =========================
      // MÓVIL
      // =========================

      const checkStatus =
        await Geolocation.checkPermissions();

      if (checkStatus.location !== 'granted') {

        const requestStatus =
          await Geolocation.requestPermissions();

        if (requestStatus.location !== 'granted') {

          alert(
            'Debes aceptar los permisos'
          );

          this.cargando = false;

          return;

        }

      }

      const coordinates =
        await Geolocation.getCurrentPosition({

          enableHighAccuracy: true

        });

      this.latitud =
        coordinates.coords.latitude;

      this.longitud =
        coordinates.coords.longitude;

      // DETECTAR LUGAR
      this.lugar = this.obtenerLugar(
        this.latitud,
        this.longitud
      );

      const data = {

        latitud: this.latitud,

        longitud: this.longitud,

        lugar: this.lugar,

        fecha: new Date().toISOString(),

        usuario: usuarioActual

      };

      // GUARDAR EN FIREBASE
      await this.firebaseService
        .guardarUbicacion(data);

      this.cargando = false;

      alert(
        'Ubicación guardada correctamente'
      );

    } catch (err: any) {

      console.error(err);

      this.cargando = false;

      alert(
        'Error: ' + err.message
      );

    }

  }

  // =========================
  // DETECTAR LUGAR DEL CAMPUS
  // =========================

  obtenerLugar(
    lat: number,
    lng: number
  ): string {

    // BIBLIOTECA
    if (

      lat > -0.2100 &&
      lat < -0.2090 &&

      lng > -78.4890 &&
      lng < -78.4880

    ) {

      return 'Biblioteca';

    }

    // CAFETERÍA
    if (

      lat > -0.2110 &&
      lat < -0.2100 &&

      lng > -78.4900 &&
      lng < -78.4890

    ) {

      return 'Cafetería';

    }

    // LABORATORIO
    if (

      lat > -0.2120 &&
      lat < -0.2110 &&

      lng > -78.4910 &&
      lng < -78.4900

    ) {

      return 'Laboratorio';

    }

    // ENTRADA PRINCIPAL
    if (

      lat > -0.2130 &&
      lat < -0.2120 &&

      lng > -78.4920 &&
      lng < -78.4910

    ) {

      return 'Entrada Principal';

    }

    // POR DEFECTO
    return 'Patio Central';

  }

  async abrirMapa() {

    if (
      this.latitud &&
      this.longitud
    ) {

      const url =
        `https://www.google.com/maps?q=${this.latitud},${this.longitud}`;

      await Browser.open({
        url: url
      });

    } else {

      alert(
        'No hay coordenadas registradas'
      );

    }

  }

}