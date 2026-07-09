import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  afterNextRender,
  inject,
} from '@angular/core';
import { ScrollRevealService } from '../services/scroll-reveal-service';

export type RevealVariant = 'reveal' | 'reveal-left' | 'reveal-right' | 'reveal-scale' | 'stagger';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnDestroy {
  @Input({
    alias: 'appReveal',
    transform: (value: RevealVariant | '') => (value === '' ? 'reveal' : value),
  })
  variant: RevealVariant = 'reveal';

  @Input() revealDelay?: 1 | 2 | 3 | 4 | 5;


  @Input() revealDelayMs?: number;

  @Input() revealOnce = true;

  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private scrollReveal = inject(ScrollRevealService);

  constructor() {
    this.renderer.addClass(this.el.nativeElement, this.variant);

    if (this.revealDelayMs != null) {
      this.renderer.setStyle(this.el.nativeElement, 'transition-delay', `${this.revealDelayMs}ms!`);
    } else if (this.revealDelay) {
      this.renderer.addClass(this.el.nativeElement, `d${this.revealDelay}`);
    }

    afterNextRender(() => {
      this.scrollReveal.observe(this.el.nativeElement, this.revealOnce);
    });
  }

  ngOnDestroy(): void {
    this.scrollReveal.unobserve(this.el.nativeElement);
  }
}
