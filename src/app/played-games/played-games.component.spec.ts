import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayedGamesComponent } from './played-games.component';

describe('PlayedGamesComponent', () => {
  let component: PlayedGamesComponent;
  let fixture: ComponentFixture<PlayedGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayedGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayedGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
