import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Entry } from "../model/entry";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

interface FlagResult {
  success: Boolean
}

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private entriesUrl = "http://localhost:8080/api/entries";
  private flagUrl = "http://localhost:8080/api/submitFlag";
  private scoreboardEntryUrl = "http://localhost:8080/api/scoreboardEntryUrl"

  constructor(private http: HttpClient) { }

  getData(): Observable<Entry[]> {
    // return of([{ name: "TestName", solveDate: "TestSolveDate" }]) 
    return this.http.get<Entry[]>(this.entriesUrl)
      .pipe(
        catchError(this.handleError<Entry[]>('getData', []))
      );
  }

  submitFlag(flag: String): Observable<Boolean> {
    var resp: Observable<any> = this.http.post<any>(this.flagUrl, {flag: flag}, httpOptions);
    return resp.pipe(map(resp => resp.success == true ));
  }

  sumbitScoreboardEntry(flag: String, name: String): Observable<{}> {
    return this.http.post<{}>(this.scoreboardEntryUrl, {flag: flag, name: name}, httpOptions);
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}