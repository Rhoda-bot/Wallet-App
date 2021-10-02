import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public fb:FormBuilder,public router:Router) { }
  public userForm:FormGroup;
  randomNum =Math.floor(Math.random()*10000000000);

  ngOnInit(): void {
    this.userForm =this.fb.group({
      fName:['',Validators.required,],
      lName:['',Validators.required,],
      email:['',Validators.email],
      phone:['',Validators.required],
      password:['',Validators.required],
      balance:[0],
      id:[Math.floor(Math.random()*2000)],
      acctNo:[this.randomNum],
      messages:[[]],
      history:[[]],
      loanArr:[[]],
      wallets:[[]],
      totalAmount:[0],
      

    })
  }
  submitForm(){
    let values = this.userForm.value;
    let saveUserDetails =JSON.parse(localStorage.getItem("myUsers")) || [];
    let spr =[...saveUserDetails,values];
    localStorage.setItem("myUsers",JSON.stringify(spr));
    this.router.navigate(['/sign-in'])

  }

}
