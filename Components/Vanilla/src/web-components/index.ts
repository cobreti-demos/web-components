import AddressForm from './address-form/address-form';

customElements.define('test-address-form', AddressForm);


export interface WebComponentDetails {

}

export const webComponents = new Map<string, WebComponentDetails>();

webComponents.set('test-address-form', {});
