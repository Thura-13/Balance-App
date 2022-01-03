import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BalanceDetails, BalanceVO } from 'src/app/model/balance.model';
import { BalanceService } from 'src/app/model/balance.service';

@Component({
  templateUrl: './balance-list.component.html'
})
export class BalanceListComponent {

  type?: string

  list: readonly BalanceDetails[] = []

  constructor(private route: ActivatedRoute, private balanceService: BalanceService) {

    route.params.subscribe(param => {
      this.type = param['type']

      if (this.type === 'Income') {
        this.list = []
      }

      if (this.type === 'Expense') {
        this.list = []
      }
    })
  }

  search(form: any) {
    this.list = this.balanceService.searchDetail(form)
  }

}
