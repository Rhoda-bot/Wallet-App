import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { WalletService } from '../services/wallet.service';
import { TestDashComponent } from '../test-dash/test-dash.component';

@Component({
  selector: 'app-miniwallet-fund',
  templateUrl: './miniwallet-fund.component.html',
  styleUrls: ['./miniwallet-fund.component.css']
})
export class MiniwalletFundComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dashb:MatDialogRef<TestDashComponent>, private service:WalletService) { }
  info =this.data
  walletName;
  amount
  ngOnInit(): void {
  }

fundWallet(){
let thisUser=this.service.getAllusers.find(val=>val.fName==this.service.getLoggedinUser().fName);
let indexOfThisUser =this.service.getAllusers.indexOf(thisUser);
if (!this.amount) {
  alert("Please enter an amount")
}else{
  thisUser.wallets.filter(val=>{
    if (val.name==this.info) {
    val.amount+=parseFloat(this.amount);
    thisUser.balance-=parseFloat(this.amount);
      }
  })
  alert(`you have successfully funded your ${this.info}'s wallet`)
  this.service.getAllusers[indexOfThisUser]=thisUser;
  localStorage.setItem("myUsers",JSON.stringify(this.service.getAllusers));
  this.amount="";
}



}

}
