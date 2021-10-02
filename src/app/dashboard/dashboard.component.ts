import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WalletService } from '../services/wallet.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogTransComponent } from '../dialog-trans/dialog-trans.component';
import { WalletCardsComponent } from '../wallet-cards/wallet-cards.component';
import { FundWalletComponent } from '../fund-wallet/fund-wallet.component';
import { RequestDialogComponent } from '../request-dialog/request-dialog.component';
import { MiniwalletFundComponent } from '../miniwallet-fund/miniwallet-fund.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  canvas:any; ctx:any; canvas2:any; ctx2:any; canvas3:any; ctx3:any;
  constructor(public service:WalletService,public actRoute:ActivatedRoute,public dialog: MatDialog) { }
  currentRouteName;
  thisCurrentUserDetails;
  requestMessages;
  senderAcc;
  amtToRequest;
  indexOfThisCurrentUser;
  indexOfBenefactor;
  benefactor;
  readerResult;
  imageName;
  ngOnInit(): void {
  this.actRoute.paramMap.subscribe(param=>{
    this.currentRouteName =param.get("fName");
  })
   this.thisCurrentUserDetails = this.service.getAllusers.find(val=>val.fName==this.currentRouteName);
  //  console.log(this.thisCurrentUserDetails);
   
  
  }
 
  openDialog(){
    const dialogRef = this.dialog.open(DialogTransComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }
  openCreatewallet(){
    const dialogRef = this.dialog.open(WalletCardsComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  openFundWallet(){
    const dialogRef = this.dialog.open(FundWalletComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }
  
  requestMsg(){
    const dialogRef = this.dialog.open(RequestDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }
  accept(arg,amt,i){
    console.log(amt);
    console.log(arg);
    console.log(i);
    let date = new Date();
    let dn = date.toLocaleTimeString();
    let nd = date.toLocaleDateString();
    if (this.thisCurrentUserDetails.balance==0 || this.thisCurrentUserDetails.balance<=amt) {
     alert("sorry! this can't be done... you have zero or no amount in your wallet.")
      
    }else{
      this.indexOfThisCurrentUser = this.service.getAllusers.indexOf(this.thisCurrentUserDetails)
      this.thisCurrentUserDetails.balance-=amt;
       this.benefactor = this.service.getAllusers.find(val=>val.fName==arg);
     this.benefactor.balance+=amt;
      this.indexOfBenefactor =this.service.getAllusers.indexOf(this.benefactor);
  
      this.service.getAllusers[this.indexOfThisCurrentUser].messages=this.service.getAllusers[this.indexOfThisCurrentUser].messages.filter((val,ind)=>ind!=i)
      
        this.thisCurrentUserDetails.history.push({receiverName:this.benefactor.fName,desc:`you sent ${amt} to ${arg} `,time:dn,date:nd})
        this.benefactor.history.push({creditorName:this.thisCurrentUserDetails.fName,desc:`${amt} was sent  to you by ${this.thisCurrentUserDetails.fName}`,time:dn,date:nd})
        this.service.getAllusers[this.indexOfThisCurrentUser]=this.thisCurrentUserDetails;
        this.service.getAllusers[this.indexOfBenefactor]=this.benefactor;
        localStorage.setItem("myUsers",JSON.stringify(this.service.getAllusers));
    }
    
  }

  reject(i,name){
    
    this.indexOfThisCurrentUser =this.service.getAllusers.indexOf(this.thisCurrentUserDetails)
  

    this.service.getAllusers[this.indexOfThisCurrentUser].messages=this.service.getAllusers[this.indexOfThisCurrentUser].messages.filter((val,ind)=>ind!=i);
    this.thisCurrentUserDetails.history.push({request:`you declined ${name}'s request`})
    localStorage.setItem("myUsers",JSON.stringify(this.service.getAllusers));
  }
  withdraw(amt,ind){
    this.indexOfThisCurrentUser =this.service.getAllusers.indexOf(this.thisCurrentUserDetails)
    this.thisCurrentUserDetails.balance+=amt;
    this.service.getAllusers[this.indexOfThisCurrentUser] =this.thisCurrentUserDetails;
    // console.log(ind);
    
     this.thisCurrentUserDetails.wallets.filter((val,i)=>{
      if (i==ind) {
         val.amount-=val.amount;
         }
    })
    
    alert(`you have successfully withdrawn to your main acct!`);
    this.service.getAllusers[this.indexOfThisCurrentUser]=this.thisCurrentUserDetails;
    localStorage.setItem("myUsers",JSON.stringify(this.service.getAllusers));
  }
  fund(data){
      const dialogRef = this.dialog.open(MiniwalletFundComponent,{data:data});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // console.log(data);
      
    })
  }


  upLoadImage(myFileInput){
    const reader = new FileReader();
    
    reader.addEventListener("load",()=>{
      this.readerResult=reader.result;
      this.imageName =myFileInput.files[0].name;
     this.thisCurrentUserDetails.image=this.readerResult; 
      this.service.getAllusers[this.thisCurrentUserDetails]=this.thisCurrentUserDetails;
      localStorage.setItem("myUsers",JSON.stringify(this.service.getAllusers));
     
    })
    reader.readAsDataURL(myFileInput.files[0]);
  
}
 
}
