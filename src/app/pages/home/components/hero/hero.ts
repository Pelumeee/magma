import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChild,
  ViewChildren,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})

export class Hero implements AfterViewInit {
  readonly hintVisible = signal(true);
  readonly prefersReducedMotion = false;

  @ViewChild('heroImage')
  heroImage!: ElementRef<HTMLImageElement>;

  @ViewChildren('heroLine')
  heroLines!: QueryList<ElementRef<HTMLElement>>;

  ngAfterViewInit(): void {
    this.animateHeroTitle();
  }

  private animateHeroTitle() {
    if (this.prefersReducedMotion) {
      this.heroLines.forEach((line) => {
        line.nativeElement.style.opacity = '1';
        line.nativeElement.style.transform = 'translateY(0)';
      });

      return;
    }

    this.heroLines.forEach((line, index) => {
      const el = line.nativeElement;

      el.style.opacity = '0';

      el.style.transition =
        'transform .95s cubic-bezier(.16,1,.3,1), opacity .75s cubic-bezier(.16,1,.3,1)';

      el.style.transitionDelay = `${0.3 + index * 0.16}s`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transform = 'translateY(0)';
          el.style.opacity = '1';
        });
      });
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    const scrollY = window.scrollY;

    this.hintVisible.set(scrollY < 80);

    if (!this.prefersReducedMotion && this.heroImage) {
      this.heroImage.nativeElement.style.transform = `translateY(${scrollY * 0.38}px)`;
    }
  }
}
