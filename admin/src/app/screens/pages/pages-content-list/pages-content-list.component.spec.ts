import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesContentListComponent } from './pages-content-list.component';

describe('PagesContentListComponent', () => {
  let component: PagesContentListComponent;
  let fixture: ComponentFixture<PagesContentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesContentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
