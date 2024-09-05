import { Component, OnInit, ViewChild } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validateLocaleAndSetLanguage } from 'typescript';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  registerForm: boolean = false;
  maksimalanDatum: string = '';
  userName: string = '';
  password: string = '';
  error: string = '';
  confirmPassword: string = '';
  confirmPasswordError: boolean = false;
  birthDate: string = '';
  contact: string = '';
  ime: string = '';
  prezime: string = '';
  userDoesntExist: boolean = false;
  wrongPassword: boolean = false;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    this.maksimalanDatum = `${year}-${month}-${day}`;
  }
  loginForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', Validators.required),
    birthDate: new FormControl('', [Validators.required]),
    formcontact: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
  });

  get LoginUsername() {
    return (this.loginForm.get('userName') as FormControl) ?? new FormControl();
  }
  get LoginPassword() {
    return (this.loginForm.get('password') as FormControl) ?? new FormControl();
  }
  get RegisterConfirmPassword() {
    return (
      (this.loginForm.get('confirmPassword') as FormControl) ??
      new FormControl()
    );
  }
  get RegisterIme() {
    return (
      (this.loginForm.get('firstName') as FormControl) ?? new FormControl()
    );
  }
  get RegisterPrezime() {
    return (this.loginForm.get('lastName') as FormControl) ?? new FormControl();
  }
  get RegisterContact() {
    return (
      (this.loginForm.get('formcontact') as FormControl) ?? new FormControl()
    );
  }
  get RegisterDatum() {
    return (
      (this.loginForm.get('birthDate') as FormControl) ?? new FormControl()
    );
  }
  confirmPasswordChange() {
    if (
      this.RegisterConfirmPassword.value.trim() !==
      this.LoginPassword.value.trim()
    ) {
      this.confirmPasswordError = true;
    } else {
      this.confirmPasswordError = false;
    }
  }
  registerFormToggle() {
    this.registerForm = !this.registerForm;
    this.userDoesntExist = false;
  }
  loginUser() {
    this.userDoesntExist = false;
    if (this.LoginUsername.invalid || this.LoginPassword.invalid) {
      return;
    }

    let data = {
      userName: this.LoginUsername.value?.trim(),
      password: this.LoginPassword.value?.trim(),
    };

    this.userService.login(data).subscribe(
      (res: any) => {
        if (res && res.korisnik && res.token) {
          localStorage.setItem('user', JSON.stringify(res.korisnik));
          this.userService.loggedUser = res.korisnik;
          localStorage.setItem('token', res.token);
          this.router.navigate(['profil']);
          this.userService.loggedIn = true;
        }
      },
      (err: any) => {
        console.log(err);
        if (err.error == 'Ne postoji korisnik sa ovim korisnickim imenom') {
          this.userDoesntExist = true;
          return;
        }
        if (err.error == 'Neodgovarajuca lozinka') {
          this.wrongPassword = true;
          return;
        }
      }
    );
  }

  registerUser() {
    const dateParts = this.birthDate.split('-');
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

    let data = {
      userName: this.userName.trim(),
      password: this.password.trim(),
      firstName: this.ime.trim(),
      lastName: this.prezime.trim(),
      contact: this.contact.trim(),
      birthDate: formattedDate,
    };

    if (this.loginForm.invalid || this.confirmPasswordError) {
      return;
    }

    this.userService.registerUser(data).subscribe(
      (res: any) => {
        this.loginForm.reset();
        this.registerForm = false;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  userNameChange(): void {
    this.userDoesntExist = false;
  }
  passwordChange(): void {
    this.wrongPassword = false;
  }
}
