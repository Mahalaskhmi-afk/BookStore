import { Routes } from '@angular/router';
import { RegisterComponent } from './shared/auth/register/register.component';
import { LoginComponent } from './shared/auth/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ListComponent } from './shared/admin/list/list.component';
import { OrdersComponent } from './shared/admin/orders/orders.component';
import { FeedbacksComponent } from './shared/admin/feedbacks/feedbacks.component';
import { ProfileComponent } from './shared/admin/profile/profile.component';
import { DashboardComponent } from './shared/admin/dashboard/dashboard.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path:"signUp",
        component:RegisterComponent,
        title:"SignUp"
    },
    {
        path:"login",
        component:LoginComponent,
        title:"Sign In"
    },
    {
        path:"navbar",
        component:NavbarComponent,
        title:"Navbar"
    },
    {
        path:'list',
        component:ListComponent,        
        title:'Books',
        canActivate:[authGuard]
    },
    {
        path:'orders',
        component:OrdersComponent,
        title:"Orders",
        canActivate:[authGuard]
    },
    {
        path:'feedbacks',
        component:FeedbacksComponent,
        title:"Feedbacks",
        canActivate:[authGuard]
    },
    {
        path:'profile/:userId',
        component:ProfileComponent,
        title:'Admin | Profile',
        canActivate:[authGuard]
    },
    {
        path:"",
        component:LoginComponent
    },
    {
        path:"dashboard",
        component:DashboardComponent,
        title:"Dashboard"
    },
];
