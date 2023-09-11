
import { IApplication } from "./interfaces/application";
import { webComponents } from "./web-components";
import './interfaces/window';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { MainComponent } from "./components/main/main";

export default class Application implements IApplication {

    private _initSubject = new BehaviorSubject<IApplication>(this);
    private _mainComponent: MainComponent | undefined;

    constructor() {
    }

    init() {
        window.webComponents = webComponents;

        this._mainComponent = new MainComponent(this);

        this._initSubject.next(this);
    }

    get initObservable() : Observable<IApplication> { return this._initSubject; }
}
