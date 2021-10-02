import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AllhistoryComponent } from '../allhistory/allhistory.component';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(@Inject (MAT_DIALOG_DATA) public data, public historyCom:MatDialogRef<AllhistoryComponent>, private service:WalletService,private dialog:MatDialog ) { }
  logedUser;
 myHistory
  ngOnInit(): void {
    
    
  }
  
  yes(){
    this.logedUser =this.service.getAllusers.filter(val=> val.fName==this.service.getLoggedinUser().fName);
    
    this.myHistory=this.logedUser.map((val,i)=>{
    this.logedUser[0].history= val.history.filter((val,ind)=>ind!=this.data)
    localStorage.setItem("myUsers",JSON.stringify(this.service.getAllusers));
      
    })


  }
  no(){
    console.log("no");
    this.dialog.closeAll();
  }
}
