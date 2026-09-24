import { Component, OnInit  } from '@angular/core';
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
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  error = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {

    this.form = this.fb.group({

      username: [
        '',
        Validators.required
      ],

      password: [
        '',
        Validators.required
      ]

    });

  }

  ngOnInit(): void {

  const token = localStorage.getItem('token');

  if (token) {
    this.router.navigate(['/dashboard']);
  }
}

  onSubmit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.error = '';

    this.loading = true;

    const payload = {

      username: this.form.value.username,

      password: this.form.value.password

    };

    console.log(
      'Login payload:',
      payload
    );


    this.authService.login(payload).subscribe({

      next: (response) => {

        console.log(
          'Login successful:',
          response
        );

        this.loading = false;


        if (response.token) {

          localStorage.setItem(
            'token',
            response.token
          );

        }


        this.router.navigate([
          '/dashboard'
        ]);

      },


      error: (err) => {

        console.error(
          'Login error:',
          err
        );

        this.loading = false;

        this.error =
          err.error?.message ||
          err.error?.title ||
          'Invalid username or password.';

      }

    });

  }

}