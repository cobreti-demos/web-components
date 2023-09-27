import {AddressForm} from "./address-form.ts";
import {Subject, takeUntil} from "rxjs";

export default class AddressFormComponent extends HTMLElement {

    private _shadowRoot: ShadowRoot | null = null;
    private _addressForm = new AddressForm();
    private _disconnected$ = new Subject<void>();

    constructor() {
        super();
    }

    connectedCallback() {
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._addressForm.connectedCallback(this._shadowRoot);

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
