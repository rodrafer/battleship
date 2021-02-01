import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardPoint, LoadedGameData, PlayedGameData, SavedGameData } from '../constants/interfaces';
import { AngularFireAuth } from '@angular/fire/auth';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const httpOptionsWithAuthToken = token => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'AuthToken': token,
  })
});

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth
  ) { }

  getUserSavedGames(uid: string): Observable<SavedGameData[]> {
    return this.http.get<SavedGameData[]>(`/api/${uid}/saved-games`);
  }

  getUserPlayedGames(uid: string): Observable<PlayedGameData[]> {
    return this.http.get<PlayedGameData[]>(`/api/${uid}/played-games`);
  }

  registerSavedGame(uid: string, payload: SavedGameData): Observable<SavedGameData> {
    return this.http.post<SavedGameData>(
      `/api/${uid}/saved-games`,
      payload,
      httpOptions
    );
  }

  registerPlayedGame(uid: string, payload: PlayedGameData): Observable<PlayedGameData> {
    return this.http.post<PlayedGameData>(
      `/api/${uid}/played-games`,
      payload,
      httpOptions
    );
  }

  addShipPosition(uid: string, gid: string, payload: BoardPoint): Observable<BoardPoint> {
    return this.http.post<BoardPoint>(
      `/api/${uid}/ship-position/${gid}`,
      payload,
      httpOptions
    );
  }

  addClickedCellId(uid: string, gid: string, payload: string): Observable<string> {
    return this.http.post<string>(
      `/api/${uid}/cell-id/${gid}`,
      { cellId: payload },
      httpOptions
    );
  }

  getSavedGameStatus(uid: string, gid: string): Observable<any> {
    return this.http.get<any>(`/api/${uid}/saved-game-status/${gid}`);
  }

  updateSavedGame(uid: string, gid: string, payload: SavedGameData): Observable<SavedGameData> {
    return this.http.post<SavedGameData>(
      `/api/${uid}/save-game/${gid}`,
      payload,
      httpOptions
    );
  }
}
