import template from './spinbox.html?raw';
import styles from './spinbox.scss?inline';

export default class Spinbox extends HTMLElement {

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
