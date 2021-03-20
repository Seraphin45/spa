import { TestBed } from '@angular/core/testing';

import { ListPeopleResourceService } from './list-people-resource.service';

describe('ListPeopleResourceService', () => {
  let service: ListPeopleResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListPeopleResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
