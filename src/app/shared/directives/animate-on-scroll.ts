import { Directive, ElementRef, Input, Renderer2, afterNextRender, inject, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true
})
export class AnimateOnScroll implements OnDestroy {
  @Input('appAnimateOnScroll') animationClass: string = 'animate__fadeIn';
  @Input('animateDelay') animateDelay: string = '0s';
  @Input('animateDuration') animateDuration: number = 0;

  private observer: IntersectionObserver | null = null;
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  constructor() {
    // afterNextRender only executes in the browser
    afterNextRender(() => {
      this.initObserver();
    });
  }

  private initObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {

        if(this.animateDuration){
          this.renderer.setStyle(this.el.nativeElement, '--animate-duration', `${this.animateDuration}s`)
        }

        if(this.animateDelay !== '0s'){
          this.renderer.addClass(this.el.nativeElement, `animate__delay-${this.animateDelay}`);
        }
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'animate__animated');
          this.renderer.addClass(this.el.nativeElement, this.animationClass);
          this.observer?.unobserve(this.el.nativeElement);
        }
      });
    }, { threshold: 0.1 });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    // Always clean up to prevent memory leaks
    this.observer?.disconnect();
  }
}