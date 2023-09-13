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
    }
}
