import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesContentInputComponent } from './pages-content-input.component';

describe('PagesContentInputComponent', () => {
  let component: PagesContentInputComponent;
  let fixture: ComponentFixture<PagesContentInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesContentInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesContentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
