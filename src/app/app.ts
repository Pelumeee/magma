import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './core/layout/footer/footer';
import { Navbar } from './core/layout/navbar/navbar';
import { ProgressScroller } from './shared/components/progress-scroller/progress-scroller';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, ProgressScroller, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('magma-website');
}
