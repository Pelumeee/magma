import { Directive, ElementRef, Input, OnDestroy, afterNextRender, inject } from '@angular/core';
import { ParallaxService, ParallaxMode } from '../services/parallax-service';

@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxDirective implements OnDestroy {
  @Input() parallaxMode: ParallaxMode = 'relative';

  @Input() parallaxSpeed = 0.14;

  private el = inject(ElementRef<HTMLElement>);
  private parallax = inject(ParallaxService);

  constructor() {
    afterNextRender(() => {
      const target = this.el.nativeElement;
      const reference =
        this.parallaxMode === 'relative' ? (target.parentElement ?? target) : target;

      this.parallax.register({
        target,
        reference,
        speed: this.parallaxSpeed,
        mode: this.parallaxMode,
      });
    });
  }

  ngOnDestroy(): void {
    this.parallax.unregister(this.el.nativeElement);
  }
}
