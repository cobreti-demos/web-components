import Spinbox from "./spinbox/spinbox";
import AddressForm from './address-form/address-form';

customElements.define('test-spinbox', Spinbox);
customElements.define('test-address-form', AddressForm);


export interface WebComponentDetails {

}

export const webComponents = new Map<string, WebComponentDetails>();

webComponents.set('test-spinbox', {});
webComponents.set('test-address-form', {});
