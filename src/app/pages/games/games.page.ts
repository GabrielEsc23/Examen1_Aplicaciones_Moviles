import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonInput,
    IonButton,
  ]
})
export class GamesPage {

  gameName: string = '';

  filteredGames: any[] = [];

  selectedGame: any;

  constructor(private gameService: GameService) {}

  searchGame() {

    this.gameService.getGames().subscribe({

      next: (data) => {

        this.filteredGames = data.filter((game: any) =>

          game.title
            .toLowerCase()
            .includes(this.gameName.toLowerCase())

        );

      },

      error: (err) => {
        console.log(err);
      }

    });

  }

  selectGame(game: any) {

    this.selectedGame = game;

    console.log('Juego seleccionado:', game);

  }

}