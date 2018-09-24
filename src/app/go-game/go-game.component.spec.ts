import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoGameComponent } from './go-game.component';

describe('GoGameComponent', () => {
  let component: GoGameComponent;
  let fixture: ComponentFixture<GoGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
