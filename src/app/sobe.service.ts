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
    return this.http.post<any>(urlLocal + 'Soba', {
      brojSobe: data.brojSobe,
      status: data.status,
    });
  }
  updateSoba(data: any, id: number) {
    return this.http.put<any>(urlLocal + 'Soba/' + id, {
      brojSobe: data.brojSobe,
    });
  }
  deleteSoba(id: number) {
    return this.http.delete<any>(urlLocal + 'Soba/' + id);
  }
  reserveRoom(brojSobe: string) {
    return this.http.put<any>(urlLocal + 'Soba/reserve/' + brojSobe, {});
  }
  disableRoom(brojSobe: string) {
    return this.http.put<any>(urlLocal + 'Soba/disable/' + brojSobe, {});
  }
  freeRoom(brojSobe: string) {
    return this.http.put<any>(urlLocal + 'Soba/free/' + brojSobe, {});
  }
}
