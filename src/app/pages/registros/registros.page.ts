import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, 
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, 
  IonCardContent, IonImg, IonIcon, IonItem, IonLabel,
  IonList, IonRefresher, IonRefresherContent, IonBadge
} from '@ionic/angular/standalone';
import { FirebaseService } from '../../services/firebase.service';
import { addIcons } from 'ionicons';
import { 
  gameControllerOutline, 
  personOutline, 
  locationOutline, 
  calendarOutline, 
  chatbubbleOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
    IonImg, IonIcon, IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, IonBadge
  ]
})
export class RegistrosPage {
  public registros: any[] = [];

  constructor(private firebaseService: FirebaseService) {
    addIcons({ 
      gameControllerOutline, 
      personOutline, 
      locationOutline, 
      calendarOutline, 
      chatbubbleOutline 
    });
  }

  // Se ejecuta cada vez que el usuario entra a la pestaña
  async ionViewWillEnter() {
    await this.obtenerDatos();
  }

  async obtenerDatos() {
    try {
      this.registros = await this.firebaseService.getEncuestas();
      console.log("Datos cargados:", this.registros);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  }

  async doRefresh(event: any) {
    await this.obtenerDatos();
    event.target.complete();
  }
} 