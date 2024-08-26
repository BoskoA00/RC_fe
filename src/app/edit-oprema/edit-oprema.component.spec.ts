import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOpremaComponent } from './edit-oprema.component';

describe('EditOpremaComponent', () => {
  let component: EditOpremaComponent;
  let fixture: ComponentFixture<EditOpremaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOpremaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOpremaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
