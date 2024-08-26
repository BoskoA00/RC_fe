import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobeComponent } from './sobe.component';

describe('SobeComponent', () => {
  let component: SobeComponent;
  let fixture: ComponentFixture<SobeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SobeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
