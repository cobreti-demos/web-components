import {AddressForm} from "./address-form.ts";
import {Subject, takeUntil} from "rxjs";
import {HTMLElementWithApi} from "../HTMLElementWithApi.ts";
import {AddressFormApi} from "@vanilla-web-component/api";



export default class AddressFormComponent extends HTMLElementWithApi<AddressFormApi> {

    static readonly componentName = 'test-address-form';

    static registerComponent() {
        customElements.define(AddressFormComponent.componentName, AddressFormComponent);
    }

    private _shadowRoot: ShadowRoot | null = null;
    private _addressForm = new AddressForm();
    private _disconnected$ = new Subject<void>();

    constructor() {
        super( () => new AddressFormApi() );
    }

    connectedCallback() {
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._addressForm.connectedCallback(this._shadowRoot);

        this._addressForm.stateEngine.stateChangeObservable
            .subscribe(x => {
                this.webComponentApi.addressFormstateSubject.next(x);
            })

        this._addressForm.dispatchEventObservable
            .pipe(takeUntil(this._disconnected$))
            .subscribe((event) => {
                this.dispatchEvent(event);
            });
    }

    disconnectedCallback() {
        this._addressForm.disconnectedCallback();
        this._disconnected$.next();
    }
}
