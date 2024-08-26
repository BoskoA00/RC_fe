import { Component, OnInit } from '@angular/core';
import { SobeService } from '../sobe.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-soba',
  templateUrl: './add-soba.component.html',
  styleUrls: ['./add-soba.component.css'],
})
export class AddSobaComponent implements OnInit {
  brojSobe: string = '';
  proveraBroja: boolean = false;
  proveraInputa: boolean = false;
  constructor(private sobaService: SobeService, private router: Router) {}
  formaSobe = new FormGroup({
    brojSobe: new FormControl('', [Validators.required]),
  });
  proveraSobe() {
    this.proveraBroja = false;
    this.sobaService.getSobaByBrojSobe(this.brojSobe).subscribe(
      (data) => {
        if (data != null) {
          this.proveraBroja = true;
        } else {
          this.proveraBroja = false;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  get BrojSobe() {
    return (this.formaSobe.get('brojSobe') as FormControl) ?? new FormControl();
  }
  addSoba() {
    const data = {
      brojSobe: this.brojSobe,
      status: 0,
    };
    if (this.proveraBroja == false && this.formaSobe.valid) {
      this.sobaService.createSoba(data).subscribe((d) => {
        this.router.navigate(['sobe']);
      });
    }
  }
  ngOnInit(): void {}
}
