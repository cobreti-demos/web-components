import { IApplication } from '@interfaces/application.ts';
import {WebComponentLoader} from "./web-component-loader.ts";
import {BehaviorSubject, Observable} from 'rxjs';
import {MainComponent} from "./components/main/main.ts";

export class Application implements IApplication {

    private _initSubject$ = new BehaviorSubject<IApplication | null>(null);
    private _mainComponent: MainComponent | null = null;

    constructor() {
    }

    async init() {

        await new WebComponentLoader('web-components.json').loadWebComponents();

        this._mainComponent = new MainComponent(this);

        this._initSubject$.next(this);
    }

    get initObservable() : Observable<IApplication | null> { return this._initSubject$; }

    get rootElm(): HTMLElement | null { return document.getElementById('root') }
}
