import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { JsonPipe } from '@angular/common';
import { inject } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(Auth);

  readonly hasError = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);

  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.hasError.set(false);
      this.isSubmitting.set(true);

      const { email, pass } = this.loginForm.getRawValue();

      setTimeout(() => {
        const success = this.auth.login(email!, pass!);

        if (!success) {
          this.hasError.set(true);
          this.isSubmitting.set(false);
          this.loginForm.markAsPristine();
        }
      },500);
    }
  }
}
