import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor() { }
public getAllusers =JSON.parse(localStorage.getItem("myUsers")) || [];
  getLoggedinUser(){

    let loginUser = JSON.parse(localStorage.getItem("login-user")) || [];
  return loginUser 
  }
}
