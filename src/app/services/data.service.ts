import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentuser = "";

  currentacc = ""

  user: any = {
    1000: { acno: 1000, uname: "akhil", password: "userone", balance: 3000, transaction: [] },
    1001: { acno: 1001, uname: "aahan", password: "usertwo", balance: 1000, transaction: [] },
    1002: { acno: 1002, uname: "amal", password: "userthree", balance: 2000, transaction: [] },
    1003: { acno: 1003, uname: "vimal", password: "userfour", balance: 4000, transaction: [] },
    1004: { acno: 1004, uname: "ajay", password: "userfive", balance: 5000, transaction: [] }
  }



  constructor() {
    this.getDetails()
  }



  saveDetails() {
    localStorage.setItem("user", JSON.stringify(this.user))

    if (this.currentuser) {
      localStorage.setItem("currentuser", JSON.stringify(this.currentuser))
    }
    if (this.currentacc) {
      localStorage.setItem("currentacc", JSON.stringify(this.currentacc))
    }

  }



  getDetails() {
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user") || '')
    }

    if (localStorage.getItem("currentuser")) {
      this.currentuser = JSON.parse(localStorage.getItem("currentuser") || '')
    }

    if (localStorage.getItem("currentacc")) {
      this.currentacc = JSON.parse(localStorage.getItem("currentacc") || '')
    }
  }



  getTransaction() {

    return this.user[this.currentacc]['transaction']
  }





  register(acno: any, uname: any, password: any) {


    let accDetails = this.user;

    if (acno in accDetails) {

      return false;
    }
    else {
      accDetails[acno] = {
        acno,
        uname,
        password,
        balance: 0,
        transaction: []
      }
      this.saveDetails();
      return true
    }
  }



  login(acno: any, pswd: any) {
   

    let accDetails = this.user;

    if (acno in accDetails) {

      if (pswd == accDetails[acno]["password"]) {
        this.currentuser = accDetails[acno]["uname"];
        this.currentacc = accDetails[acno]["acno"];
        this.saveDetails();
        return true;
      }
      else {
        alert("incorrect password")
        return false
      }

    }
    else {
      alert("invalid user")
      return false
    }

  }



  deposit(acno: any, password: any, amt: any) {

    var amount = parseInt(amt);

    let accDetails = this.user;

    if (acno in accDetails) {
      if (password == accDetails[acno]["password"]) {
        accDetails[acno]["balance"] += amount;

        accDetails[acno]['transaction'].push({
          amount: amount,
          type: "CREDIT"
        })

        this.saveDetails()
        return accDetails[acno]["balance"];
      }
      else {
        alert("incorrect password")
        return false;
      }
    }
    else {
      alert("invalid user")
      return false;
    }
  }



  withdraw(acno: any, password: any, amt: any) {

    var amount = parseInt(amt);

    let accDetails = this.user;

    if (acno in accDetails) {

      if (password == accDetails[acno]["password"]) {


        if (accDetails[acno]["balance"] >= amount) {
          accDetails[acno]["balance"] -= amount;
          accDetails[acno]['transaction'].push({
            amount: amount,
            type: "DEBIT"

          })

          this.saveDetails();
          return accDetails[acno]["balance"];

        } else {
          alert("insufficiet fund");
          return false;
        }


      } else {
        alert("incorrect password")
        return false;
      }


    } else {
      alert("invalid user")
      return false;
    }

  }


}