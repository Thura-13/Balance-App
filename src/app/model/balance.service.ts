import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { from } from "rxjs";

import { Balance, BalanceDetails, BalanceVO, BalanceWithDetail, StorageService } from "./balance.model";
import { BalanceResource } from "./balance.resource";
import { CategoryService } from "./category.service";
import { DetailResource } from "./detail.resource";
import { IdGenerator } from "./id.generate";

export interface BalanceSearch {
    type: string,
    category: string,
    from: string,
    to: string
}

@Injectable({ providedIn: 'root' })
export class BalanceService {


    constructor(
        private ids: IdGenerator,
        private catService: CategoryService,
        private bResource: BalanceResource,
        private dResource: DetailResource,
        private datePipe: DatePipe) {

    }

    /**
     * Add New Or Edit
     * Save Balance Data And Balance Detail Data
     * @param value 
     */
    save(value: BalanceWithDetail): number {

        const { balance, details } = value
        // save balance data
        const balanceId = this.bResource.save(balance)
        // save detail data 
        this.dResource.save(balanceId, details)
        // return balance id
        return balanceId
    }

    /**
     * Find Balance Data And Detail For Detail View
     * @param Balance Id
     */
    findViewById(id: number): BalanceWithDetail {

        const { balance, details } = this.findById(id)

        const { category, ...rest } = balance

        return {
            balance: { ...rest, category: this.catService.findById(category) },
            details: details
        }
    }

    /**
     * Find Balance Data And Detail Data For Edit
     * @param Balance Id
     */
    findById(id: number): BalanceWithDetail {
        return {
            balance: this.bResource.findById(id),
            details: this.dResource.findByBalanceId(id)
        }
    }

    /**
     * Search Balance Detail View Object
     * @param form 
     */
    searchDetail(form: BalanceSearch): BalanceDetails[] {

        return this.balanceSearch(form)
            .map(balance => this.dResource.findByBalanceId(balance.id).map(detail => {
                let { balance, ...rest } = detail
                balance = this.bResource.findById(balance)
                let { category, ...other } = balance
                balance = { ...other, category: this.catService.findById(category) }
                return {
                    ...rest,
                    balance: balance
                }
            })).reduce((a, b) => a.concat(b), [])
    }

    /**
     * Search Balance View Object
     * @param form 
     */
    search(form: BalanceSearch): BalanceVO[] {


        // filter balance
        const list = this.balanceSearch(form)

        let balance = 0

        return list.map(b => {
            let { category, ...rest } = b
            category = this.catService.findById(category)
            balance = category.type === 'Income' ? balance + b.total : balance - b.total
            return {
                ...rest,
                category: category,
                balance: balance
            }
        })
    }

    private balanceSearch(form: BalanceSearch): Balance[] {

        return this.bResource.list.filter(balance => {

            // category
            if (form.category) {
                if (form.category != balance.category) {
                    return false
                }
            } else {
                // type
                if (form.type) {
                    if (form.type != this.catService.findById(balance.category).type) {
                        return false
                    }
                }
            }

            const date: string = this.datePipe.transform(balance.useDate, 'yyyy-MM-dd')!
            // from
            if (form.from) {

                if (form.from > date) {
                    return false
                }

            }

            // to
            if (form.to) {
                if (form.to < date) {
                    return false
                }
            }

            return true
        })
    }
}

