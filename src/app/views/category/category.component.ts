import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/model/balance.model';
import { CategoryService } from 'src/app/model/category.service';

@Component({
  templateUrl: './category.component.html',
  styles: [
  ]
})
export class CategoryComponent {

  form: FormGroup
  list: readonly Category[] = []
  target = this.service.getNewObject()


  constructor(builder: FormBuilder, private service: CategoryService) {
    this.form = builder.group({
      type: '',
      name: ''
    })
  }

  search() {

    this.list = this.service.search(this.form.value)
  }

  save(data: Category) {
    // Save Data
    this.service.save(data)
    // reload page
    this.search()
  }

  addNew() {
    this.target = this.service.getNewObject()
  }

  edit(data: Category) {
    this.target = data
  }

  switchDeleteStatus(id: number) {
    this.service.delete(id)
    this.list = this.service.search(this.form.value)
  }

}
