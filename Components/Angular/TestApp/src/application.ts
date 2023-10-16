
import { IApplication } from "@interfaces/application";
import '@interfaces/window';
import { BehaviorSubject, Observable } from "rxjs";
import {WebComponentLoader} from "./web-component-loader.ts";
import {MainComponent} from "./components/main/main.ts";
// import { MainComponent } from "./components/main/main";




export interface WebComponentsEntry {
    url: string;
}


export class Application implements IApplication {

    private _webComponentLoader = new WebComponentLoader('/web-components.{mode}.json');
    // private readonly  _webComponentsJsonUrl = '/web-components.{mode}.json';
    private _initSubject = new BehaviorSubject<IApplication|null>(null);
    private _mainComponent: MainComponent | undefined;

    constructor() {
    }

    get mainComponent() : MainComponent | undefined { return this._mainComponent;}

    async init() {

        await this._webComponentLoader.loadWebComponents();
        // await this.loadWebComponents();

        this._mainComponent = new MainComponent(this);

        this._initSubject.next(this);
    }

    get initObservable() : Observable<IApplication|null> { return this._initSubject; }

    get rootElm(): HTMLElement | null { return document.getElementById('root') }
}
