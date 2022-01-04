import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BalanceWithDetail, Category, Type } from 'src/app/model/balance.model';
import { BalanceService } from 'src/app/model/balance.service';
import { CategorySearch, CategoryService } from 'src/app/model/category.service';

@Component({
  templateUrl: './balance-edit.component.html',
  styles: [
  ]
})


export class BalanceEditComponent {

  type = ''
  form: FormGroup
  category: readonly Category[] = []


  constructor(
    route: ActivatedRoute,
    catService: CategoryService,
    private builder: FormBuilder,
    private router: Router,
    private balanceService: BalanceService

  ) {

    this.form = builder.group({
      // Balance Form
      balance: builder.group({
        id: 0,
        category: ['', Validators.required],
        useDate: ['', Validators.required],
        total: [0, Validators.min(500)],
        employee: ['', Validators.required]
      }),
      // Balance Detail Form
      details: builder.array([])
    })



    // Calculate Total
    this.detailFormArray.valueChanges.subscribe(value => {
      const total = this.detailFormArray.controls.map(m => m.value.amount).reduce((a, b) => a + b)
      this.form.get('balance')?.patchValue({ total: total })
    })

    route.params.subscribe(param => {
      this.type = param['type']
      const id = Number(param['id'])

      const categorySearch: CategorySearch = { type: this.type as Type, deleted: true }

      if (id) {

        // Edit
        // Get Balance Data And Detail Data
        const dto = balanceService.findById(id)
        const { balance, details } = dto

        // Set balance data
        this.form.patchValue({ balance: balance })

        // Set Detail data
        details.forEach(d => {
          const control = this.getDetailControl()
          control.patchValue(d)
          this.detailFormArray.push(control)
        })

      } else {
        // Add New
        this.addDetail()
      }

      this.category = catService.search(categorySearch)

    })
  }

  addDetail() {
    this.detailFormArray.push(this.getDetailControl())
  }

  removeDetail(id: number) {
    if (this.detailFormArray.length != 1) {
      this.detailFormArray.removeAt(id)
    } else if (this.detailFormArray.length === 1) {
      this.detailFormArray.removeAt(id)
      this.addDetail()
    }
  }

  get detailFormArray(): FormArray {
    return this.form.get('details') as FormArray
  }

  save() {
    const id: number = this.balanceService.save(this.form.value)

    // Navigate To Detail View 
    this.router.navigate(['/balance', this.type, id, 'detail'])
  }

  private getDetailControl(): FormGroup {
    return this.builder.group({
      id: 0,
      balance: 0,
      item: ['', Validators.required],
      unit: [0, Validators.min(1)],
      amount: [0, Validators.min(500)],
      remark: ''
    })
  }
}
