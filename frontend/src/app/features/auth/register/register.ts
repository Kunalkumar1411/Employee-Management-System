import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {

  form: FormGroup;
  error = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {

    this.form = this.fb.group({

      name: [
        '',
        Validators.required
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });

  }


  onSubmit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.error = '';

    this.loading = true;

    const payload = {

      name: this.form.value.name,

      email: this.form.value.email,

      password: this.form.value.password

    };

    console.log(
      'Register payload:',
      payload
    );


    this.authService.register(payload).subscribe({

      next: (response) => {

        console.log(
          'Registration successful:',
          response
        );

        this.loading = false;

        alert(
          'Registration successful! Please login.'
        );

        this.router.navigate([
          '/login'
        ]);

      },


      error: (err) => {

        console.error(
          'Registration error:',
          err
        );

        this.loading = false;

        this.error =
          err.error?.message ||
          err.error?.title ||
          'Registration failed. Please try again.';

      }

    });

  }

}