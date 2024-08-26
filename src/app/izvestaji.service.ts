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
    return this.http.post<any>(urlLocal + 'Izvestaj', {
      sadrzaj: data.sadrzaj,
      sifra: data.sifra,
      idPacijenta: data.idPacijenta,
      idDoktora: data.idDoktora,
      vremeStvaranja: data.vremeStvaranja,
    });
  }
  deleteIzvestaj(id: number) {
    return this.http.delete<any>(urlLocal + 'Izvestaj/' + id);
  }
  updateIzvestaj(id: number, sadrzaj: string) {
    return this.http.put<any>(urlLocal + 'Izvestaj/' + id, {
      sadrzaj: sadrzaj,
    });
  }
  deleteIzvestajByCode(code: string) {
    return this.http.delete<any>(urlLocal + 'Izvestaj/deleteByCode/' + code);
  }
  deleteIzvestajByDoktor(idDoktora: number) {
    return this.http.delete<any>(
      urlLocal + 'Izvestaj/deleteByDoktorId/' + idDoktora
    );
  }
  deleteIzvestajByPacijent(idPacijenta: number) {
    return this.http.delete<any>(
      urlLocal + 'Izvestaj/deleteByPacijentId/' + idPacijenta
    );
  }
}
