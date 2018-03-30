import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {
  baseUrl: string = 'https://images-api.nasa.gov/search?media_type=image&q=';

  constructor(
    private http: HttpClient
  ) { }

  search(query: string) {
    if (typeof query === 'undefined') {
      query = '';
    }
    let _URL = this.baseUrl + query;
    return this.http.get(_URL);
  }

  getImages(imageUrl: string) {
    return this.http.get(imageUrl);
  }
}
