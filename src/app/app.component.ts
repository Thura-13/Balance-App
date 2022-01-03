import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';

import { STORAGE_SERVICE } from './app.module';
import { StorageService } from './model/balance.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(@Inject(STORAGE_SERVICE) private service: StorageService[]) {
  }

  ngOnInit(): void {
    this.service.forEach(cat => {
      cat.loadResources()
    })
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    this.service.forEach(cat => {
      cat.saveResources()
    })
  }

  title = 'balance-app-demo';
}
