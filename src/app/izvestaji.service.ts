import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { urlLocal } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IzvestajiService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(urlLocal + 'Izvestaj');
  }
  getIzvestajById(id: number) {
    return this.http.get<any>(urlLocal + 'Izvestaj/' + id);
  }
  getIzvestajByCode(code: string) {
    return this.http.get<any>(urlLocal + 'Izvestaj/getByCode/' + code);
  }
  getIzvestajByDoktor(idDoktora: number) {
    return this.http.get<any[]>(urlLocal + 'Izvestaj/byDoktor/' + idDoktora);
  }
  getIzvestajByPacijent(idPacijenta: number) {
    return this.http.get<any[]>(
      urlLocal + 'Izvestaj/byPacijent/' + idPacijenta
    );
  }
  createIzvestaj(data: any) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<any>(
      urlLocal + 'Izvestaj',
      {
        sadrzaj: data.sadrzaj,
        sifra: data.sifra,
        idPacijenta: data.idPacijenta,
        idDoktora: data.idDoktora,
        vremeStvaranja: data.vremeStvaranja,
      },
      { headers }
    );
  }
  deleteIzvestaj(id: number) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<any>(urlLocal + 'Izvestaj/' + id, { headers });
  }
  updateIzvestaj(id: number, sadrzaj: string) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.put<any>(
      urlLocal + 'Izvestaj/' + id,
      {
        sadrzaj: sadrzaj,
      },
      { headers }
    );
  }
  deleteIzvestajByCode(code: string) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<any>(urlLocal + 'Izvestaj/deleteByCode/' + code, {
      headers,
    });
  }
  deleteIzvestajByDoktor(idDoktora: number) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<any>(
      urlLocal + 'Izvestaj/deleteByDoktorId/' + idDoktora,
      { headers }
    );
  }
  deleteIzvestajByPacijent(idPacijenta: number) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<any>(
      urlLocal + 'Izvestaj/deleteByPacijentId/' + idPacijenta,
      { headers }
    );
  }
}
