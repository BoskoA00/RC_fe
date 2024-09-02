import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/Interfaces/User';
import { urlLocal } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedIn: boolean = false;
  loggedUser: User | null = null;

  constructor(private http: HttpClient) {
    this.loadUserFromLocalStorage();
  }

  login(data: any) {
    return this.http.post<any>(urlLocal + 'users/login', {
      userName: data.userName,
      password: data.password,
    });
  }

  registerUser(data: any) {
    return this.http.post<any>(urlLocal + 'users', {
      userName: data.userName,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      role: '0',
      kontakt: data.kontakt,
      datumRodjenja: data.datumRodjenja,
    });
  }

  getAllUsers() {
    return this.http.get<any[]>(urlLocal + 'users');
  }

  getUserById(id: number) {
    return this.http.get<any>(urlLocal + 'users/' + id);
  }

  updateUser(data: any, id: number) {
    return this.http.put<any>(urlLocal + 'users/' + id, {
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      password: data.password,
      role: data.role,
      kontakt: data.kontakt,
      datumRodjenja: data.datumROdjenja,
    });
  }

  deleteUser(id: number) {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log(headers);
    return this.http.delete<any>(`${urlLocal}users/${id}`, { headers });
  }

  getUserByUsername(userName: string) {
    return this.http.get<any>(urlLocal + 'users/username/' + userName);
  }

  getUsersByRole(role: number) {
    return this.http.get<any[]>(urlLocal + 'users/role/' + role);
  }

  saveUserToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  loadUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      this.loggedUser = JSON.parse(user);
      this.loggedIn = true;
    }
  }

  clearUserFromLocalStorage() {
    localStorage.removeItem('user');
    this.loggedUser = null;
    this.loggedIn = false;
  }
  promoteUser(id: number) {
    return this.http.put<any>(urlLocal + 'users/promoteUser/' + id, {});
  }
  demoteUser(id: number) {
    return this.http.put<any>(urlLocal + 'users/demoteUser/' + id, {});
  }
}
