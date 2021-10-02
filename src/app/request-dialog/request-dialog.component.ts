import { Component, OnInit } from '@angular/core';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.css']
})
export class RequestDialogComponent implements OnInit {

  constructor(private service:WalletService) { }
  requestMessages;
  senderAcc;
  amtToRequest

  ngOnInit(): void {
  }

  request(){
    let loginUserDetails = this.service.getAllusers.find(val=>val.acctNo==this.service.getLoggedinUser().acctNo);
    let creditTorDetails = this.service.getAllusers.find(val=>val.acctNo==this.senderAcc);
    let indexOfCreditor=this.service.getAllusers.indexOf(creditTorDetails);
    let indexOfLoginUser =this.service.getAllusers.indexOf(loginUserDetails);
    if (this.senderAcc==loginUserDetails.acctNo) {
      alert("Request can't be done check the account Number...")
    }
    else if(creditTorDetails.acctNo==this.senderAcc)
    {
       
      let date = new Date();
      let dn = date.toLocaleTimeString();
      let nd = date.toLocaleDateString()
      //CREDITOR'S DETAILS
      creditTorDetails.messages.push({request:`${loginUserDetails.fName} requested for ${this.amtToRequest} from you`,time:dn,name:loginUserDetails.fName,date:nd,amount:this.amtToRequest,id:`${loginUserDetails.id}`});
      this.service.getAllusers[indexOfCreditor]=creditTorDetails;

      //BENEFACTOR DETAIL'S
      loginUserDetails.history.push({request:`you requested for ${this.amtToRequest} from ${creditTorDetails.fName}`,time:dn,date:nd,name:loginUserDetails.fName,amount:this.amtToRequest,id:`${creditTorDetails.id}`})
      this.service[indexOfLoginUser]=loginUserDetails;
      alert(`you have successfully sent a request to ${creditTorDetails.fName}`)
     
    
  localStorage.setItem("myUsers",JSON.stringify(this.service.getAllusers));
    }
 
    
  }

}
