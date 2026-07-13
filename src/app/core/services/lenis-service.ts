import { Injectable, PLATFORM_ID, inject, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Lenis from 'lenis';

@Injectable({ providedIn: 'root' })
export class LenisService {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(this.platformId);

  private lenisInstance?: Lenis;
  private rafId?: number;
  private initialized = false;

  get lenis(): Lenis | undefined {
    return this.lenisInstance;
  }

  init(): void {
    if (!this.isBrowser || this.initialized) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    this.initialized = true;

    this.ngZone.runOutsideAngular(() => {
      this.lenisInstance = new Lenis({
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
      });

      const raf = (time: number) => {
        this.lenisInstance?.raf(time);
        this.rafId = requestAnimationFrame(raf);
      };
      this.rafId = requestAnimationFrame(raf);
    });
  }

  scrollTo(target: string | number | HTMLElement, options?: Record<string, unknown>): void {
    this.lenisInstance?.scrollTo(target, options);
  }

  destroy(): void {
    if (this.rafId != null) cancelAnimationFrame(this.rafId);
    this.lenisInstance?.destroy();
    this.initialized = false;
  }
}
