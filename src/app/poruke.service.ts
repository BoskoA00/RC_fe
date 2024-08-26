import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlLocal } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PorukeService {
  constructor(private http: HttpClient) {}

  getMessages(id: number) {
    return this.http.get<any[]>(urlLocal + `Message/getMessagesByUser/` + id);
  }
  createMessages(data: any) {
    return this.http.post<any>(urlLocal + 'Message', data);
  }
  readMessage(id: number) {
    return this.http.put<any>(urlLocal + `Message/${id}`, {});
  }
}
