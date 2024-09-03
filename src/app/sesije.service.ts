import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlLocal } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SesijeService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(urlLocal + 'Sesija');
  }
  getSesijaById(id: number) {
    return this.http.get<any>(urlLocal + 'Sesija/' + id);
  }
  getSesijaByTerapijaId(id: number) {
    return this.http.get<any[]>(urlLocal + 'Sesija/sesijeByTerapija/' + id);
  }
  getSesijaByIdPacijenta(id: number) {
    return this.http.get<any[]>(urlLocal + 'Sesija/sesijeByPacijentId/' + id);
  }
  getSesijaByIDDoktor(id: number) {
    return this.http.get<any[]>(urlLocal + 'Sesija/sesijeByDoktorId/' + id);
  }
  getSesijaByTerapijaCode(code: string) {
    return this.http.get<any[]>(
      urlLocal + 'Sesija/sesijeByTerapijaCode/' + code
    );
  }
  createSesija(data: any) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<any>(
      urlLocal + 'Sesija',
      {
        idSobe: data.idSobe,
        idTerapije: data.idTerapije,
        termin: data.termin,
      },
      { headers }
    );
  }
  deleteSesija(id: number) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<any>(urlLocal + 'Sesija/' + id, { headers });
  }
  deleteSesijaByTerapija(id: number) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<any>(urlLocal + 'Sesija/Terapije/' + id, {
      headers,
    });
  }
  updateSesija(data: any, id: number) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.put<any>(
      urlLocal + 'Sesija/' + id,
      {
        termin: data.termin,
      },
      { headers }
    );
  }
}
