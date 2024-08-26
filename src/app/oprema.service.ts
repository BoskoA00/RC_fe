import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlLocal } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OpremaService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(urlLocal + 'Oprema');
  }
  getOpremaById(id: number) {
    return this.http.get<any>(urlLocal + 'Oprema/' + id);
  }
  getOpremaBySobaBr(brojSobe: string) {
    return this.http.get<any>(urlLocal + 'Oprema/BySobaBr/' + brojSobe);
  }
  getOpremaBySobaId(id: number) {
    return this.http.get<any>(urlLocal + 'Oprema/BySobaId/' + id);
  }
  createOprema(data: any) {
    return this.http.post<any>(urlLocal + 'Oprema', {
      sifra: data.sifra,
      naziv: data.naziv,
      idSobe: data.idSobe,
      poslednjeOdrzavanje: data.poslednjeOdrzavanje,
    });
  }
  updateOprema(id: number, data: any) {
    return this.http.put<any>(urlLocal + 'Oprema/' + id, {
      sifra: data.sifra,
      naziv: data.naziv,
      idSobe: data.idSobe,
      poslednjeOdrzavanje: data.poslednjeOdrzavanje,
    });
  }
  deleteOprema(id: number) {
    return this.http.delete<any>(urlLocal + 'Oprema/' + id);
  }
  checkSifra(sifra: string) {
    return this.http.get<boolean>(urlLocal + 'Oprema/sifraTaken/' + sifra);
  }
}
