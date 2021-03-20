import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { ListPeopleResourceService } from '../../../core/services/list-people-resource.service'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
   public detail = null;
   
  public constructor(
    private readonly _service: ListPeopleResourceService) { }

  public ngOnInit(): void {
    this.getDetail();
  }

  public getDetail() : void{
    this._service.detail(sessionStorage.getItem('getName')).subscribe(data => {
       this.detail = data.results;
    })
    sessionStorage.clear();
  }

}
