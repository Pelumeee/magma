import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
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
export class RevealDirective implements OnInit, OnDestroy {
  @Input({
    alias: 'appReveal',
    transform: (value: RevealVariant | '') => (value === '' ? 'reveal' : value),
  })
  variant: RevealVariant = 'reveal';

  @Input() revealDelay?: 1 | 2 | 3 | 4 | 5;

  @Input() revealDelayMs?: number;

  @Input() revealOnce = true;

  @Input() staggerStepMs = 90;

  @Input() staggerMaxMs?: number;

  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private scrollReveal = inject(ScrollRevealService);

  constructor() {
    afterNextRender(() => {
      if (this.variant === 'stagger') {
        this.applyStaggerDelays();
      }
      this.scrollReveal.observe(this.el.nativeElement, this.revealOnce);
    });
  }

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, this.variant);

    if (this.revealDelayMs != null) {
      this.renderer.setStyle(this.el.nativeElement, '--reveal-delay', `${this.revealDelayMs}ms`);
    } else if (this.revealDelay) {
      this.renderer.addClass(this.el.nativeElement, `d${this.revealDelay}`);
    }
  }

  private applyStaggerDelays(): void {
    const children = Array.from(this.el.nativeElement.children);

    children.forEach((child, index) => {
      let delay = index * this.staggerStepMs;
      if (this.staggerMaxMs != null) {
        delay = Math.min(delay, this.staggerMaxMs);
      }
      this.renderer.setStyle(child, 'transitionDelay', `${delay}ms`);
    });
  }

  ngOnDestroy(): void {
    this.scrollReveal.unobserve(this.el.nativeElement);
  }
}
