import { debounceTime, fromEvent } from 'rxjs';
import template from './address-form.html?raw';
import styles from './address-form.scss?inline';
import { AddressFormState } from './address-form-state';
import { StateEngine } from '../../state-engine';


export default class AddressForm extends HTMLElement {

    readonly _debouceTime = 500;

    _shadowRoot: ShadowRoot | null;

    _state: StateEngine<AddressFormState> = new StateEngine<AddressFormState>({});

    constructor() {
        super();

        this._state.stateChangeObservable
            .subscribe(x => {
                console.log(x);
            });

        const templateNode = document.createElement('template');
        templateNode.innerHTML = template;

        const styleNode = document.createElement('style');
        styleNode.textContent = styles;
        

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(styleNode);
        this._shadowRoot.appendChild(templateNode.content.cloneNode(true));

        const postalCodeElm = this._shadowRoot.getElementById('postal-code') as HTMLInputElement;
        if (postalCodeElm) {
            fromEvent(postalCodeElm, 'input')
                .pipe(debounceTime(this._debouceTime))
                .subscribe(ev => this.onPostalCodeChanged(postalCodeElm, ev));
        }

        const addressElm = this._shadowRoot.getElementById('address') as HTMLInputElement;
        if (addressElm) {
            fromEvent(addressElm, 'input')
                .pipe(debounceTime(this._debouceTime))
                .subscribe(ev => this.onAddressChanged(addressElm, ev));
        }

        const cityElm = this._shadowRoot.getElementById('city') as HTMLInputElement;
        if (cityElm) {
            fromEvent(cityElm, 'input')
                .pipe(debounceTime(this._debouceTime))
                .subscribe(ev => this.onCityChanged(cityElm, ev));
        }

        this._state.stateChangeObservable
            .subscribe((data) => {
                this.dispatchEvent(new CustomEvent('state-changed', {
                    detail: {
                        changes: data.changes,
                        state: data.state
                    }
                }))
            });
    }

    onPostalCodeChanged(elm: HTMLInputElement, ev: Event) {
        console.log(elm.value);
        this.setState({
            postalCode: elm.value
        });
    }

    onAddressChanged(elm: HTMLInputElement, ev: Event) {
        console.log(elm.value);
        this.setState({
            address: elm.value
        });
    }

    onCityChanged(elm: HTMLInputElement, ev: Event) {
        console.log(elm.value);
        this.setState({
            city: elm.value
        });
    }

    connectedCallback() {
        console.log('connected');
    }

    private setState(newState: AddressFormState) {
        this._state.update(newState);
    }
}
