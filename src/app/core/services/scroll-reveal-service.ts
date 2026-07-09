import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class ScrollRevealService {
  private observer?: IntersectionObserver;
  private onceMap = new WeakMap<Element, boolean>();

  private getObserver(): IntersectionObserver {
    if (!this.observer) {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const once = this.onceMap.get(entry.target) ?? true;

            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              if (once) this.observer?.unobserve(entry.target);
            } else if (!once) {
              entry.target.classList.remove('in');
            }
          }
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -10% 0px', 
        },
      );
    }
    return this.observer;
  }

  observe(el: Element, once = true): void {
    this.onceMap.set(el, once);
    this.getObserver().observe(el);
  }

  unobserve(el: Element): void {
    this.observer?.unobserve(el);
  }
}
