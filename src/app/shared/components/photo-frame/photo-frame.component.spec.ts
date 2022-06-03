import { element } from 'protractor';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PhotoFrameComponent } from './photo-frame.component';
import { PhotoFrameModule } from './photo-frame.module';

describe(PhotoFrameComponent.name, () => {
  let component: PhotoFrameComponent;
  let fixture: ComponentFixture<PhotoFrameComponent>;
  let el: DebugElement

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PhotoFrameModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`#${PhotoFrameComponent.prototype.like.name}
     Should trigger (@Output liked) once when called multiple times within debounce time `, fakeAsync(() => {
      let times = 0;
      component.liked.subscribe(() => times++);
      component.like();
      component.like();
      tick(500)
      expect(times).toBe(1)
  }))

  it(`#${PhotoFrameComponent.prototype.like.name} 
    Should trigger (@Output liked) twice when called outside debounce time`, fakeAsync(() => {
    let times = 0;
    component.liked.subscribe(() => times++);
    component.like();
    tick(500);
    component.like();
    tick(500);
    expect(times).toBe(2)
  }))

  it(`(DOM) Should display number of likes when (@Input likes) is incremented`, ( ) => {
    component.likes++;
    fixture.detectChanges();
    const element = el.queryAll(By.css('.like-counter'));
    expect(element[0].nativeElement.textContent.trim()).toBe('1')
  })

  it(`(DOM) Should update aria-label when (@Input likes) is incremented`, () => {
    component.likes++;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('1: people liked')
  })

  it(`(DOM) Should have aria-label with 0 (@Input likes)`, () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('0: people liked')
  })

  it(`(DOM) Should display image with src and description when bound to properties`, () => {
    const description = 'some description';
    const src = 'http://somesite.com/img.jpg';

    component.src = src;
    component.description = description;
    fixture.detectChanges();
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img'); 
    expect(img.src).toBe(src)
    expect(img.alt).toBe(description)
  })

});
