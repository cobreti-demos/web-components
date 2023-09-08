import './style.css'
import {webComponents, WebComponentDetails} from './web-components';
import './components';

declare global {
  interface Window {
    webComponents: Map<string, WebComponentDetails>
  }
}


window.webComponents = webComponents;

