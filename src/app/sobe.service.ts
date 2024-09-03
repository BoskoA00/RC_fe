import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlLocal } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SobeService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(urlLocal + 'Soba');
  }
  getSobaById(id: string) {
    return this.http.get<any>(urlLocal + 'Soba/' + id);
  }
  getSobaByBrojSobe(brojSobe: string) {
    return this.http.get<any>(urlLocal + 'Soba/byBrojSobe/' + brojSobe);
  }
  createSoba(data: any) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<any>(
      urlLocal + 'Soba',
      {
        brojSobe: data.brojSobe,
        status: data.status,
      },
      { headers }
    );
  }
  updateSoba(data: any, id: number) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.put<any>(
      urlLocal + 'Soba/' + id,
      {
        brojSobe: data.brojSobe,
      },
      { headers }
    );
  }
  deleteSoba(id: number) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<any>(urlLocal + 'Soba/' + id, { headers });
  }
  reserveRoom(brojSobe: string) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.put<any>(
      urlLocal + 'Soba/reserve/' + brojSobe,
      {},
      { headers }
    );
  }
  disableRoom(brojSobe: string) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.put<any>(
      urlLocal + 'Soba/disable/' + brojSobe,
      {},
      { headers }
    );
  }
  freeRoom(brojSobe: string) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.put<any>(
      urlLocal + 'Soba/free/' + brojSobe,
      {},
      { headers }
    );
  }
}
