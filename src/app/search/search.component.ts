import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SearchService, PagerService } from '../_services/index';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from 'ngx-image-gallery';

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
  pagedItems: any[] = [];
  pagedImages: string[] = [];
  itemImages: GALLERY_IMAGE[] = [];
  openModalWindow: false;


  // get reference to gallery component
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;

  // gallery configuration
  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: false,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private pagerService: PagerService
  ) { }

  ngOnInit() {
    this.itemImages = [];
    this.pagedImages = [];
    this.route.queryParams.debounceTime(500).distinctUntilChanged()
      .subscribe(
        params => {
          if (typeof params.q === 'undefined' || params.q === '') {
            return;
          }
          this.searchService.search(params.q)
            .subscribe(
              result => {
                this.allItems = result['collection']['items'];
                this.total = result['collection']['metadata']['total_hits'];
                this.search_results = this.allItems.length;
                // initialize to page 1
                this.setPage(1);
              });
      });
  }

  search() {
    if (typeof this.model.keyword === 'undefined') {
      this.model.keyword = '';
    }
    this.router.navigateByUrl(`/search?q=${this.model.keyword}`);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page, 4);
    this.pagedImages = [];
    // get current page of allItems
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    for (const item in this.pagedItems) {
      this.pagedItems[item]['images'] = [];
      this.pagedItems[item]['index'] = item;
      this.searchService.getImages(this.pagedItems[item]['href'])
        .subscribe(
          data => {
            console.log('item: ', item);
            console.log('item.href: ', this.pagedItems[item]['href']);
            console.log('data: ', data);
            this.pagedItems[item]['images'] = data;
            this.pagedImages.push(data[0]);
          });
    }
  }

  imageViewer(item: any = {}) {
    this.itemImages = [];

    for (let i = 0; i < item['images'].length - 1; i++) {
      const imageUrl = item['images'][i];
      const img = {
        url: imageUrl,
        thumbnaiURL: imageUrl,
        altText: imageUrl,
        title: imageUrl
      };
      this.itemImages.push(img);
    }
    this.openGallery();
  }

  // METHODS
  // open gallery
  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }

  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }

  // set new active(visible) image in gallery
  newImage(index: number = 0) {
    this.ngxImageGallery.setActiveImage(index);
  }

  // EVENTS
  // callback on gallery opened
  galleryOpened(index) {
    console.log('Gallery opened at index ', index);
  }

  // callback on gallery closed
  galleryClosed() {
    console.log('Gallery closed.');
  }

  // callback on gallery image clicked
  galleryImageClicked(index) {
    console.log('Gallery image clicked with index ', index);
  }

  // callback on gallery image changed
  galleryImageChanged(index) {
    console.log('Gallery image changed to index ', index);
  }

  // callback on user clicked delete button
  deleteImage(index) {
    console.log('Delete image at index ', index);
  }

}

// gallery configuration
export interface GALLERY_CONF {
  imageBorderRadius?: string; // css border radius of image (default 3px)
  imageOffset?: string; // add gap between image and it's container (default 20px)
  imagePointer?: boolean; // show a pointer on image, should be true when handling onImageClick event (default false)
  showDeleteControl?: boolean; // show image delete icon (default false)
  showCloseControl?: boolean; // show gallery close icon (default true)
  showExtUrlControl?: boolean; // show image external url icon (default true)
  showImageTitle?: boolean; // show image title text (default true)
  showThumbnails?: boolean; // show thumbnails (default true)
  closeOnEsc?: boolean; // close gallery on `Esc` button press (default true)
  reactToKeyboard?: boolean; // change image on keyboard arrow press (default true)
  reactToMouseWheel?: boolean; // change image on mouse wheel scroll (default true)
  reactToRightClick?: boolean; // disable right click on gallery (default false)
  thumbnailSize?: number; // thumbnail size (default 30)
  backdropColor?: string; // gallery backdrop (background) color (default rgba(13,13,14,0.85))
  inline?: boolean; // make gallery inline (default false)
  showArrows?: boolean; // show prev / next arrows (default true)
}

// gallery image
export interface GALLERY_IMAGE {
  url: string; // url of the image
  thumbnailUrl?: string; // thumbnail url (recommended), if not present, gallery will use `url` property to get thumbnail image.
  altText?: string; // alt text for image
  title?: string; // title of the image
  extUrl?: string; // external url of image
  extUrlTarget?: string; // external url target e.g. '_blank', '_self' etc.
}
