import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchService } from './search.service';
import { environment } from '../../environments/environment';

describe('SearchService', () => {
  let searchService: SearchService;
  let httpMock: HttpTestingController;
  let mockData = {
    "collection":{
      "version": "1.0",
      "metadata": {
        "total_hits" : 1
      },
      "items": [{
        "links": [{
            "rel": "preview",
            "render": "image",
            "href": "https://images-assets.nasa.gov/image/sl2-81-157/sl2-81-157~thumb.jpg"
        }],
        "href": "https://images-assets.nasa.gov/image/sl2-81-157/collection.json",
        "data": [{
          "center" : "JSC",
          "date_created" : "1973-06-22T00:00:00Z",
          "nasa_id" : "sl2-81-157",
          "title" : "Black Hills Region, SD, USA",
          "media_type" : "image",
          "description" : "SL2-81-157 (22 June 1973)"
        }]
      }],
      "href" : "https://images-api.nasa.gov/search?media_type=image&q=sd"
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SearchService
      ]
    });

    searchService = TestBed.get(SearchService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should receive search result', (done) => {
    searchService.search('query')
                   .subscribe(res => {
                     expect(res).toEqual(mockData);
                     done();
                   });

    let countryRequest = httpMock.expectOne('https://images-api.nasa.gov/search?media_type=image&q=' + 'query');
    expect(countryRequest.request.method).toBe('GET');

    countryRequest.flush(mockData);

    httpMock.verify();
  });
});
