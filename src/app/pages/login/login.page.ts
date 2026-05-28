import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonText,
  IonCard,
  IonCardContent,
  IonIcon
} from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SupabaseService } from '../../services/supabase.service';

import { addIcons } from 'ionicons';
import {
  mailOutline,
  lockClosedOutline,
  gameController
} from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonText,
    IonCard,
    IonCardContent,
    IonIcon
  ]
})
export class LoginPage {

  email = '';
  password = '';
  mensaje = '';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {

    addIcons({
      mailOutline,
      lockClosedOutline,
      gameController
    });

  }

  async login() {

    this.mensaje = '';

    if (!this.email || !this.password) {
      this.mensaje = 'Completa todos los campos';
      return;
    }

    const { error } = await this.supabaseService.login(
      this.email,
      this.password
    );

    if (error) {
      this.mensaje = error.message;
      return;
    }

    this.router.navigateByUrl('/home');

  }

  async register() {

    this.mensaje = '';

    if (!this.email || !this.password) {
      this.mensaje = 'Completa todos los campos';
      return;
    }

    const { error } = await this.supabaseService.register(
      this.email,
      this.password
    );

    if (error) {
      this.mensaje = error.message;
      return;
    }

    this.mensaje = 'Usuario registrado correctamente';

  }

}