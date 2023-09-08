import template from './main.html?raw';
import styles from './main.scss?inline';

import { ComponentContainer } from './componentContainer/componentContainer';


let appElm = document.getElementById('app');
if (appElm) {
    
    const templateNode = document.createElement('template');
    templateNode.innerHTML = template;

    const styleNode = document.createElement('style');
    styleNode.textContent = styles;

    appElm.appendChild(styleNode);
    appElm.appendChild(templateNode.content.cloneNode(true));

    new ComponentContainer(appElm, 'test-spinbox');
    new ComponentContainer(appElm, 'test-spinbox');
    new ComponentContainer(appElm, 'test-spinbox');
 }
