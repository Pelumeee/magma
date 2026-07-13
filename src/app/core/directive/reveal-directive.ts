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

export type RevealVariant =
  | 'reveal'
  | 'reveal-left'
  | 'reveal-right'
  | 'reveal-scale'
  | 'stagger'
  | 'counter'
  | 'lines';

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

  @Input() counterDurationMs = 1500;

  @Input() linesBaseDelayMs = 300;

  @Input() linesStepMs = 160;

  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private scrollReveal = inject(ScrollRevealService);
  private counterObserver?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      if (this.variant === 'stagger') {
        this.applyStaggerDelays();
      }

      if (this.variant === 'lines') {
        this.applyLineDelays();
      }

      if (this.variant === 'counter') {
        this.observeCounters();
      } else {
        this.scrollReveal.observe(this.el.nativeElement, this.revealOnce);
      }
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

  private applyLineDelays(): void {
    const lines = Array.from(
      this.el.nativeElement.querySelectorAll(':scope > .line'),
    ) as HTMLElement[];
    lines.forEach((lineEl, index) => {
      const inner = lineEl.firstElementChild as HTMLElement | null;
      if (!inner) return;
      const delay = this.linesBaseDelayMs + index * this.linesStepMs;
      this.renderer.setStyle(inner, 'transitionDelay', `${delay}ms`);
    });
  }

  private observeCounters(): void {
    this.counterObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.runCounters();
            this.counterObserver?.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px 150px 0px',
      },
    );
    this.counterObserver.observe(this.el.nativeElement);
  }

  private runCounters(): void {
    const counters = this.el.nativeElement.querySelectorAll(
      '[data-count]',
    ) as NodeListOf<HTMLElement>;
    counters.forEach((counterEl) => this.animateCounter(counterEl));
  }

  private animateCounter(counterEl: HTMLElement): void {
    const target = Number(counterEl.dataset['count']);
    if (Number.isNaN(target)) return;

    const suffix = counterEl.dataset['suffix'] ?? '';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      counterEl.textContent = `${target}${suffix}`;
      return;
    }

    const duration = this.counterDurationMs;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);

      counterEl.textContent = `${current}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counterEl.textContent = `${target}${suffix}`;
      }
    };

    requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    this.scrollReveal.unobserve(this.el.nativeElement);
    this.counterObserver?.disconnect();
  }
}
