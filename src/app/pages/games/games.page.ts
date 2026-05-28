import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { GameService } from '../../services/game';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class GamesPage implements OnInit {

  games: any[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.gameService.getGames().subscribe({
      next: (data) => {
        console.log(data);
        this.games = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}