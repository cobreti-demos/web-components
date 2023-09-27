import { Subject, debounceTime, fromEvent, takeUntil } from 'rxjs';
import template from './address-form.html?raw';
import styles from './address-form.scss?inline';
import { AddressFormState } from './address-form-state';
import { StateEngine } from '../state-engine';


export default class AddressForm extends HTMLElement {

    readonly _debounceTime = 500;

    _shadowRoot: ShadowRoot | null;

    _state: StateEngine<AddressFormState> = new StateEngine<AddressFormState>({});
    _disconnected$ = new Subject<void>();

    constructor() {
        super();

        const templateNode = document.createElement('template');
        templateNode.innerHTML = template;

        const styleNode = document.createElement('style');
        styleNode.textContent = styles;
        

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(styleNode);
        this._shadowRoot.appendChild(templateNode.content.cloneNode(true));
    }

    onPostalCodeChanged(elm: HTMLInputElement, ev: Event) {
        this.setState({
            postalCode: elm.value
        });
    }

    onAddressChanged(elm: HTMLInputElement, ev: Event) {
        this.setState({
            address: elm.value
        });
    }

    onCityChanged(elm: HTMLInputElement, ev: Event) {
        this.setState({
            city: elm.value
        });
    }

    connectedCallback() {
        if (this._shadowRoot) {
            const postalCodeElm = this._shadowRoot.getElementById('postal-code') as HTMLInputElement;
            if (postalCodeElm) {
                fromEvent(postalCodeElm, 'input')
                    .pipe(
                        debounceTime(this._debounceTime),
                        takeUntil(this._disconnected$))
                    .subscribe(ev => this.onPostalCodeChanged(postalCodeElm, ev));
            }

            const addressElm = this._shadowRoot.getElementById('address') as HTMLInputElement;
            if (addressElm) {
                fromEvent(addressElm, 'input')
                    .pipe(
                        debounceTime(this._debounceTime),
                        takeUntil(this._disconnected$))
                    .subscribe(ev => this.onAddressChanged(addressElm, ev));
            }

            const cityElm = this._shadowRoot.getElementById('city') as HTMLInputElement;
            if (cityElm) {
                fromEvent(cityElm, 'input')
                    .pipe(
                        debounceTime(this._debounceTime),
                        takeUntil(this._disconnected$))
                    .subscribe(ev => this.onCityChanged(cityElm, ev));
            }
        }

        this._state.stateChangeObservable
            .pipe(takeUntil(this._disconnected$))
            .subscribe((data) => {
                this.dispatchEvent(new CustomEvent('state-changed', {
                    detail: {
                        oldState: data.oldState,
                        changes: data.changes,
                        state: data.state
                    }
                }))
            });
    }

    disconnectedCallback() {
        console.log('disconnected');
        this._disconnected$.next();
    }

    private setState(newState: AddressFormState) {
        this._state.update(newState);
    }
}
