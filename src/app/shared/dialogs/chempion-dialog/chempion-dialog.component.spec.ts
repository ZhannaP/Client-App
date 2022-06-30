import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChempionDialogComponent } from './chempion-dialog.component';

describe('ChempionDialogComponent', () => {
  let component: ChempionDialogComponent;
  let fixture: ComponentFixture<ChempionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChempionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChempionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
