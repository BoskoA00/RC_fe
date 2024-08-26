import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSobaComponent } from './add-soba.component';

describe('AddSobaComponent', () => {
  let component: AddSobaComponent;
  let fixture: ComponentFixture<AddSobaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSobaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSobaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
