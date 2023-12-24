import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AddSubscriptionComponent } from './components/add-subscription/add-subscription.component';
import { RemoveSubscriptionComponent } from './components/remove-subscription/remove-subscription.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'add-subscription', component: AddSubscriptionComponent},
  {path: 'remove-subscription', component: RemoveSubscriptionComponent},
  {path: 'edit-profile', component: EditProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
