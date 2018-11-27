import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnReqComponent } from './btn-req.component';

describe('BtnReqComponent', () => {
  let component: BtnReqComponent;
  let fixture: ComponentFixture<BtnReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
