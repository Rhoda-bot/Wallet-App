import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-allhistory',
  templateUrl: './allhistory.component.html',
  styleUrls: ['./allhistory.component.css']
})
export class AllhistoryComponent implements OnInit {

  constructor(private service:WalletService, private dialog:MatDialog) { }
  myHistory;
  indexOfmyHistory;
  ngOnInit(): void {
   this.myHistory= this.service.getAllusers.filter(val=>val.fName==this.service.getLoggedinUser().fName);

   console.log(this.myHistory[0].history);
   
    
    
  }
  delete(i){
    const dialogRef = this.dialog.open(DeleteDialogComponent,{data:i});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  //  this.myHistory.history=this.service.getAllusers[this.indexOfmyHistory].history.filter((val,ind)=>ind!=i);
    
  }
}
