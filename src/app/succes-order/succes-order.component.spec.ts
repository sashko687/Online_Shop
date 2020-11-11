import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesOrderComponent } from './succes-order.component';

describe('SuccesOrderComponent', () => {
  let component: SuccesOrderComponent;
  let fixture: ComponentFixture<SuccesOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccesOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
