import { Component, OnInit } from '@angular/core';
import { BalanceVO } from 'src/app/model/balance.model';
import { BalanceService } from 'src/app/model/balance.service';

@Component({
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {

  list: readonly BalanceVO[] = []

  constructor(private balanceService: BalanceService) { }


  search(form: any) {
    this.list = this.balanceService.search(form)
  }

}
