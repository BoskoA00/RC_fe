import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlLocal } from 'src/environments/environment';
import { Therapy } from 'src/Interfaces/Therapy';
@Injectable({
  providedIn: 'root',
})
export class TerapijeService {
  constructor(private http: HttpClient) {}

  getAllTerapije() {
    return this.http.get<Therapy[]>(urlLocal + 'Therapy');
  }
  getTerapijaById(id: number) {
    return this.http.get<Therapy>(urlLocal + 'Therapy/' + id);
  }
  createTerapija(terapija: any) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<any>(
      urlLocal + 'Therapy',
      {
        code: terapija.sifra,
        patientId: terapija.idPacijenta,
        doctorId: terapija.idDoktora,
        startDate: terapija.datumPocetka,
        endDate: terapija.datumKraja,
        sessionsNumber: terapija.brojSesija,
        content: terapija.sadrzaj,
      },
      { headers }
    );
  }
  updateTerapija(terapija: any) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.put<any>(
      urlLocal + 'Therapy',
      {
        id: terapija.id,
        code: terapija.code,
        startDate: terapija.startDate,
        endDate: terapija.endDate,
        content: terapija.content,
        sessionsNumber: terapija.sessionsNumber,
      },
      {
        headers,
      }
    );
  }

  deleteTerapija(id: number) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<any>(urlLocal + 'Therapy/' + id, { headers });
  }
  getTerapijaByCode(code: string) {
    return this.http.get<any>(urlLocal + 'Therapy/code/' + code);
  }
  deleteTerapijaByCode(code: string) {
    return this.http.delete<any>(urlLocal + 'Therapy/code/' + code);
  }
  getTerapijeByPacijent(id: number) {
    return this.http.get<any[]>(urlLocal + 'Therapy/patient/' + id);
  }
  getTerapijeByDoktor(id: number) {
    return this.http.get<any[]>(urlLocal + 'Therapy/doctor/' + id);
  }
}
