import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { WalletCardsComponent } from './wallet-cards/wallet-cards.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogTransComponent } from './dialog-trans/dialog-trans.component';
import { FundWalletComponent } from './fund-wallet/fund-wallet.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { RequestDialogComponent } from './request-dialog/request-dialog.component';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';
import { MiniwalletFundComponent } from './miniwallet-fund/miniwallet-fund.component';
import { TestDashComponent } from './test-dash/test-dash.component';
import { ChangeprofileImageComponent } from './changeprofile-image/changeprofile-image.component';
import { HomeComponent } from './home/home.component';
import { AllhistoryComponent } from './allhistory/allhistory.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    NotfoundComponent,
    DashboardComponent,
    SidenavComponent,
    WalletCardsComponent,
    DialogTransComponent,
    FundWalletComponent,
    RequestDialogComponent,
    ChartComponent,
    MiniwalletFundComponent,
    TestDashComponent,
    ChangeprofileImageComponent,
    HomeComponent,
    AllhistoryComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatProgressBarModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
