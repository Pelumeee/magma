import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-progress-scroller',
  templateUrl: './progress-scroller.html',
})
export class ProgressScroller {
  readonly progress = signal(0);

  @HostListener('window:scroll')
  updateProgress() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    this.progress.set(maxScroll <= 0 ? 0 : window.scrollY / maxScroll);
  }
}
