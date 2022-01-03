export type Type = 'Income' | 'Expense'

export interface Category {
    readonly id: number,
    readonly name: string,
    readonly type: Type | '',
    readonly deleted: boolean
}

export interface Balance {
    readonly id: number,
    readonly category: any,
    readonly useDate: Date
    readonly total: number,
    readonly employee: string
}

export interface BalanceVO {
    readonly id: number,
    readonly category: Category,
    readonly useDate: Date
    readonly employee: string,
    readonly total: number
    readonly balance: number
}

export interface BalanceDetails {
    id: number,
    balance: any
    item: string,
    unit: number,
    amount: number,
    remark: string
}


export interface BalanceWithDetail {
    balance: Balance,
    details: BalanceDetails[]
}

export interface StorageService {

    loadResources(): void
    saveResources(): void
}