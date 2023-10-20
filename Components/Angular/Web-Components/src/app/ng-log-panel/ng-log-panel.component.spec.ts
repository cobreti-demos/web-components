import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgLogPanelComponent } from './ng-log-panel.component';

describe('NgLogPanelComponent', () => {
  let component: NgLogPanelComponent;
  let fixture: ComponentFixture<NgLogPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgLogPanelComponent]
    });
    fixture = TestBed.createComponent(NgLogPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
