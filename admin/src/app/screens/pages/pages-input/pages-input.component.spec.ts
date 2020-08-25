import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesInputComponent } from './pages-input.component';

describe('PagesInputComponent', () => {
  let component: PagesInputComponent;
  let fixture: ComponentFixture<PagesInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
