import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ParallaxMode = 'fixed' | 'relative';

interface ParallaxEntry {
  target: HTMLElement;   
  reference: HTMLElement; 
  speed: number;
  mode: ParallaxMode;
}

@Injectable({ providedIn: 'root' })
export class ParallaxService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private entries: ParallaxEntry[] = [];
  private ticking = false;
  private listenerAttached = false;
  private reducedMotion = false;

  register(entry: ParallaxEntry): void {
    if (!this.isBrowser) return;

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.reducedMotion) return;

    this.entries.push(entry);
    this.attachListener();
    this.updateEntry(entry);
  }

  unregister(target: HTMLElement): void {
    this.entries = this.entries.filter((e) => e.target !== target);
  }

  private attachListener(): void {
    if (this.listenerAttached) return;
    this.listenerAttached = true;
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  private onScroll = (): void => {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      const vh = window.innerHeight;
      this.entries.forEach((entry) => this.updateEntry(entry, vh));
      this.ticking = false;
    });
  };

  private updateEntry(entry: ParallaxEntry, vh = window.innerHeight): void {
    if (entry.mode === 'fixed') {
      entry.target.style.transform = `translateY(${window.scrollY * entry.speed}px)`;
      return;
    }

    const rect = entry.reference.getBoundingClientRect();
    if (rect.bottom < -100 || rect.top > vh + 100) return;

    const center = rect.top + rect.height * 0.5 - vh * 0.5;
    entry.target.style.transform = `translateY(${center * entry.speed}px)`;
  }
}