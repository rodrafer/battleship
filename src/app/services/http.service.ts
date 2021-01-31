import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getUserSavedGames(uid: string): Observable<any> {
    return this.http.get<any>(`/api/${uid}/saved-games`)
  }
}
