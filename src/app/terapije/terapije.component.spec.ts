import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerapijeComponent } from './terapije.component';

describe('TerapijeComponent', () => {
  let component: TerapijeComponent;
  let fixture: ComponentFixture<TerapijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerapijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerapijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
