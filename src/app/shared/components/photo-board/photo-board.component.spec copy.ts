/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PhotoBoardComponent } from './photo-board.component';
import { Photo } from './interfaces/photo';
import { Component, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';

function buildPhotoList(): Photo[] {
  const photos: Photo[] = []
  for (let index = 0; index < 8; index++) {
    photos.push({
      id: index + 1,
      url: '',
      description: ''
    })
  }
  return photos;
}

describe(`${PhotoBoardComponent.name}`, () => {
  let component: PhotoBoardTestComponent;
  let fixture: ComponentFixture<PhotoBoardTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoBoardComponent, PhotoBoardTestComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoBoardTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display rows and columns when (@Input photos) has value - onChanges', () => {
    component.photos = buildPhotoList();
    fixture.detectChanges();
    expect(component.board.rows.length).toBe(2)
    expect(component.board.rows[0].length).toBe(4)
  });


});

@Component({
  template: `<app-photo-board [photos]="photos"></app-photo-board>`
})

class PhotoBoardTestComponent {
  @ViewChild(PhotoBoardComponent) public board: PhotoBoardComponent;
  public photos: Photo[] = [];
}
