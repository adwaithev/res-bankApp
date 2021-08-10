import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  user=this.ds.currentuser;

  depositForm = this.fb.group({
    accno: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9a-z]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })


  withdrawForm = this.fb.group({
    accno1: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9]*')]],
    pswd1: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9a-z]*')]],
    amount1: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })
  constructor(private ds: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  deposit() {

    if (this.depositForm.valid) {
      var accno = this.depositForm.value.accno;
      var pswd = this.depositForm.value.pswd;
      var amount = this.depositForm.value.amount;
      var result = this.ds.deposit(accno, pswd, amount)
      if (result) {
        alert("amount" + amount + "credited.New balance is " + result)
      }
    }
    else {
      alert("invalid form")
    }
  }



  withdraw() {

    if (this.withdrawForm.valid) {
      var accno1 = this.withdrawForm.value.accno1;
      var pswd1 = this.withdrawForm.value.pswd1;
      var amount1 = this.withdrawForm.value.amount1;

      let result = this.ds.withdraw(accno1, pswd1, amount1)
      if (result) {
        alert("amount" + amount1 + "debited.Available balance is " + result)
      }

    } else {
      alert("invalid form")
    }


  }
}