/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { PhotoBoardService } from './photo-board.service';
import { buildPhotoList } from '../test/build-photo-list';


const mockedData = {
  api: 'http://localhost:3000/photos',
  data: buildPhotoList()
}

describe('Service: PhotoBoard', () => {
  let service: PhotoBoardService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoBoardService]
    });

    service = TestBed.inject(PhotoBoardService);
    httpController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpController.verify();
  })

  it('should return photos with description in uppercase', done => {
   
    service.getPhotos().subscribe(photos => {
      expect(photos[0].description).toBe('EXAMPLE 1');
      expect(photos[1].description).not.toBe('EXAMPLe 2');
      done();
    }) 

    httpController
    .expectOne(mockedData.api)
    .flush(mockedData.data)
  });
});
