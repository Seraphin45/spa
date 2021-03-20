import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IPeopleRetrivalModel } from '../Models/people-retrieval.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListPeopleResourceService {
  public constructor(private readonly _http: HttpClient) { }

  public list(): Observable<IPeopleRetrivalModel> {
    try {
      return this._http.get<IPeopleRetrivalModel>( `${environment.serverApiUrl}people`);
    } catch (error) {
      if (error && error.error instanceof ProgressEvent) {
        throw new Error('A connection could not be established. Please contact an administrator.');
      }
      throw Error(error.error);
    }
  }

  public page(page): Observable<IPeopleRetrivalModel> {
    try {
      return this._http.get<IPeopleRetrivalModel>( `${environment.serverApiUrl}people/?page=${page}`);
    } catch (error) {
      if (error && error.error instanceof ProgressEvent) {
        throw new Error('A connection could not be established. Please contact an administrator.');
      }
      throw Error(error.error);
    }
  }

  public search(term): Observable<IPeopleRetrivalModel> {
    try {
      return this._http.get<IPeopleRetrivalModel>( `${environment.serverApiUrl}people/?search=${term}`);
    } catch (error) {
      if (error && error.error instanceof ProgressEvent) {
        throw new Error('A connection could not be established. Please contact an administrator.');
      }
      throw Error(error.error);
    }
  }

  public detail(name): Observable<IPeopleRetrivalModel> {
    try {
      return this._http.get<IPeopleRetrivalModel>( `${environment.serverApiUrl}people/?search=${name}`);   /// There is no property id in the JSON object, it's why I queried with name 
    } catch (error) {
      if (error && error.error instanceof ProgressEvent) {
        throw new Error('A connection could not be established. Please contact an administrator.');
      }
      throw Error(error.error);
    }
  }


}
