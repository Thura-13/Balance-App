import { Injectable } from "@angular/core";

import { BaseStorage, ListStorage } from "../baseStorage/base.storage";
import { Balance } from "./balance.model";
import { IdGenerator } from "./id.generate";

const B_RESOURCES = 'com.balance.app.balance'


@Injectable({ providedIn: 'root' })
export class BalanceResource extends ListStorage<Balance> {

    constructor(private ids: IdGenerator) {
        super({}, B_RESOURCES)
    }


    save(balance: Balance) {

        let balanceId = balance.id
        if (balanceId) {
            // Edit
            this.resource[balanceId] = { ...balance }
        } else {
            // Add New
            const { id, ...rest } = balance
            balanceId = this.ids.next('balance')
            this.resource[balanceId] = { ...rest, id: balanceId }
        }

        return balanceId
    }

    findById(id: number): Balance {
        return { ...this.resource[id] }
    }



}