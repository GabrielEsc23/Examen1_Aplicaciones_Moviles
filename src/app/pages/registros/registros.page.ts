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
  gameControllerOutline, personOutline, locationOutline, 
  calendarOutline, chatbubbleOutline, navigateOutline, mapOutline
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
      gameControllerOutline, personOutline, locationOutline, 
      calendarOutline, chatbubbleOutline, navigateOutline, mapOutline 
    });
  }

  async ionViewWillEnter() {
    await this.obtenerDatos();
  }

  async obtenerDatos() {
    // Traemos únicamente las encuestas, las cuales ya contienen la ubicación acoplada
    try {
      this.registros = await this.firebaseService.getEncuestas();
    } catch (error) {
      console.error("Error al mapear registros unificados:", error);
      this.registros = [];
    }
  }

  async doRefresh(event: any) {
    await this.obtenerDatos();
    event.target.complete();
  }
}