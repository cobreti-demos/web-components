import { IApplication } from '@interfaces/application.ts';
import {BehaviorSubject, Observable} from 'rxjs';
import {MainComponent} from "./components/main/main.ts";
import {WebComponentLoader} from "@cobreti/web-component";

export class Application implements IApplication {

    private _initSubject$ = new BehaviorSubject<IApplication | null>(null);
    private _mainComponent: MainComponent | null = null;

    constructor() {
    }

    async init() {

        const webComponentsDirectoryUrl = `/web-components.${import.meta.env.MODE}.json`;

        await new WebComponentLoader().loadWebComponentsWithDirectoryUrl(webComponentsDirectoryUrl);

        this._mainComponent = new MainComponent(this);

        this._initSubject$.next(this);
    }

    get initObservable() : Observable<IApplication | null> { return this._initSubject$; }

    get rootElm(): HTMLElement | null { return document.getElementById('root') }
}
