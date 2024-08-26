import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTerapijeComponent } from './edit-terapije.component';

describe('EditTerapijeComponent', () => {
  let component: EditTerapijeComponent;
  let fixture: ComponentFixture<EditTerapijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTerapijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTerapijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
