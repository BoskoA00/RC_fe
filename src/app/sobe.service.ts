import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlLocal } from 'src/environments/environment';
import { Soba } from 'src/Interfaces/Soba';

@Injectable({
  providedIn: 'root',
})
export class SobeService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Soba[]>(urlLocal + 'Room');
  }
  getSobaById(id: string) {
    return this.http.get<Soba>(urlLocal + 'Room/' + id);
  }
  getSobaByBrojSobe(brojSobe: string) {
    return this.http.get<Soba>(urlLocal + 'Room/byRoomNumber/' + brojSobe);
  }
  createSoba(data: any) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<any>(
      urlLocal + 'Room',
      {
        roomNumber: data.brojSobe,
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
      urlLocal + 'Room/' + id,
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
    return this.http.delete<any>(urlLocal + 'Room/' + id, { headers });
  }
  reserveRoom(brojSobe: string) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.put<any>(
      urlLocal + 'Room/reserve/' + brojSobe,
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
      urlLocal + 'Room/disable/' + brojSobe,
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
      urlLocal + 'Room/free/' + brojSobe,
      {},
      { headers }
    );
  }
}
