import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Login } from '../../services/models/login';
import { ValidationProblemDetails } from '../../services/models/validation-problem-details';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: Login = { username: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    if(localStorage.getItem('jwtToken') && localStorage.getItem('userId'))
      this.router.navigate(['/add-subscription']);
  }

  onSubmit(event: Event): void {
    this.errorMessage = ''; // Clear previous error messages

    this.authService.login(this.credentials).subscribe(
      response => {
        localStorage.setItem('jwtToken', response.accessToken);
        localStorage.setItem('userId', response.id.toString());

        this.router.navigate(['/add-subscription'])
      },
      error => {
        if (error.status === 400 && error.error) {
          const validationError: ValidationProblemDetails = error.error;

          if (validationError.detail) {
            this.errorMessage = validationError.detail;
          } else if (validationError.errors) {
            // Handle multiple errors, if any
            this.errorMessage = Object.values(validationError.errors)[0][0];
          }
        } else {
          // Handle other errors as needed
          console.error('Login failed:', error);
        }
        console.log(this.errorMessage)
      }
    );
  }
}
