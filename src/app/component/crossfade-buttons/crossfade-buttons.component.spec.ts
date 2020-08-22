import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CrossfadeButtonsComponent} from './crossfade-buttons.component';

describe('CrossfadeButtonsComponent', () => {
  let component: CrossfadeButtonsComponent;
  let fixture: ComponentFixture<CrossfadeButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrossfadeButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossfadeButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
