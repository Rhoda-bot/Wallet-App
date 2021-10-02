import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletService } from '../services/wallet.service';
import { DialogTransComponent } from '../dialog-trans/dialog-trans.component';
import { WalletCardsComponent } from '../wallet-cards/wallet-cards.component';
import { FundWalletComponent } from '../fund-wallet/fund-wallet.component';
import { RequestDialogComponent } from '../request-dialog/request-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { MiniwalletFundComponent } from '../miniwallet-fund/miniwallet-fund.component';

@Component({
  selector: 'app-test-dash',
  templateUrl: './test-dash.component.html',
  styleUrls: ['./test-dash.component.css']
})
export class TestDashComponent implements OnInit {
  thisCurrentUserDetails;
  currentRouteName;
  requestMessages;
  senderAcc;
  amtToRequest;
  indexOfThisCurrentUser;
  indexOfBenefactor;
  benefactor;
  readerResult;
  imageName;
  allHistory;
  otherUsers
  messagesLength
  constructor(public service:WalletService, public actRoute:ActivatedRoute,public dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(param=>{
      this.currentRouteName =param.get("fName");
    })
     this.thisCurrentUserDetails = this.service.getAllusers.find(val=>val.fName==this.currentRouteName);
    this.thisCurrentUserDetails.history.slice(0,3,this.thisCurrentUserDetails.history.length).reverse();
    //  this.allHistory.reverse();
     this.otherUsers=this.service.getAllusers.filter(val=>val.fName!=this.currentRouteName);
     if ( this.thisCurrentUserDetails.messages.length>0) {
      this.messagesLength=this.thisCurrentUserDetails.messages.length;
       
     }else{
       console.log(0);
       
     }
    //  console.log(this.otherUsers);
    // ?this.thisCurrentUserDetails.length:0;
     
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
    
    let dnow =Date.now();
    if (this.thisCurrentUserDetails.balance==0 || this.thisCurrentUserDetails.balance<=amt) {
     alert("sorry! this can't be done... you have zero or no amount in your wallet.")
      
    }
    else{
      this.indexOfThisCurrentUser = this.service.getAllusers.indexOf(this.thisCurrentUserDetails)
      this.thisCurrentUserDetails.balance-=amt;
      this.benefactor = this.service.getAllusers.find(val=>val.id==arg);
      this.benefactor.balance+=parseFloat(amt);
      this.indexOfBenefactor =this.service.getAllusers.indexOf(this.benefactor);
  
      this.service.getAllusers[this.indexOfThisCurrentUser].messages=this.service.getAllusers[this.indexOfThisCurrentUser].messages.filter((val,ind)=>ind!=i)
      
        this.thisCurrentUserDetails.history.push({receiverName:this.benefactor.fName,request:`you sent ${amt} to ${this.benefactor.fName} `,time:dnow})
        this.benefactor.history.push({creditorName:this.thisCurrentUserDetails.fName,request:`${amt} was sent  to you by ${this.thisCurrentUserDetails.fName}`,time:dnow})
        this.service.getAllusers[this.indexOfThisCurrentUser]=this.thisCurrentUserDetails;
        this.service.getAllusers[this.indexOfBenefactor]=this.benefactor;
        let sortHistory=this.thisCurrentUserDetails.history.sort((a,b)=>{
          return a.time-b.time;
        })
        this.thisCurrentUserDetails.history=sortHistory
    //     console.log(sortHistory);
        
        localStorage.setItem("myUsers",JSON.stringify(this.service.getAllusers));
    }
    
  }

  reject(i,name){
    let date = Date.now();
    let benefactor= this.service.getAllusers[i].messages.find(val=>val.name==name)
     this.indexOfThisCurrentUser =this.service.getAllusers.indexOf(this.thisCurrentUserDetails)
    this.service.getAllusers[this.indexOfThisCurrentUser].messages=this.service.getAllusers[this.indexOfThisCurrentUser].messages.filter((val,ind)=>ind!=i);
    this.thisCurrentUserDetails.history.push({request:`you declined ${name}'s request`,time:date})
    let sortHistory=this.thisCurrentUserDetails.history.sort((a,b)=>{
      return a.time-b.time;
    })
    this.thisCurrentUserDetails.history=sortHistory;
    console.log(sortHistory);
    this.thisCurrentUserDetails.history.reverse();
    // let benefactorHistory =benefactor.history.sort((a,b)=>{
    //   return a.time-b.time;
    // })
    // benefactor.history=benefactorHistory;
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

  changeImage(){
    this.router.navigate(['/profile-picture'])
  }
  history(){
    this.router.navigate(['/history']);
  }

}
