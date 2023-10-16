import {Component, ElementRef, Input, SimpleChange, SimpleChanges, ViewEncapsulation} from '@angular/core';


class LogPanelProxy {

  setMessage(msg: string) {
    console.log(msg);
  }
}


@Component({
  selector: 'app-ng-log-panel',
  templateUrl: './ng-log-panel.component.html',
  styleUrls: ['./ng-log-panel.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class NgLogPanelComponent {

  private _proxy = new LogPanelProxy();

  constructor(private elRef: ElementRef) {
    elRef.nativeElement['proxy'] = this._proxy;
  }

  get proxy() { return this._proxy;}

  @Input() value!: string;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called', changes);
  }
}
