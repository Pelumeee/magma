import { AfterViewInit, Directive, ElementRef, Input, inject } from '@angular/core';

@Directive({
  selector: '[counter]',
})
export class CounterDirective implements AfterViewInit {
  @Input() target = 0;

  @Input() suffix = '';

  @Input() duration = 1400;

  private element = inject(ElementRef<HTMLElement>);

  ngAfterViewInit(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      this.element.nativeElement.textContent = `${this.target}${this.suffix}`;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        this.animate();

        observer.disconnect();
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(this.element.nativeElement);
  }

  private animate() {
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / this.duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);

      const value =
        this.target % 1 === 0 ? Math.floor(eased * this.target) : +(eased * this.target).toFixed(1);

      this.element.nativeElement.textContent = `${value}${this.suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        this.element.nativeElement.textContent = `${this.target}${this.suffix}`;
      }
    };

    requestAnimationFrame(step);
  }
}
