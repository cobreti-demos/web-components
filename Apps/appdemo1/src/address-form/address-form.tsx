import ComponentEventHandlers, {
    TComponentEventHandlersArray
} from "../component-event-handlers/component-event-handlers.tsx";
import {useDispatch} from "react-redux";
import {updateAddress} from "@store/addressSlice.ts";

export default function AddressForm() {

    const dispatch = useDispatch();

    const onStateChanged = (event: Event) => {
        event.stopPropagation();
        event.preventDefault();
        console.log('address form state change : ', event);

        const cs = event as CustomEvent;

        dispatch(updateAddress({
            address: cs.detail.state.address,
            city: cs.detail.state.city,
            postalCode: cs.detail.state.postalCode
        }));
    }

    const componentEventHandlersTable : TComponentEventHandlersArray = [
        {
            event: 'state-changed',
            handler: onStateChanged
        }
    ]

    return (
        <ComponentEventHandlers handlers={componentEventHandlersTable}>
            <test-address-form></test-address-form>
        </ComponentEventHandlers>
    )
}
