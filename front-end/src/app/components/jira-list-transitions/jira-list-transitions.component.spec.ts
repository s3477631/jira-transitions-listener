import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JiraListTransitionsComponent } from './jira-list-transitions.component';

describe('JiraListTransitionsComponent', () => {
  let component: JiraListTransitionsComponent;
  let fixture: ComponentFixture<JiraListTransitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JiraListTransitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JiraListTransitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
