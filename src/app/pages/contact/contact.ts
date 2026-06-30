import { AfterViewInit, Component, inject } from '@angular/core';
import { AnimationsService } from '../../core/services/animations.service';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements AfterViewInit {
  // animation = inject(AnimationsService);

  ngAfterViewInit() {
    // setTimeout(() => this.animation.initReveal(), 50);
  }
}
