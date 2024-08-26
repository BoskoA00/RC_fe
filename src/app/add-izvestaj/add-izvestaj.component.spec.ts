import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIzvestajComponent } from './add-izvestaj.component';

describe('AddIzvestajComponent', () => {
  let component: AddIzvestajComponent;
  let fixture: ComponentFixture<AddIzvestajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIzvestajComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIzvestajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
