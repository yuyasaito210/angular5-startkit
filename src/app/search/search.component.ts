import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SearchService, PagerService } from '../_services/index';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  model: any = {};
  allItems: any[] = [];
  total: number;
  search_results: number;
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private pagerService: PagerService
  ) { }

  ngOnInit() {
    this.route.queryParams.debounceTime(500).distinctUntilChanged()
      .subscribe(
        params => {

          console.log("params.q: ", params.q);
          this.searchService.search(params.q)
            .subscribe(
              result => {
                console.log("result: ", result);
                this.allItems = result['collection']['items'];
                this.total = result['collection']['metadata']['total_hits'];
                this.search_results = this.allItems.length;
                console.log("this: ", this);
                // initialize to page 1
                this.setPage(1);
              });
      });
  }

  search() {
    console.log(this.model.keyword);
    this.router.navigateByUrl(`/search?q=${this.model.keyword}`);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of allItems
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log("this.pagedItems: ", this.pagedItems);
    for (let item in this.pagedItems) {
      this.searchService.getImages(this.pagedItems[item]['href'])
        .subscribe(
          data => {
            console.log("item: ", item);
            console.log("item.href: ", this.pagedItems[item]['href']);
            console.log("data: ", data);
            this.pagedItems[item]['images'] = data;
          });
    }
  }

  imageViewer(imageUrls: string) {

  }

}
