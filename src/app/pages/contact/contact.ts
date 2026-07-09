import { Component } from '@angular/core';

import { RevealDirective } from '../../core/directive/reveal-directive';
import { Form } from './components/form/form';

@Component({
  selector: 'app-contact',
  imports: [Form, RevealDirective],
  templateUrl: './contact.html',
})
export class Contact {}
