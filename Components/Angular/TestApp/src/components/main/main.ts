import template from './main.html?raw';
import styles from './main.scss?inline';
import '@interfaces/window';

import { IApplication } from '@interfaces/application';
import { first } from 'rxjs';
import {LogPanelElement} from "@ng-web-component/api";


export class MainComponent {

    constructor(private _app : IApplication) {
        this._app.initObservable
            .pipe(first(x => x != null))
            .subscribe( (_) => {
                this.init();
            });
    }

    init() {
        let rootElm = this._app.rootElm;
        if (rootElm) {
            
            const templateNode = document.createElement('template');
            templateNode.innerHTML = template;
        
            const styleNode = document.createElement('style');
            styleNode.textContent = styles;
        
            rootElm.appendChild(styleNode);
            rootElm.appendChild(templateNode.content.cloneNode(true));

            const logPanelElm = document.getElementById('log-panel') as LogPanelElement;
            if (logPanelElm) {
                console.log(logPanelElm.webComponentApi);
            }
            // const proxy = logPanelElm.proxy;
            // debugger;
         }
    }
}

