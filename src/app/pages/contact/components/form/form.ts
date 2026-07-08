import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

declare const turnstile: any;

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error' | 'captcha-error';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
})
export class Form implements AfterViewInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  turnstileContainer = viewChild<ElementRef<HTMLDivElement>>('turnstileContainer');

  status = signal<SubmitStatus>('idle');
  turnstileToken = signal<string | null>(null);
  private widgetId: string | null = null;

  services = [
    'Crane Hire',
    'Marine Logistics',
    'Rigging & Lifting',
    'Land Transport',
    'Engineering & EPC',
    'Procurement',
    'Equipment Hire',
  ];

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    service: ['', [Validators.required]],
    msg: ['', [Validators.required, Validators.minLength(20)]],
    honeypot: [''],
  });

  ngAfterViewInit() {
    this.renderTurnstile();
  }

  private renderTurnstile() {
    const container = this.turnstileContainer()?.nativeElement;
    if (!container) return;

    if (typeof turnstile === 'undefined') {
      setTimeout(() => this.renderTurnstile(), 200);
      return;
    }

    this.widgetId = turnstile.render(container, {
      sitekey: environment.turnstileSiteKey,
      callback: (token: string) => this.turnstileToken.set(token),
      'expired-callback': () => this.turnstileToken.set(null),
      'error-callback': () => this.turnstileToken.set(null),
    });
  }

  errorFor(controlName: keyof typeof this.form.controls): string | null {
    const control = this.form.controls[controlName];
    if (!control.touched || !control.errors) return null;

    if (control.errors['required']) return 'This field is required.';
    if (control.errors['email']) return 'Enter a valid email address.';
    if (control.errors['minlength']) {
      const min = control.errors['minlength'].requiredLength;
      return `Please enter at least ${min} characters.`;
    }
    return 'Invalid value.';
  }

  isInvalid(controlName: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[controlName];
    return control.touched && control.invalid;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.turnstileToken()) {
      this.status.set('captcha-error');
      return;
    }

    this.status.set('sending');
    const { name, email, company, service, msg, honeypot } = this.form.getRawValue();

    this.http
      .post<{ success: boolean }>('/api/contact', {
        name,
        email,
        company: company || 'Not provided',
        service,
        message: msg,
        honeypot,
        turnstileToken: this.turnstileToken(),
      })
      .subscribe({
        next: () => {
          this.status.set('success');
          this.form.reset();
          this.turnstileToken.set(null);
          if (this.widgetId) turnstile.reset(this.widgetId);
          setTimeout(() => this.status.set('idle'), 3000);
        },
        error: (err) => {
          console.error('Enquiry send failed:', err);
          this.status.set('error');
          this.turnstileToken.set(null);
          if (this.widgetId) turnstile.reset(this.widgetId);
        },
      });
  }
}
