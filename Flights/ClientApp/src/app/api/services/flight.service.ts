/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { FlightRm } from '../models/flight-rm';

@Injectable({
  providedIn: 'root',
})
export class FlightService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findFlight
   */
  static readonly FindFlightPath = '/Flight/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findFlight$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFlight$Plain$Response(params: {
    id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<FlightRm>> {

    const rb = new RequestBuilder(this.rootUrl, FlightService.FindFlightPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FlightRm>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findFlight$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFlight$Plain(params: {
    id: string;
  },
  context?: HttpContext

): Observable<FlightRm> {

    return this.findFlight$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<FlightRm>) => r.body as FlightRm)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findFlight$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFlight$Json$Response(params: {
    id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<FlightRm>> {

    const rb = new RequestBuilder(this.rootUrl, FlightService.FindFlightPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FlightRm>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findFlight$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFlight$Json(params: {
    id: string;
  },
  context?: HttpContext

): Observable<FlightRm> {

    return this.findFlight$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<FlightRm>) => r.body as FlightRm)
    );
  }

  /**
   * Path part for operation searchFlight
   */
  static readonly SearchFlightPath = '/Flight';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchFlight$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFlight$Plain$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<FlightRm>>> {

    const rb = new RequestBuilder(this.rootUrl, FlightService.SearchFlightPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FlightRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchFlight$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFlight$Plain(params?: {
  },
  context?: HttpContext

): Observable<Array<FlightRm>> {

    return this.searchFlight$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<FlightRm>>) => r.body as Array<FlightRm>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchFlight$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFlight$Json$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<FlightRm>>> {

    const rb = new RequestBuilder(this.rootUrl, FlightService.SearchFlightPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FlightRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchFlight$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFlight$Json(params?: {
  },
  context?: HttpContext

): Observable<Array<FlightRm>> {

    return this.searchFlight$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<FlightRm>>) => r.body as Array<FlightRm>)
    );
  }

}
