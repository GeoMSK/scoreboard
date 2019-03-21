import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreSubmitDialogComponent } from './score-submit-dialog.component';

describe('ScoreSubmitDialogComponent', () => {
  let component: ScoreSubmitDialogComponent;
  let fixture: ComponentFixture<ScoreSubmitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreSubmitDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreSubmitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
