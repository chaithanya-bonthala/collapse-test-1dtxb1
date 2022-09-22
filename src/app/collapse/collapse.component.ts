import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy
} from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes
} from "@angular/animations";

import { Observable, Subject, ReplaySubject } from "rxjs";
import { map, take } from "rxjs/operators";

@Component({
  selector: "app-collapse,[app-collapse]",
  template: `<div class="blackborder" [@openedState]="openedState$ | async" class="text-truncate" style="display:'none'"><ng-content></ng-content></div>`,
  animations: [
    trigger("openedState", [
      // state("true", style({}))
      state("true", style({ height: "*" })),
      state("false", style({ overflow: 'hidden', height: '0px', display: 'none' })),
      transition("false <=> true", animate("400ms ease-in-out")),
      transition("void => *", animate(400, keyframes([
        style({ 'background-color': "#000" ,offset:0}),
        style({ 'background-color': "#444",offset:.1 }),
        style({ 'background-color': "#999",offset:.5 }),
        style({ 'background-color': "#fff",offset:1 })
      ]))),
      // transition("false => true", animate("100ms ease-out"))
    ])
  ]
})
export class CollapseComponent {
  private openedSubject: ReplaySubject<boolean>;
  opened$: Observable<boolean>;
  openedState$: Observable<string>;
  @Input() newlyAdded: boolean;
  open = () => {
    this.openedSubject.next(true);
  };
  close = () => {
    this.openedSubject.next(false);
  };
  toggle = () => {
    this.opened$.pipe(take(1)).subscribe(x => this.openedSubject.next(!x));
    // this.openedSubject = !this.opened;
  };
  constructor() {
    this.openedSubject = new ReplaySubject(1);
    this.opened$ = this.openedSubject.asObservable();
    this.openedState$ = this.opened$.pipe(map(x => x.toString()));

    this.openedSubject.next(false);
  }
}
