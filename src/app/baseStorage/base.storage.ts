import { StorageService } from "../model/balance.model";

export class BaseStorage<T> implements StorageService {

    constructor(protected resource: T, protected storageKey: string) {

    }

    loadResources(): void {
        const str = localStorage.getItem(this.storageKey)
        if (str) {
            this.resource = JSON.parse(str)
        }
    }
    saveResources(): void {
        localStorage.setItem(this.storageKey, JSON.stringify(this.resource))
    }
}

export abstract class ListStorage<T> extends BaseStorage<{ [id: number]: T }> {

    constructor(resource: { [id: number]: T }, storageKey: string) {
        super(resource, storageKey)
    }

    get list(): T[] {
        return Object.values(this.resource).map(a => ({ ...a }))
    }
}