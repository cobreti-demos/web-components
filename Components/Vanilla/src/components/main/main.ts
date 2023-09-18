import template from './main.html?raw';
import styles from './main.scss?inline';
import '@interfaces/window';

import { IApplication } from '@interfaces/application';
import { first } from 'rxjs';


export class MainComponent {

    constructor(private _app : IApplication) {
        this._app.initObservable
            .pipe(first())
            .subscribe( () => {
                this.init();
            });
    }

    init() {
        let appElm = document.getElementById('app');
        if (appElm) {
            
            const templateNode = document.createElement('template');
            templateNode.innerHTML = template;
        
            const styleNode = document.createElement('style');
            styleNode.textContent = styles;
        
            appElm.appendChild(styleNode);
            appElm.appendChild(templateNode.content.cloneNode(true));               
         }

         const testAddressForm = document.getElementById('test-address-form');
         testAddressForm?.addEventListener('state-changed', (ev) => {
            console.log(ev);
         });
    }
}

