import template from './main.html?raw';
import styles from './main.scss?inline';
import {IApplication} from "@interfaces/application.ts";
import {first} from "rxjs";


export class MainComponent {

    constructor(private _app: IApplication) {
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

            const headerElm = rootElm.querySelector('#header') as HTMLElement;
            if (headerElm) {
                headerElm.addEventListener('on-login', (event) => {
                    console.log('header element event : ', event);
                });
            }
        }
    }
}

