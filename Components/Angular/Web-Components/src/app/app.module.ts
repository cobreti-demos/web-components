import {Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { NgLogPanelComponent } from './ng-log-panel/ng-log-panel.component';

@NgModule({
  declarations: [
    NgLogPanelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(NgLogPanelComponent, {
      injector: this.injector
    });

    customElements.define('log-panel', el);
  }
}
