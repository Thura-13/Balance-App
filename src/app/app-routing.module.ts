import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BalanceDetailComponent } from './views/balance-detail/balance-detail.component';
import { BalanceEditComponent } from './views/balance-edit/balance-edit.component';
import { BalanceListComponent } from './views/balance-list/balance-list.component';
import { CategoryComponent } from './views/category/category.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {
    path: "balance/:type", children: [
      { path: ':id/detail', component: BalanceDetailComponent },
      { path: ':id', component: BalanceEditComponent },
      { path: '', component: BalanceListComponent }
    ]
  },
  { path: "home", component: HomeComponent },
  { path: "category", component: CategoryComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
