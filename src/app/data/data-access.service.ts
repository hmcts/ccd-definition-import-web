import { Injectable } from '@angular/core';
import { Headers, URLSearchParams } from '@angular/http';
import { HttpService } from '../domain/http/http.service';

@Injectable()
export class DataAccessService {
  constructor(private readonly httpService: HttpService) {}

  private createHeaders(withContent?: boolean) {
    let headers: Headers = new Headers({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Accept': 'application/json, text/plain, */*'
    });

    if (withContent) {
      headers.append('Content-Type', 'application/json;charset=UTF-8');
    }

    return headers;
  }

  GET(url: string, params?: URLSearchParams) {
    return this.httpService.get(url, {
      headers: this.createHeaders(),
      search: params
    });
  }

  POST(url: string, data: any) {
    return this.httpService.post(url, data, {
      headers: this.createHeaders(true)
    });
  }

  POSTMULTIPART(url: string, formData: FormData) {
    let headers = this.createHeaders();
    // Explicitly set Content-Type to null, so that it will be deleted by HttpService.sanitiseHeaders(). This is
    // necessary for Angular to set the correct Content-Type of multipart/form-data.
    headers.append('Content-Type', null);
    return this.httpService.post(url, formData, {
      headers: headers
    });
  }

  PUT(url: string, data: any) {
    return this.httpService.put(url, data, {
      headers: this.createHeaders(true)
    });
  }

  DELETE(url: string) {
    return this.httpService.delete(url, {
      headers: this.createHeaders()
    });
  }
}
