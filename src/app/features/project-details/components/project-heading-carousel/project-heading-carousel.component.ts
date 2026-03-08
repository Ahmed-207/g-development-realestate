import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild, afterNextRender, input } from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { register } from 'swiper/element/bundle';
import { ProjectSlide } from '../../../../core/interfaces/project-data/project-data.interface';

@Component({
  selector: 'app-project-heading-carousel',
  standalone: true,
  templateUrl: './project-heading-carousel.component.html',
  styleUrl: './project-heading-carousel.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectHeadingCarouselComponent {
  swiperRef = viewChild.required<ElementRef<SwiperContainer>>('mySwiper');
  projectDataForSlide = input.required<ProjectSlide[]>();

  constructor() {
    afterNextRender(() => {
      register();

      const swiperParams = {
        effect: 'creative',
        parallax: true,
        slidesPerView: 1,
        loop: true,
        speed: 2000, 
        watchSlidesProgress: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        creativeEffect: {
          prev: {
            shadow: true,
            translate: ["-20%", 0, -500],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        },
      };

      const element = this.swiperRef().nativeElement;
      Object.assign(element, swiperParams);
      element.initialize();

      if (element.swiper) {
        element.swiper.autoplay.start();
      }
    });
  }
}