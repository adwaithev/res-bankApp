import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim = "Your banking partner"

  

  loginForm = this.fb.group({
    acno: ['', [Validators.minLength(4), Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.minLength(4), Validators.pattern('[0-9a-z]*')]]
  })

  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }



  login() {

    if (this.loginForm.valid) {
      var acno = this.loginForm.value.acno;
      var pswd = this.loginForm.value.pswd;
      var result = this.ds.login(acno, pswd);

      if (result) {

        alert("login succesful")
        this.router.navigateByUrl("dashboard");
      }

    } else {
      alert("invalid form")
    }

  }
}