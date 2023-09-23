import AddressForm from './address-form/address-form';

export class WebComponents {

    static registerComponents() {
        customElements.define('test-address-form', AddressForm);
    }
}


WebComponents.registerComponents();
