import { Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { PagenotfoundComponent } from './core/components/pagenotfound/pagenotfound.component';
import { LandingTopnavComponent } from './shared/landing-topnav/landing-topnav.component';
import { LandingpageComponent } from './core/components/landingpage/landingpage.component';
import { ElectronicsComponent } from './core/components/landingpage/electronics/electronics.component';
import { JewelryComponent } from './core/components/landingpage/jewelry/jewelry.component';
import { MensComponent } from './core/components/landingpage/mens/mens.component';
import { WomensComponent } from './core/components/landingpage/womens/womens.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
// import { SignupComponent } from './core/components/signup/signup.component';
// import { DashboardComponent } from './core/components/dashboard/dashboard.component';
// import { FoodComponent } from './core/components/food/food.component';
// import { SalaryComponent } from './core/components/salary/salary.component';

export const routes: Routes = [
    
    { path: 'login', component: LoginComponent },
    { path: 'landingnav', component: LandingTopnavComponent },
    { path: 'landing/home', component: LandingpageComponent },
    { path: 'landing/electronics', component: ElectronicsComponent },
    { path: 'landing/jewelery', component: JewelryComponent },
    { path: 'landing/mens', component: MensComponent },
    { path: 'landing/womens', component: WomensComponent },
    { path: 'dashboard', component: DashboardComponent },

    // { path: 'signup', component: SignupComponent },
    // { path: 'dashboard', component: DashboardComponent },
    
    // {
    //     path: 'landing',
    //     component: LandingpageComponent,
    //     children: [
    //       { path: 'home', component: LandingpageComponent },
    //       { path: 'electronics', component: ElectronicsComponent },
    //     //   { path: '', redirectTo: 'profile', pathMatch: 'full' },
    //     ],
    //   },


    { path: '',   redirectTo: '/landing/home', pathMatch: 'full' },
    { path: '**', component: PagenotfoundComponent },

    
];
