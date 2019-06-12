import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandandmodelComponent } from './brandandmodel.component';

describe('BrandandmodelComponent', () => {
  let component: BrandandmodelComponent;
  let fixture: ComponentFixture<BrandandmodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandandmodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandandmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
