import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Terapija } from 'src/Interfaces/Terapija';
import { urlLocal } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TerapijeService {
  constructor(private http: HttpClient) {}

  getAllTerapije() {
    return this.http.get<any[]>(urlLocal + 'Terapije');
  }
  getTerapijaById(id: number) {
    return this.http.get<any>(urlLocal + 'Terapije/' + id);
  }
  createTerapija(terapija: any) {
    return this.http.post<any>(urlLocal + 'Terapije', {
      sifra: terapija.sifra,
      idPacijenta: terapija.idPacijenta,
      idDoktora: terapija.idDoktora,
      datumPocetka: terapija.datumPocetka,
      datumKraja: terapija.datumKraja,
      brojSesija: terapija.brojSesija,
      sadrzaj: terapija.sadrzaj,
    });
  }
  updateTerapija(terapija: any) {
    return this.http.put<any>(urlLocal + 'Terapije', {
      id: terapija.id,
      sifra: terapija.sifra,
      datumPocetka: terapija.datumPocetka,
      datumKraja: terapija.datumKraja,
      sadrzaj: terapija.sadrzaj,
      brojSesija: terapija.brojSesija,
    });
  }

  deleteTerapija(id: number) {
    return this.http.delete<any>(urlLocal + 'Terapije/' + id);
  }
  getTerapijaByCode(code: string) {
    return this.http.get<any>(urlLocal + 'Terapije/code/' + code);
  }
  deleteTerapijaByCode(code: string) {
    return this.http.delete<any>(urlLocal + 'Terapije/code/' + code);
  }
  getTerapijeByPacijent(id: number) {
    return this.http.get<any[]>(urlLocal + 'Terapije/pacijent/' + id);
  }
  getTerapijeByDoktor(id: number) {
    return this.http.get<any[]>(urlLocal + 'Terapije/doktor/' + id);
  }
}
