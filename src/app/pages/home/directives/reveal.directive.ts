import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[reveal]',
})
export class RevealDirective implements AfterViewInit {
  private element = inject(ElementRef<HTMLElement>);

  ngAfterViewInit(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      this.element.nativeElement.classList.add('in');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        this.element.nativeElement.classList.add('in');
        observer.disconnect();
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -5% 0px',
      },
    );

    observer.observe(this.element.nativeElement);
  }
}
