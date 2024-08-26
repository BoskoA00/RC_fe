import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTerapijeComponent } from './add-terapije.component';

describe('AddTerapijeComponent', () => {
  let component: AddTerapijeComponent;
  let fixture: ComponentFixture<AddTerapijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTerapijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTerapijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
