import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  formStore!: NgForm; // Add definite assignment assertion (!)
  suggestName = "";
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    let mail = form.value.email;
    let password = form.value.password;

    if (this.isLoginMode) {
      this.authService.signIn(mail, password).subscribe(
        resData => {
          alert("Signin Successful");
          this.isLoading = false;
          this.router.navigate(["/"]);
        },
        error => {
          this.error = error;
          this.isLoading = false;
        }
      );

      form.reset();
    } else {
      this.authService.signUp(mail, password).subscribe(
        resData => {
          alert("Signup Successful");
          this.isLoading = true;
          this.router.navigate(["/"]);
        },
        error => {
          this.error = error;
          this.isLoading = false;
        }
      );

      form.reset();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
  }
}
