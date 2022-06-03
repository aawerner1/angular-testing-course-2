import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-photo-frame',
  templateUrl: './photo-frame.component.html',
  styleUrls: ['./photo-frame.component.scss']
})
export class PhotoFrameComponent implements OnInit, OnDestroy {

  @Output() liked: EventEmitter<void> = new EventEmitter()
  @Input() src: string;
  @Input() description: string;
  @Input() likes = 0;
  private debounceSubject: Subject<void> = new Subject()
  private unsubscribe: Subject<void> = new Subject()
  constructor() { }
 

  ngOnInit() {
    this.debounceSubject
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => { this.liked.emit(); this.likes++})
  }

  like(): void {
    this.debounceSubject.next()
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
    this.debounceSubject.unsubscribe();
  }

}
