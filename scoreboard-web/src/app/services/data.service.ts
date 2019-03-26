import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Entry } from "../model/entry";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

interface FlagResult {
  success: Boolean
}

const api = environment.apiAddress;

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private entriesUrl = `${api}/api/entries`;
  private flagUrl = `${api}/api/submitFlag`;

  constructor(private http: HttpClient) { }

  getData(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.entriesUrl);
  }

  submitFlag(flag: String, name: String): Observable<HttpResponse<any>> {
    var resp: Observable<HttpResponse<any>> = this.http.post<any>(this.flagUrl, { flag: flag, name: name }, httpOptions);
    return resp;
  }

}