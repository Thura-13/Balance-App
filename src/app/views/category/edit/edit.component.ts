import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/model/balance.model';
import { CategoryService } from 'src/app/model/category.service';

@Component({
  selector: 'edit-component',
  templateUrl: './edit.component.html',
  styles: [
  ]
})
export class EditComponent {

  form: FormGroup

  @Input()
  set data(data: Category) {
    this.form.patchValue(data)
  }

  @Output()
  onSave = new EventEmitter()


  constructor(builder: FormBuilder, private service: CategoryService) {
    this.form = builder.group({
      id: 0,
      type: ['', Validators.required],
      name: ['', [Validators.required, (control: AbstractControl) => {
        if (service.isAlreadyExistName(control.value)) {
          return {
            error: 'Category name is already exist'
          }
        }
        return null
      }]],
      deleted: false
    })
  }

  save() {
    this.onSave.emit(this.form.value)
  }


}
