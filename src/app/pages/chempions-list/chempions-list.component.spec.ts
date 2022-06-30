import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChempionsListComponent } from './chempions-list.component';

describe('ChempionsListComponent', () => {
  let component: ChempionsListComponent;
  let fixture: ComponentFixture<ChempionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChempionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChempionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
