import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallitemsComponent } from './viewallitems.component';

describe('ViewallitemsComponent', () => {
  let component: ViewallitemsComponent;
  let fixture: ComponentFixture<ViewallitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewallitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewallitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
