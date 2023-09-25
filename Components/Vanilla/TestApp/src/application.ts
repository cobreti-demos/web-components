
import { IApplication } from "@interfaces/application";
import '@interfaces/window';
import { BehaviorSubject, Observable } from "rxjs";
import { MainComponent } from "./components/main/main";


const webComponentsJsonUrl = '/web-components.json';


export interface WebComponentsEntry {
    url: string;
}


export class Application implements IApplication {

    private _initSubject = new BehaviorSubject<IApplication>(this);
    private _mainComponent: MainComponent | undefined;

    constructor() {
    }

    async init() {

        await this.loadWebComponents();

        this._mainComponent = new MainComponent(this);

        this._initSubject.next(this);
    }

    private async loadWebComponents() {

        try {
            const response = await fetch(webComponentsJsonUrl);

            if (!response.ok) {
                throw new Error(`unable to load ${webComponentsJsonUrl}`);
            }

            const text = await response.text();
            const content = JSON.parse(text) as [WebComponentsEntry];
        
            content.forEach((entry) => {
                const scriptElem = document.createElement('script');
                scriptElem.type = 'module';
                scriptElem.src = entry.url;
                document.head.append(scriptElem);
            });
        
                }
        catch (error) {
            console.error(error);
        }
    }

    get initObservable() : Observable<IApplication> { return this._initSubject; }
}
