import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOpremaComponent } from './add-oprema.component';

describe('AddOpremaComponent', () => {
  let component: AddOpremaComponent;
  let fixture: ComponentFixture<AddOpremaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOpremaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOpremaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
