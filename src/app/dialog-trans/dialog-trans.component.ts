import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-dialog-trans',
  templateUrl: './dialog-trans.component.html',
  styleUrls: ['./dialog-trans.component.css']
})
export class DialogTransComponent implements OnInit {

  constructor(public fb:FormBuilder,private service:WalletService) { }
  transferDetails:FormGroup;
  ngOnInit(): void {
    this.transferDetails = this.fb.group({
      acctNumber:['',Validators.required],
      amounttoTransfer:['',Validators.required]
    })
  }

  transfer(){
    let date = Date.now();
 
    let values =this.transferDetails.value;
   
    let benefactor= this.service.getAllusers.find(val=>val.acctNo==values.acctNumber);
    let indexOfbenefactor =this.service.getAllusers.indexOf(benefactor);
    // a.balance+=values.amounttoTransfer;
    let loginUser = this.service.getLoggedinUser();
    let loginUserDetails =this.service.getAllusers.find(val=>val.fName==loginUser.fName);
    let indexOfUserDetails =this.service.getAllusers.indexOf(loginUserDetails);
 
    
    
    
    if (loginUserDetails.balance<=0 ||loginUserDetails.balance<values.amounttoTransfer) {
    
      alert("sorry! transaction can't be done... seems as if you have 0 or no amount in your account");
    }
    if (!values.amounttoTransfer || !values.acctNumber) {
      alert("Input must be filled!")
    }
    if (loginUserDetails.acctNo==values.acctNumber) {
      alert("Can't be done!");
    }
    else if (loginUserDetails.balance>0) {
      benefactor.history.push({name:loginUserDetails.fName,amount:values.amounttoTransfer,request:`${loginUserDetails.fName} credited your account at ${date}`, type:"credit",time:date})
      benefactor.balance+=values.amounttoTransfer;
      this.service.getAllusers[indexOfbenefactor]=benefactor;
      loginUserDetails.history.push({name:benefactor.fName,amount:values.amounttoTransfer,request:`you credited ${benefactor.fName}'s account with ${values.amounttoTransfer}`, type:"debit",time:date})
      loginUserDetails.balance-=parseFloat(values.amounttoTransfer);
      alert(`you have successfully transfered ${values.amounttoTransfer} to ${benefactor.fName}`)
      let loggedInUserHistory = loginUserDetails.history.sort((a,b)=>{
        return a.time-b.time;
      })
      loginUserDetails.history=loggedInUserHistory;
      let benefactorHistory =benefactor.history.sort((a,b)=>{
        return a.time-b.time;
      })
      this.service.getAllusers[indexOfbenefactor].history=benefactorHistory;
      this.service.getAllusers[indexOfUserDetails]=loginUserDetails;
    }
    localStorage.setItem("myUsers",JSON.stringify(this.service.getAllusers));

    
    
    
  
    }
}
