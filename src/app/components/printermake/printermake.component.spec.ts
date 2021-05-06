import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintermakeComponent } from './printermake.component';

describe('PrintermakeComponent', () => {
  let component: PrintermakeComponent;
  let fixture: ComponentFixture<PrintermakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintermakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintermakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
