import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeprofileImageComponent } from './changeprofile-image/changeprofile-image.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WalletGuard } from './gaurds/wallet.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TestDashComponent } from './test-dash/test-dash.component';
import { WalletCardsComponent } from './wallet-cards/wallet-cards.component';
import { HomeComponent } from './home/home.component'
import { AllhistoryComponent } from './allhistory/allhistory.component';

const routes: Routes = [
  {path:'',redirectTo:'sign-in',pathMatch:'full'},
  {path:'sign-in',component:SignInComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'wallet',component:WalletCardsComponent},
  {path:'test/:fName',canActivate:[WalletGuard],component:TestDashComponent},
  {path:'history',component:AllhistoryComponent},
  {path:'profile-picture',component:ChangeprofileImageComponent},
  {path:'home',component:HomeComponent},
  {path:'dashboard',component:DashboardComponent},
  
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
