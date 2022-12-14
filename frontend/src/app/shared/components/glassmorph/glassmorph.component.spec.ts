import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassmorphComponent } from './glassmorph.component';

describe('GlassmorphComponent', () => {
  let component: GlassmorphComponent;
  let fixture: ComponentFixture<GlassmorphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlassmorphComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlassmorphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
