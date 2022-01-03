import { DatePipe } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BalanceResource } from './model/balance.resource';
import { BalanceService } from './model/balance.service';
import { CategoryService } from './model/category.service';
import { DetailResource } from './model/detail.resource';
import { IdGenerator } from './model/id.generate';
import { BalanceDetailComponent } from './views/balance-detail/balance-detail.component';
import { BalanceEditComponent } from './views/balance-edit/balance-edit.component';
import { BalanceListComponent } from './views/balance-list/balance-list.component';
import { CategoryComponent } from './views/category/category.component';
import { EditComponent } from './views/category/edit/edit.component';
import { HomeComponent } from './views/home/home.component';
import { NavBarComponent } from './widget/nav-bar/nav-bar.component';
import { SearchBarComponent } from './widget/search-bar/search-bar.component';

export const STORAGE_SERVICE = new InjectionToken("storage-service")

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BalanceDetailComponent,
    BalanceEditComponent,
    BalanceListComponent,
    SearchBarComponent,
    NavBarComponent,
    CategoryComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe,
    { provide: STORAGE_SERVICE, useExisting: IdGenerator, multi: true },
    { provide: STORAGE_SERVICE, useExisting: CategoryService, multi: true },
    { provide: STORAGE_SERVICE, useExisting: BalanceResource, multi: true },
    { provide: STORAGE_SERVICE, useExisting: DetailResource, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
