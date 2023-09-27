import AddressFormComponent from './address-form/address-form.component.ts';

export class WebComponents {

    static registerComponents() {
        customElements.define('test-address-form', AddressFormComponent);
    }
}


WebComponents.registerComponents();
