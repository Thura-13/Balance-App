import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Balance, BalanceDetails, BalanceWithDetail } from 'src/app/model/balance.model';
import { BalanceService } from 'src/app/model/balance.service'

@Component({
  templateUrl: './balance-detail.component.html',
  styles: [
  ]
})
export class BalanceDetailComponent {

  balanceVO?: BalanceWithDetail | null

  constructor(
    route: ActivatedRoute, private balanceService: BalanceService) {
    route.params.subscribe(param => {
      const id = Number(param['id'])
      if (id) {
        this.balanceVO = balanceService.findViewById(id)
      }
    })
  }

  get balance(): Balance | null {
    return this.balanceVO?.balance || null
  }

  get details(): BalanceDetails[] | null {
    return this.balanceVO?.details || null
  }
}
