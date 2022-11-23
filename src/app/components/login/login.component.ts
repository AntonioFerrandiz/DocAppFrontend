import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/user-login.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup

  constructor(private fb: FormBuilder, private router: Router, private auth: LoginService) {
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }
  userLogin(formDirective: FormGroupDirective): void {
    const userLogin: UserLogin = {
      email: this.login.value.email,
      password: this.login.value.password
    }
    this.auth.userLogin(userLogin).subscribe(data => {
      this.auth.setLocalStorage(data['token'])
      this.router.navigate(['/home'])
    }, error => {
    })
  }
}
