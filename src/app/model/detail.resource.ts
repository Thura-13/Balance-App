import { Injectable } from "@angular/core";

import { BaseStorage, ListStorage } from "../baseStorage/base.storage";
import { BalanceDetails } from "./balance.model";
import { IdGenerator } from "./id.generate";

const D_RESOURCES = 'com.balance.app.detail'


@Injectable({ providedIn: 'root' })
export class DetailResource extends ListStorage<BalanceDetails>{

    constructor(private ids: IdGenerator) {
        super({}, D_RESOURCES)
    }

    save(balanceId: number, details: BalanceDetails[]) {



        // Delete Old Data
        this.findByBalanceId(balanceId)
            .forEach(detail => delete this.resource[detail.id])

        // Add New

        for (const detail of details) {

            let { id, balance, ...rest } = detail

            if (id === 0) {
                id = this.ids.next('detail')
            }

            this.resource[id] = { ...rest, id: id, balance: balanceId }
        }
    }

    findByBalanceId(id: number): BalanceDetails[] {
        return Object.values(this.resource)
            .filter(detail => detail.balance === id)
            .map(d => ({ ...d }))
    }

}