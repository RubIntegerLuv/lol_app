import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RiotApiService {
  private DATA_DRAGON_URL = 'https://ddragon.leagueoflegends.com/cdn/13.21.1/data/es_MX'; // Idioma configurado a español (Latinoamérica)

  constructor(private http: HttpClient) {}

  // Obtener la lista de campeones
  getChampions(): Observable<any> {
    return this.http.get(`${this.DATA_DRAGON_URL}/champion.json`);
  }

  // Obtener detalles de un campeón por su nombre
  getChampionDetails(name: string): Observable<any> {
    return this.http.get(`${this.DATA_DRAGON_URL}/champion/${name}.json`);
  }
}
