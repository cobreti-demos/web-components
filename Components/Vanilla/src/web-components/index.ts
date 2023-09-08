import Spinbox from "./spinbox/spinbox";

customElements.define('test-spinbox', Spinbox);


export interface WebComponentDetails {

}

export const webComponents = new Map<string, WebComponentDetails>();

webComponents.set('test-spinbox', {});
