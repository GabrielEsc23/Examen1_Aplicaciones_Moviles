import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Importamos Router
import { SupabaseService } from '../services/supabase.service'; // Ajusta la ruta si es necesario
import { addIcons } from 'ionicons';
import {
  gameControllerOutline,
  documentTextOutline,
  locationOutline,
  cameraOutline,
  albumsOutline,
  logOutOutline // Icono de salida
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ]
})
export class HomePage {

  constructor(
    private supabaseService: SupabaseService, 
    private router: Router
  ) {
    addIcons({
      'game-controller-outline': gameControllerOutline,
      'document-text-outline': documentTextOutline,
      'location-outline': locationOutline,
      'camera-outline': cameraOutline,
      'albums-outline': albumsOutline,
      'log-out-outline': logOutOutline
    });
  }

  async logout() {
    try {
      // 1. Cerramos sesión en Supabase
      await this.supabaseService.supabase.auth.signOut();
      
      // 2. Redirigimos al Login (ajusta '/login' si tu ruta tiene otro nombre)
      this.router.navigateByUrl('/login', { replaceUrl: true });
      
      console.log('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}