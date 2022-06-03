import { ComponentFixture } from '@angular/core/testing';
/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { ActionDirective } from './action.directive';
import { Key } from 'protractor';
import { By } from '@angular/platform-browser';

describe(`${ActionDirective.name}`, () => {

  let fixture: ComponentFixture<ActionDirectiveTestComponent>
  let component: ActionDirectiveTestComponent

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ActionDirectiveTestComponent, ActionDirective],
    }).compileComponents()

    fixture = TestBed.createComponent(ActionDirectiveTestComponent)
    component = fixture.componentInstance;
  })

  it('(DOM) should emit event with payload when ENTER key is pressed', () => {
    const divEl = fixture.debugElement.query(By.directive(ActionDirective)).nativeElement
    const event = new KeyboardEvent('keyup', {key: 'Enter'})
    divEl.dispatchEvent(event);
    expect(component.hasEvent()).toBeTrue()
  });

  it(`(DOM) should emit event with payload when clicked`, () => {
    const div: HTMLElement = fixture.nativeElement.querySelector('.dummy-component')
    const event = new KeyboardEvent('click')
    div.dispatchEvent(event);
    expect(component.hasEvent()).toBeTrue()
  })
});

@Component({
  template: `<div class="dummy-component" (appAction)="actionHandler($event)"></div>`
})
class ActionDirectiveTestComponent {
  event: Event = null;

  actionHandler(event: Event): void {
    this.event = event;
  }

  hasEvent(): boolean {
    return !!this.event;
  }
}