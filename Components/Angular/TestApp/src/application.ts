
import { IApplication } from "@interfaces/application";
import '@interfaces/window';
import { BehaviorSubject, Observable } from "rxjs";
import {MainComponent} from "./components/main/main.ts";
import {WebComponentLoader} from '@cobreti/web-component';




export interface WebComponentsEntry {
    url: string;
}


export class Application implements IApplication {

    private _webComponentLoader : WebComponentLoader = new WebComponentLoader();
    private _initSubject = new BehaviorSubject<IApplication|null>(null);
    private _mainComponent: MainComponent | undefined;

    constructor() {
    }

    get mainComponent() : MainComponent | undefined { return this._mainComponent;}

    async init() {

        const webComponentsDirectoryUrl = `/web-components.${import.meta.env.MODE}.json`;

        await this._webComponentLoader.loadWebComponentsWithDirectoryUrl(webComponentsDirectoryUrl);

        this._mainComponent = new MainComponent(this);

        this._initSubject.next(this);
    }

    get initObservable() : Observable<IApplication|null> { return this._initSubject; }

    get rootElm(): HTMLElement | null { return document.getElementById('root') }
}
