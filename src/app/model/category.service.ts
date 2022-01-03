import { Injectable } from "@angular/core";

import { BaseStorage, ListStorage } from "../baseStorage/base.storage";
import { Category, StorageService, Type } from "./balance.model";
import { IdGenerator } from "./id.generate";

const Storage_Key = "com.balance.app.category"

export type CategorySearch = { type: Type | '', name?: string, deleted?: boolean }

@Injectable({ providedIn: 'root' })
export class CategoryService extends ListStorage<Category> {


    constructor(private idGen: IdGenerator) {
        super({}, Storage_Key)
    }

    search(param: CategorySearch): readonly Category[] {

        return Object.values(this.resource).filter(cat => {

            if (param.type && cat.type != param.type) {
                return false
            }

            if (param.name && !cat.name.toLocaleLowerCase().startsWith(param.name.toLocaleLowerCase())) {
                return false
            }
            return !param.deleted
        })

    }

    // Add And Edit
    save(data: Category) {

        if (data.id) {
            // Edit
            this.resource[data.id] = { ...data }
        } else {
            // Add New
            const { id, ...rest } = data
            const generatedId = this.idGen.next('category')
            this.resource[generatedId] = { ...rest, id: generatedId }
        }

    }

    delete(id: number) {
        if (this.resource[id]) {
            const { deleted, ...rest } = this.resource[id]
            this.resource[id] = { ...rest, deleted: !deleted }
        }
    }

    getNewObject(): Category {
        return {
            id: 0,
            type: '',
            name: '',
            deleted: false
        }
    }

    isAlreadyExistName(name: string): boolean {
        return Object.values(this.resource)
            .find(value => value.name === name) != undefined
    }

    findById(id: number): Category {
        return this.resource[id]
    }



}