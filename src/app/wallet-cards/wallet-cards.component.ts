import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-wallet-cards',
  templateUrl: './wallet-cards.component.html',
  styleUrls: ['./wallet-cards.component.css']
})
export class WalletCardsComponent implements OnInit {

  constructor(private fb:FormBuilder, private service:WalletService) { }
  createWallets:FormGroup;
  ngOnInit(): void {
    this.createWallets =this.fb.group({
      walletName:['',Validators.required],
      walletAmount:['',Validators.required]
    })
  }

  createWallet(){
    let date = new Date();
    let dn = date.toLocaleTimeString();
    let nd = date.toLocaleDateString();
    let values = this.createWallets.value;
    let loginUser = this.service.getLoggedinUser();
    let loginUserDetails = this.service.getAllusers.find(val=>val.fName==loginUser.fName && val.lName==loginUser.lName);
    let loginUserIndex = this.service.getAllusers.indexOf(loginUserDetails);
    this.service.getAllusers[loginUserIndex].wallets.push({name:values.walletName,amount:values.walletAmount,time:dn,date:nd})
    loginUserDetails.balance-=parseFloat(values.walletAmount)
    alert(`you have successfully created a by name ${values.walletName}`);
    console.log(loginUserDetails);
    
    localStorage.setItem("myUsers",JSON.stringify(this.service.getAllusers))
  }
}
