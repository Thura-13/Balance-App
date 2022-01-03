import { Injectable } from "@angular/core"

import { BaseStorage } from "../baseStorage/base.storage"
import { StorageService } from "./balance.model"

const Storage_key = "con.app.balance.ids"

@Injectable({ providedIn: 'root' })
export class IdGenerator extends BaseStorage<{ category: number, balance: number, detail: number }>{

    constructor() {
        super({ category: 0, balance: 0, detail: 0 }, Storage_key)
    }

    next(data: 'category' | 'balance' | 'detail'): number {
        const id = ++this.resource[data]
        return id
    }


}