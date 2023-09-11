import { Observable } from "rxjs";

export interface IApplication {
    get initObservable() : Observable<IApplication>;
}
