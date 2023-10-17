
import { IApplication } from "@interfaces/application";
import '@interfaces/window';
import { BehaviorSubject, Observable } from "rxjs";
import { MainComponent } from "./components/main/main";
import {WebComponentLoader} from "@cobreti/web-component";




export class Application implements IApplication {

    private _initSubject = new BehaviorSubject<IApplication|null>(null);
    private _mainComponent: MainComponent = new MainComponent(this);
    private _webComponentLoader: WebComponentLoader = new WebComponentLoader();

    constructor() {
    }

    async init() {

        await this._webComponentLoader.loadWebComponentsWithDirectoryUrl(`/web-components.${import.meta.env.MODE}.json`);

        this._initSubject.next(this);
    }

    get initObservable() : Observable<IApplication|null> { return this._initSubject; }

    get rootElm(): HTMLElement | null { return document.getElementById('root') }
}
