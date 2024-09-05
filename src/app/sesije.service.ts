import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from 'src/Interfaces/Session';
import { urlLocal } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SesijeService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Session[]>(urlLocal + 'Session');
  }
  getSesijaById(id: number) {
    return this.http.get<Session>(urlLocal + 'Session/' + id);
  }
  getSesijaByTerapijaId(id: number) {
    return this.http.get<Session[]>(
      urlLocal + 'Session/SessionsByTherapy/' + id
    );
  }
  getSesijaByIdPacijenta(id: number) {
    return this.http.get<Session[]>(
      urlLocal + 'Session/SessionsBtPatientId/' + id
    );
  }
  getSesijaByIDDoktor(id: number) {
    return this.http.get<Session[]>(
      urlLocal + 'Session/SessionsByDoctorId/' + id
    );
  }
  getSesijaByTerapijaCode(code: string) {
    return this.http.get<Session[]>(
      urlLocal + 'Session/SessionsByTherapyCode/' + code
    );
  }
  createSesija(data: any) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.post<any>(
      urlLocal + 'Session',
      {
        roomId: data.idSobe,
        therapyId: data.idTerapije,
        dateTime: data.termin,
      },
      { headers }
    );
  }
  deleteSesija(id: number) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<any>(urlLocal + 'Session/' + id, { headers });
  }
  deleteSesijaByTerapija(id: number) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<any>(urlLocal + 'Session/Therapies/' + id, {
      headers,
    });
  }
  updateSesija(data: any, id: number) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.put<any>(
      urlLocal + 'Session/' + id,
      {
        dateTime: data.termin,
      },
      { headers }
    );
  }
}
