import {AddressFormState} from "@datatypes/address-form-state.ts";

export interface AddressFormStateEventDetails {
    oldState?: AddressFormState,
    changes?: AddressFormState,
    state?: AddressFormState
}

export const addressStateChangedEventType = 'state-changed';

export const AddressStateChangedEvent = CustomEvent<AddressFormStateEventDetails>;
