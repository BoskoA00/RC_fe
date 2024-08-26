import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIzvestajiComponent } from './edit-izvestaji.component';

describe('EditIzvestajiComponent', () => {
  let component: EditIzvestajiComponent;
  let fixture: ComponentFixture<EditIzvestajiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIzvestajiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIzvestajiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
