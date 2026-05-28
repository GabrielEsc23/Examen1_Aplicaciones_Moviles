import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonicModule
} from '@ionic/angular';

import { GameService } from '../../services/game';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class EncuestaPage {

  survey = {

    alias: '',
    edad: '',
    rol: '',
    comentario: ''

  };

  gameName: string = '';

  filteredGames: any[] = [];

  selectedGame: any;

  constructor(
    private gameService: GameService
  ) {}

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

  saveSurvey() {

    const surveyData = {

      alias: this.survey.alias,

      edad: this.survey.edad,

      rol: this.survey.rol,

      comentario: this.survey.comentario,

      videojuego: this.selectedGame?.title,

      genero: this.selectedGame?.genre,

      plataforma: this.selectedGame?.platform,

      imagen: this.selectedGame?.thumbnail,

      descripcion: this.selectedGame?.short_description,

      fecha: new Date()

    };

    console.log('Encuesta guardada:', surveyData);

  }

}