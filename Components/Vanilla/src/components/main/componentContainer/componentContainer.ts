import template from './componentContainer.html?raw';
import styles from './componentContainer.scss?inline';


export class ComponentContainer {
    constructor(parent: HTMLElement, name: string) {

        const divElement = document.createElement('div');
        // divElement.style.display = 'block;'
        const shadowRoot = divElement.attachShadow({mode: 'open'});

        const templateNode = document.createElement('template');
        templateNode.innerHTML = template;
    
        const styleNode = document.createElement('style');
        styleNode.textContent = styles;
    
        shadowRoot.appendChild(styleNode);

        const ctrl = document.createElement(name);
        // templateNode.appendChild(ctrl);
        const node = templateNode.content.cloneNode(true);
        node.childNodes[0].appendChild(ctrl);
        shadowRoot.appendChild(node);


        parent.appendChild(divElement);
    }
}
