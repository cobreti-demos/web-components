import {Observable, Subject} from "rxjs";
import {AddressFormState} from "../datatypes/address-form-state.ts";
import {StateChanges} from "../datatypes/state-changes.ts";

export class AddressFormApi {
    addressFormstateSubject = new Subject<StateChanges<AddressFormState>>();

    get addressFormStateChanged(): Observable<StateChanges<AddressFormState>> {
        return this.addressFormstateSubject;
    }
}

export interface AddressFormElement extends HTMLElement {
    webComponentApi: AddressFormApi;
}
