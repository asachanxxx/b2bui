import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatelogsearchComponent } from './catelogsearch.component';

describe('CatelogsearchComponent', () => {
  let component: CatelogsearchComponent;
  let fixture: ComponentFixture<CatelogsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatelogsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatelogsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
