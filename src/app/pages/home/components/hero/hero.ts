import { Component } from '@angular/core';
import { RevealDirective } from '../../../../core/directive/reveal-directive';
import { ParallaxDirective } from '../../../../core/directive/parallax-directive';

@Component({
  selector: 'app-hero',
  imports: [RevealDirective, ParallaxDirective],
  templateUrl: './hero.html',
})
export class Hero {}
