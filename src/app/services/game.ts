import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl =
    'https://www.freetogame.com/api/games';

  constructor(
    private http: HttpClient
  ) {}

  getGames(): Observable<any> {

    return this.http.get<any>(this.apiUrl);

  }

}