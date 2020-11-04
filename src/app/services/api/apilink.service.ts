import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiLinkService {
  // apiRoot = 'https://arkounts.com/kibali/api/v1/';
  // assetsRoot = 'https://arkounts.com';

  apiRoot = 'http://localhost:9016/kibali/api/v1/';
  assetsRoot = 'http://localhost:9016/kibali';

  apiLinks: Array<{ name: string, url: string }> = new Array();

  constructor(private http: HttpClient) {
    this.fillURLLinks();
  }

  /**
   * Gets url
   */
  getUrl(link: string): string {
    let foundURL = '';
    this.apiLinks.forEach((element: any) => {
      if (element.name === link) {
        foundURL = element.url;
      }
    });
    return this.apiRoot + '' + foundURL;
  }

  /**
   * Datas uplink
   */
  dataUplink(data: string, link: string): Observable<any> {
    return this.http.post(this.getUrl(link), data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * Handles error
   */
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // a client-side or network error occurred.
      return throwError('There was an error!! ' + error.error.message);
    } else {
      // the backend returned an unsuccessful response code.
      // the response body may contain clues as to what went wrong
      if (error.statusText === 'Unknown Error') {
        return throwError(
          'Something bad happened; please try again later!');
      }
      if (error.error.error === 'Unauthorized') {
        return throwError('Unauthorized');
      }
    }
    // retutn an observable with a user-facting error message
    return throwError(
      'Something bad happened; please try again later!');
  }

  fillURLLinks(): void { }

}
