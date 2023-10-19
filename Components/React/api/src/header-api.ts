import {LoginData} from "./login-data.ts";
import {Observable, Subject} from "rxjs";

export class HeaderApi {

    constructor() {
        console.log('creating HeaderApi instance');
    }

    loginSubject = new Subject<LoginData>();

    get loginObserver(): Observable<LoginData> { return this.loginSubject; }
}
