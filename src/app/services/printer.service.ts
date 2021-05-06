import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorhandlerService } from './errorhandler.service';
import {Printer, VPrinter} from '../Models/Printer'

@Injectable({
  providedIn: 'root'
})
export class PrinterService {

  // Make
  rootUrl = environment.sportsApiUrl;
  param = 'Printers';
  paramVGet = '/GetAlVl';
  paramGet = '/GetAll';
  printerId = '?printerId=';
  constructor(private http: HttpClient, private errorHandlerService: ErrorhandlerService) { }


  getAllPrinters(): Observable<Printer[]> {
    return this.http.get<Printer[]>(`${this.rootUrl}${this.param}${this.paramGet}`)
      .pipe(catchError(this.errorHandlerService.handleError));
  }
  getAllVPrinters(): Observable<VPrinter[]> {
    return this.http.get<VPrinter[]>(`${this.rootUrl}${this.param}${this.paramVGet}`)
      .pipe(catchError(this.errorHandlerService.handleError));
  }


  getSinglePrinter(printerId: number): Observable<Printer> {
    return this.http.get<Printer>(`${this.rootUrl}${this.param}${this.printerId}${printerId}`);
  }

  addPrinter(printer: Printer): Observable<any> {
    return this.http.post<any>(`${this.rootUrl}${this.param}`, printer)
      .pipe(map((data: any) => {
        return data;
      }),
        catchError(this.errorHandlerService.handleCrudError));
  }
  updatePrinter(printer: Printer): Observable<any> {
    return this.http.put<any>(`${this.rootUrl}${this.param}`, printer)
      .pipe(map((data: any) => {
        return data;
      }),
        catchError(this.errorHandlerService.handleCrudError));
  }

  deletePrinter(printerId: number) {
    return this.http.delete(`${this.rootUrl}${this.param}${this.printerId}${printerId}`)
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError(this.errorHandlerService.handleCrudError));
  }
}
