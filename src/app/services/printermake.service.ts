import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorhandlerService } from './errorhandler.service';
import {Make} from '../Models/PrinterMake';


@Injectable({
  providedIn: 'root'
})
export class PrintermakeService {

  // Make
  rootUrl = environment.sportsApiUrl;
  param = 'PrinterMakes';
  paramGet = '/GetAllMakes';
  makeID = '?makeId=';
  constructor(private http: HttpClient, private errorHandlerService: ErrorhandlerService) { }


  getAllMakes(): Observable<Make[]> {
    return this.http.get<Make[]>(`${this.rootUrl}${this.param}${this.paramGet}`)
      .pipe(catchError(this.errorHandlerService.handleError));
  }


  getSingleMake(makeId: number): Observable<Make> {
    return this.http.get<Make>(`${this.rootUrl}${this.param}${this.makeID}${makeId}`);
  }

  addMake(make: Make): Observable<any> {
    return this.http.post<any>(`${this.rootUrl}${this.param}/AddMake`, make)
      .pipe(map((data: any) => {
        return data;
      }),
        catchError(this.errorHandlerService.handleCrudError));
  }
  updateMake(make: Make): Observable<any> {
    return this.http.put<any>(`${this.rootUrl}${this.param}`, make)
      .pipe(map((data: any) => {
        return data;
      }),
        catchError(this.errorHandlerService.handleCrudError));
  }

  deleteMake(makeId: number) {
    return this.http.delete(`${this.rootUrl}${this.param}${this.makeID}${makeId}`)
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError(this.errorHandlerService.handleCrudError));
  }

}
