import { debounceTime, fromEvent } from 'rxjs';
import template from './address-form.html?raw';
import styles from './address-form.scss?inline';

export default class AddressForm extends HTMLElement {

    _shadowRoot: ShadowRoot | null;

    constructor() {
        super();

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
                .pipe(debounceTime(500))
                .subscribe(ev => this.onPostalCodeChanged(postalCodeElm, ev));
        }

        const addressElm = this._shadowRoot.getElementById('address') as HTMLInputElement;
        if (addressElm) {
            fromEvent(addressElm, 'input')
                .pipe(debounceTime(500))
                .subscribe(ev => this.onAddressChanged(addressElm, ev));
        }

        const cityElm = this._shadowRoot.getElementById('city') as HTMLInputElement;
        if (cityElm) {
            fromEvent(cityElm, 'input')
                .pipe(debounceTime(500))
                .subscribe(ev => this.onCityChanged(cityElm, ev));
        }
    }

    onPostalCodeChanged(elm: HTMLInputElement, ev: Event) {
        console.log(elm.value);
    }

    onAddressChanged(elm: HTMLInputElement, ev: Event) {
        console.log(elm.value);
    }

    onCityChanged(elm: HTMLInputElement, ev: Event) {
        console.log(elm.value);
    }
}
