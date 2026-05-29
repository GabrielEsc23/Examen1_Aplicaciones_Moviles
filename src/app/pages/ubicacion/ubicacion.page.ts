import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Browser } from '@capacitor/browser';
import { SupabaseService } from '../../services/supabase.service';
import { FirebaseService } from '../../services/firebase.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { locationOutline, navigateOutline, mapOutline, businessOutline } from 'ionicons/icons';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
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
    addIcons({ locationOutline, navigateOutline, mapOutline, businessOutline });
  }

  async registrarUbicacion() {
    this.cargando = true;
    try {
      const { data: { user } } = await this.supabaseService.supabase.auth.getUser();
      const usuarioActual = user?.email || 'usuario_desconocido';

      const coordinates = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      this.latitud = coordinates.coords.latitude;
      this.longitud = coordinates.coords.longitude;

      this.lugar = this.obtenerLugar(this.latitud, this.longitud);

      // ACTUALIZAR PUENTE COMPLETO
      this.firebaseService.ultimaUbicacionCapturada = this.lugar;
      this.firebaseService.ultimaLatitud = this.latitud;
      this.firebaseService.ultimaLongitud = this.longitud;

      const data = {
        latitud: this.latitud,
        longitud: this.longitud,
        lugar: this.lugar,
        fecha: new Date().toISOString(),
        usuario: usuarioActual
      };

      await this.firebaseService.guardarUbicacion(data);
      this.cargando = false;
      alert('Ubicación: ' + this.lugar);

    } catch (err: any) {
      this.cargando = false;
      alert('Error: ' + err.message);
    }
  }

  obtenerLugar(lat: number, lng: number): string {
    // Rango general aproximado Campus EPN
    const enCampus = (lat <= -0.2080 && lat >= -0.2150 && lng <= -78.4850 && lng >= -78.4950);
    
    if (!enCampus) return 'Fuera del Campus EPN';

    // Puntos específicos
    if (lat > -0.2100 && lat < -0.2090 && lng > -78.4890 && lng < -78.4880) return 'Biblioteca';
    if (lat > -0.2110 && lat < -0.2100 && lng > -78.4900 && lng < -78.4890) return 'Cafetería';
    if (lat > -0.2120 && lat < -0.2110 && lng > -78.4910 && lng < -78.4900) return 'Laboratorio';
    
    return 'Patios / Áreas EPN';
  }

  async abrirMapa() {
    if (this.latitud && this.longitud) {
      const url = `https://www.google.com/maps/search/?api=1&query=${this.latitud},${this.longitud}`;
      await Browser.open({ url: url });
    }
  }
}