import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public fb:FormBuilder,public service:WalletService,public router:Router, ) { }
  public userLogin:FormGroup;
  myRouteName;
  ngOnInit(): void {
   
    this.userLogin=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    });

  }
  
  submitLogin(){
    let values = this.userLogin.value;
    let getAllusers = this.service.getAllusers.find(val=>val.email==this.userLogin.value.email && val.password==this.userLogin.value.password);
    if (getAllusers.email!=values.email && getAllusers.password!=values.password) {
      this.router.navigate(['/sign-in'])
    }else{
      localStorage.setItem("login-user",JSON.stringify(getAllusers));
      this.router.navigate([`/test/${getAllusers.fName}`]);
    }
    
    
    
    
    
    
  }

}
