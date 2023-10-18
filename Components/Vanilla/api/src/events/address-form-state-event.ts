import {AddressFormState} from "../datatypes/address-form-state.ts";
import {CustomEventsEnum} from "./custom-events-enum.ts";

export interface AddressFormStateEventDetails {
    oldState?: AddressFormState,
    changes?: AddressFormState,
    state?: AddressFormState
}


declare global {
    interface ElementEventMap {
        'state-changed': CustomEvent<AddressFormStateEventDetails>
    }
}

export function createAddressFormStateEvent(data: AddressFormStateEventDetails) : CustomEvent<AddressFormStateEventDetails> {
    return new CustomEvent<AddressFormStateEventDetails>(CustomEventsEnum.addressStateChangedEvent, {
        bubbles: true,
        composed: true,
        detail: {
            oldState: data.oldState,
            changes: data.changes,
            state: data.state
        }
    });
}

export function listenOnAddressFormStateEvent(elm: Element, handler: (ev: CustomEvent<AddressFormStateEventDetails>) => void) {
    elm.addEventListener(CustomEventsEnum.addressStateChangedEvent, handler);

    return () => {
        elm.removeEventListener(CustomEventsEnum.addressStateChangedEvent, handler);
    }
}
