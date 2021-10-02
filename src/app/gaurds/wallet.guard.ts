
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WalletService } from '../services/wallet.service';

@Injectable({
  providedIn: 'root'
})

export class WalletGuard implements CanActivate {
  public constructor(public router:Router,private service:WalletService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let getLoggedUser = JSON.parse(localStorage.getItem("login-user")) || [];

      if (route.params.fName!==getLoggedUser.fName) {
        return this.router.navigate(['/sign-in'])
      }else{
        return true;

      }
      
      

      
     
      
      
      
  }
  
}
