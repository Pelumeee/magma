import { afterNextRender, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Footer } from './core/layout/footer/footer';
import { Navbar } from './core/layout/navbar/navbar';
import { ProgressScroller } from './shared/components/progress-scroller/progress-scroller';
import { LenisService } from './core/services/lenis-service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, ProgressScroller, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private lenisService = inject(LenisService);

  private router = inject(Router);

  constructor() {
    afterNextRender(() => {
      this.lenisService.init();
      this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
        this.lenisService.lenis?.scrollTo(0, { immediate: true });
      });
    });
  }
}
