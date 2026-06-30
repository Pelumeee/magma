import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AnimationsService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private get reduce(): boolean {
    if (!this.isBrowser) return true;

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  initReveal(): void {
    if (!this.isBrowser) return;

    const sel =
      '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-clip, .stagger, .word-reveal, .grow-line';

    const elements = Array.from(document.querySelectorAll<HTMLElement>(sel));

    if (this.reduce) {
      elements.forEach((el) => el.classList.add('in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    elements.forEach((el) => observer.observe(el));
  }

  initHeroLines(): void {
    if (!this.isBrowser) return;

    const lines = Array.from(document.querySelectorAll<HTMLElement>('.hero h1 .line > span'));

    lines.forEach((span, i) => {
      setTimeout(() => {
        span.style.transition = `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${
          i * 0.12
        }s, opacity 0.5s ease ${i * 0.12}s`;

        span.style.transform = 'translateY(0)';
        span.style.opacity = '1';
      }, 200);
    });
  }

  initCounters(): void {
    if (!this.isBrowser) return;

    const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));

    counters.forEach((el) => {
      const target = parseFloat(el.dataset['count'] ?? '0');
      const suffix = el.dataset['suffix'] ?? '';

      if (this.reduce) {
        el.textContent = `${target}${suffix}`;
        return;
      }

      const duration = 1400;
      const start = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        const value = target % 1 === 0 ? Math.floor(eased * target) : (eased * target).toFixed(1);

        el.textContent = `${value}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = `${target}${suffix}`;
        }
      };

      requestAnimationFrame(step);
    });
  }

  initParallax(): void {
    if (!this.isBrowser) return;

    const heroImg = document.getElementById('hero-img');

    if (!heroImg) return;

    const onScroll = () => {
      heroImg.style.transform = `translateY(${window.scrollY * 0.38}px)`;
    };

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    onScroll();
  }
}
