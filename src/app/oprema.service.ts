import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlLocal } from 'src/environments/environment';
import { Oprema } from 'src/Interfaces/Oprema';

@Injectable({
  providedIn: 'root',
})
export class OpremaService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Oprema[]>(urlLocal + 'Equipment');
  }
  getOpremaById(id: number) {
    return this.http.get<Oprema>(urlLocal + 'Equipment/' + id);
  }
  getOpremaBySobaBr(brojSobe: string) {
    return this.http.get<Oprema>(
      urlLocal + 'Equipment/ByRoomNumber/' + brojSobe
    );
  }
  getOpremaBySobaId(id: number) {
    return this.http.get<Oprema>(urlLocal + 'Equipment/ByRoomId/' + id);
  }
  createOprema(data: any) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<any>(
      urlLocal + 'Equipment',
      {
        code: data.sifra,
        name: data.naziv,
        roomId: data.idSobe,
        lastMaintenance: data.poslednjeOdrzavanje,
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
      urlLocal + 'Equipment/' + id,
      {
        code: data.sifra,
        name: data.naziv,
        roomId: data.idSobe,
        lastMaintenance: data.poslednjeOdrzavanje,
      },
      { headers }
    );
  }
  deleteOprema(id: number) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<any>(urlLocal + 'Equipment/' + id, { headers });
  }
  checkSifra(sifra: string) {
    return this.http.get<boolean>(urlLocal + 'Equipment/codeTaken/' + sifra);
  }
}
