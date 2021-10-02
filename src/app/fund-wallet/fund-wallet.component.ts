import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-fund-wallet',
  templateUrl: './fund-wallet.component.html',
  styleUrls: ['./fund-wallet.component.css']
})
export class FundWalletComponent implements OnInit {

  constructor(private service:WalletService, private fb:FormBuilder) { }
  fundingFund:FormGroup
  ngOnInit(): void {
    this.fundingFund =this.fb.group({
      accountNumber:['',Validators.required],
      amount:['',Validators.required]
    })
  }


  fundWallet(){
    let values = this.fundingFund.value;
    let loginUser = this.service.getLoggedinUser();
    let loginUsersDetails =this.service.getAllusers.find(val=>val.fName == loginUser.fName);
    let indexUserDetails = this.service.getAllusers.indexOf(loginUsersDetails);
   if (loginUsersDetails.acctNo!=values.accountNumber) {
     alert("Invalid account number")
   }else if (!values.amount || !values.accountNumber) {
     alert("Input must be filled!!!");
   }
   else{
    this.service.getAllusers[indexUserDetails].balance+=parseFloat(values.amount);
    localStorage.setItem("myUsers",JSON.stringify(this.service.getAllusers));
    alert(`you have successfully funded your wallet with ${values.amount}`)
   }
    
  }
}
