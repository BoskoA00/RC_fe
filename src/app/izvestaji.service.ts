import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { urlLocal } from 'src/environments/environment';
import { Izvestaj } from 'src/Interfaces/Izvestaj';

@Injectable({
  providedIn: 'root',
})
export class IzvestajiService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Izvestaj[]>(urlLocal + 'Report');
  }
  getIzvestajById(id: number) {
    return this.http.get<Izvestaj>(urlLocal + 'Report/' + id);
  }
  getIzvestajByCode(code: string) {
    return this.http.get<Izvestaj>(urlLocal + 'Report/getByCode/' + code);
  }
  getIzvestajByDoktor(idDoktora: number) {
    return this.http.get<Izvestaj[]>(urlLocal + 'Report/byDoctor/' + idDoktora);
  }
  getIzvestajByPacijent(idPacijenta: number) {
    return this.http.get<Izvestaj[]>(
      urlLocal + 'Report/byPatient/' + idPacijenta
    );
  }
  createIzvestaj(data: any) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<any>(
      urlLocal + 'Report',
      {
        content: data.sadrzaj,
        code: data.sifra,
        patientId: data.idPacijenta,
        doctorId: data.idDoktora,
        creationTime: data.vremeStvaranja,
      },
      { headers }
    );
  }
  deleteIzvestaj(id: number) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<any>(urlLocal + 'Report/' + id, { headers });
  }
  updateIzvestaj(id: number, sadrzaj: string) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.put<any>(
      urlLocal + 'Report/' + id,
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
    return this.http.delete<any>(urlLocal + 'Report/deleteByCode/' + code, {
      headers,
    });
  }
  deleteIzvestajByDoktor(idDoktora: number) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<any>(
      urlLocal + 'Report/deleteByDoctorId/' + idDoktora,
      { headers }
    );
  }
  deleteIzvestajByPacijent(idPacijenta: number) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<any>(
      urlLocal + 'Report/deleteByPatientId/' + idPacijenta,
      { headers }
    );
  }
}
