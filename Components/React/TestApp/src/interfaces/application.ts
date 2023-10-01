import {Observable} from "rxjs";

export interface IApplication {
    get initObservable() : Observable<IApplication | null>;

    get rootElm(): HTMLElement | null;
}