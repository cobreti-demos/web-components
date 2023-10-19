import template from './main.html?raw';
import styles from './main.scss?inline';
import '@interfaces/window';

import { IApplication } from '@interfaces/application';
import { first } from 'rxjs';
import {AddressFormElement, listenOnAddressFormStateEvent} from "@vanilla-web-component/api";


export class MainComponent {

    constructor(private _app : IApplication) {
        this._app.initObservable
            .pipe(first(x => x != null))
            .subscribe( (appInstance) => {
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

            const testAddressForm = rootElm.querySelector('.form') as AddressFormElement;

            if (testAddressForm) {
                testAddressForm.webComponentApi
                    .addressFormStateChanged
                    .subscribe(x => {
                        console.log('using webComponentApi : ', x);
                    });
            }

            listenOnAddressFormStateEvent(testAddressForm, (ev) => {
                console.log('using addEventListener : ', ev);
            })
         }
    }
}

