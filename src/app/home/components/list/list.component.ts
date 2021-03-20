import { Component, OnInit } from '@angular/core';
import { ListPeopleResourceService } from '../../../core/services/list-people-resource.service'
import { IPeopleRetrivalModel } from '../../../core/Models/people-retrieval.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  public form: FormGroup;
  public pageNumber = [];
  public constructor(
    private readonly _service: ListPeopleResourceService,
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router) { }

  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ReadonlyArray<IPeopleRetrivalModel> = [];
  listOfData: ReadonlyArray<IPeopleRetrivalModel> = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: ReadonlyArray<IPeopleRetrivalModel>): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  public ngOnInit(): void {
    this.initializeForm();
    this.getPeopleList();
  }

  public getPeopleList(): void {
    for (let index = 1; index <= 9; index++) {
      this.pageNumber.push(index);
    }
    this._service.list().subscribe(data => {
      this.listOfData = data.results
    })
  }
  public pageNumberChange(): void {
    this._service.page(this.form.value.getPageNumber).subscribe(data => {
      this.listOfData = data.results
    })
  }

  public search(): void {
    this._service.search(this.form.value.getSearch).subscribe(data => {
      this.listOfData = data.results
    })
  }

  public view(name: string): void {
    sessionStorage.setItem('getName', name)
    this._router.navigate(['/dashboard/detail']);
  }

  public initializeForm(): void {
    this.form = this._formBuilder.group({
      getPageNumber: ['', [Validators.required]],
      getSearch: ['', [Validators.required]],
    });
  }
}
