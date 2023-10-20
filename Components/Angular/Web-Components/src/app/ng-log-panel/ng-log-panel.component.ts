import {Component, ElementRef, Input, SimpleChange, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {LogPanelApi} from "@ng-web-component/api";



@Component({
  selector: 'app-ng-log-panel',
  templateUrl: './ng-log-panel.component.html',
  styleUrls: ['./ng-log-panel.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class NgLogPanelComponent {

  private _api = new LogPanelApi();

  constructor(private elRef: ElementRef) {
    elRef.nativeElement['webComponentApi'] = this._api;
  }

  get webComponentApi() { return this._api;}

  @Input() value!: string;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called', changes);
  }
}
