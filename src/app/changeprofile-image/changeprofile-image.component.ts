import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-changeprofile-image',
  templateUrl: './changeprofile-image.component.html',
  styleUrls: ['./changeprofile-image.component.css']
})
export class ChangeprofileImageComponent implements OnInit {

  constructor(public service:WalletService, private fb:FormBuilder) { }
  thisCurrentUserDetails= this.service.getAllusers.find(val=>val.fName==this.service.getLoggedinUser().fName);
  indexOfThisCurrentUser  = this.service.getAllusers.indexOf(this.thisCurrentUserDetails);
  readerResult;
  editForm:FormGroup;
  ngOnInit(): void {
   this.editForm =this.fb.group({
     fName:['',Validators.min(3)],
     lName:['',Validators.min(3)],
     email:['',Validators.email],
     phone:['',]
   })
  }
  upLoadImage(myFileInput){
  //  this.indexOfThisCurrentUser = this.service.getAllusers.indexOf(this.thisCurrentUserDetails)
    const reader = new FileReader();
    
    reader.addEventListener("load",()=>{
      this.readerResult=reader.result;
      
     
     this.thisCurrentUserDetails.image=this.readerResult; 
      this.service.getAllusers[this.thisCurrentUserDetails]=this.thisCurrentUserDetails;
      localStorage.setItem("myUsers",JSON.stringify(this.service.getAllusers));
     
    })
   
    reader.readAsDataURL(myFileInput.files[0]);
    console.log(reader.result);
    
  console.log(this.thisCurrentUserDetails.image);
  
}
edit(){
  document.getElementById("myEditForm").style.display="block";
}
submitEditForm(){
  let values =this.editForm.value;
  this.thisCurrentUserDetails.fName=values.fName;
  this.thisCurrentUserDetails.lName=values.lName;
  this.thisCurrentUserDetails.email=values.email;
  this.thisCurrentUserDetails.phone=values.phone;
  this.service.getAllusers[this.indexOfThisCurrentUser]=this.thisCurrentUserDetails;

  localStorage.setItem("login-user",JSON.stringify(this.thisCurrentUserDetails));
  localStorage.setItem("myUsers",JSON.stringify(this.service.getAllusers));
  
  
}

}
