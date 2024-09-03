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
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<any>(
      urlLocal + 'Oprema',
      {
        sifra: data.sifra,
        naziv: data.naziv,
        idSobe: data.idSobe,
        poslednjeOdrzavanje: data.poslednjeOdrzavanje,
      },
      { headers }
    );
  }
  updateOprema(id: number, data: any) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.put<any>(
      urlLocal + 'Oprema/' + id,
      {
        sifra: data.sifra,
        naziv: data.naziv,
        idSobe: data.idSobe,
        poslednjeOdrzavanje: data.poslednjeOdrzavanje,
      },
      { headers }
    );
  }
  deleteOprema(id: number) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<any>(urlLocal + 'Oprema/' + id, { headers });
  }
  checkSifra(sifra: string) {
    return this.http.get<boolean>(urlLocal + 'Oprema/sifraTaken/' + sifra);
  }
}
