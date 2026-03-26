import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@my-workspace/users/data-access';
import { isStrongPassword, isValidEmail } from '@my-workspace/users/util-validators';

@Component({
  selector: 'lib-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly auth = inject(AuthService);
  email = 'user@demo.com';
  password = 'secret123';
  message = '';

  submit(): void {
    if (!isValidEmail(this.email) || !isStrongPassword(this.password)) {
      this.message = 'Invalid credentials format.';
      return;
    }

    this.auth.login(this.email);
    this.message = 'Logged in.';
  }
}
