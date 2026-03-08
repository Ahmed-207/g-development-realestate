import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectHeadingCarouselComponent } from './project-heading-carousel.component';

describe('ProjectHeadingCarouselComponent', () => {
  let component: ProjectHeadingCarouselComponent;
  let fixture: ComponentFixture<ProjectHeadingCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectHeadingCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectHeadingCarouselComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
