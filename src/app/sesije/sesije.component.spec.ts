import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesijeComponent } from './sesije.component';

describe('SesijeComponent', () => {
  let component: SesijeComponent;
  let fixture: ComponentFixture<SesijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SesijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
