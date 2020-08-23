import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataResponse } from '@cx-shared/types';

// get location path name
export const pathname = location.pathname.replace(/\//g, '');

// create API URL for requests
export const apiUrl = pathname.length
  ? `${location.protocol}//${location.host}/${pathname}/?api`
  : `${location.protocol}//${location.host}/?api`;

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private httpClient: HttpClient) {}

  /**
   * main (global) GET request
   * @param url URL to call (additional end of API URL)
   * @param params URL query params (object)
   */
  get<T>(url: string, params?: object): Observable<T> {
    // define request headers
    const headers = new HttpHeaders().set(
      'Accept',
      'application/json, text/plain, */*'
    );

    return this.httpClient
      .get<DataResponse<T>>(this.composeUrl(apiUrl, url, params), {
        headers,
      })
      .pipe(map((response) => response.data));
  }

  /**
   * main (global) POST request
   * @param url URL to call (additional end of API URL)
   * @param body body of API call
   * @param params URL query params (object)
   */
  post<T>(url: string, body?: {}, params?: object): Observable<T> {
    // assing body object to empty object
    body = Object.assign({}, body);

    // define request headers
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json, text/plain, */*');

    return this.httpClient
      .post<DataResponse<T>>(this.composeUrl(apiUrl, url), body, {
        headers,
      })
      .pipe(map((response) => response.data));
  }

  /**
   * Compose request URL
   * @param basicUrl basic (like API) url
   * @param additionUrl specific (API) url addition like 'doSomething' (.../API_URL/doSomething)
   * @param queryParams url query params (in object) - needs to be serialized
   */
  private composeUrl(
    basicUrl: string,
    additionUrl?: string,
    queryParams?: object
  ): string {
    // add URL addition if exists
    const requestUrl = additionUrl ? `${basicUrl}/${additionUrl}` : basicUrl;

    // query params or empty object
    queryParams = Object.assign({}, queryParams);

    // create search params object
    const query: HttpParams = new HttpParams();

    // set all query params to HttpParams object
    Object.keys(queryParams).map((key) => {
      query.set(key, queryParams[key]);
    });

    // add URL query params if exits and return
    return query.toString().length ? `${requestUrl}?${query}` : requestUrl;
  }
}
