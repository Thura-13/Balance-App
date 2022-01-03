import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/model/balance.model';
import { CategoryService } from 'src/app/model/category.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnChanges {

  @Input()
  type?: string

  form: FormGroup
  category: readonly Category[] = []

  @Output()
  onSearch = new EventEmitter

  constructor(builder: FormBuilder, private service: CategoryService) {

    this.form = builder.group({
      type: '',
      category: '',
      from: '',
      to: ''
    })

    this.form.get('type')?.valueChanges.subscribe(type => {
      this.category = type ? service.search({ type: type, deleted: false }) : []
      this.form.patchValue({ category: '' })
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.form.patchValue({ type: this.type || '' })
  }

  search() {
    this.onSearch.emit(this.form.value)
  }


}
