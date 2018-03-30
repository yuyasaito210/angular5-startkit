import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {
  baseUrl: string;

  constructor(
    private http: HttpClient
  ) { }

  search(query: string) {
    this.baseUrl = 'https://images-api.nasa.gov/search?media_type=image&q=';
    if (typeof query === 'undefined') {
      query = '';
    }
    const _URL = this.baseUrl + query;
    return this.http.get(_URL);
  }

  getImages(imageUrl: string) {
    return this.http.get(imageUrl);
  }
}
