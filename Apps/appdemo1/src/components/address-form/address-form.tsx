import ComponentEventHandlers, {
    TComponentEventHandlersArray
} from "@components/component-event-handlers/component-event-handlers.tsx";
import {useDispatch} from "react-redux";
import {updateAddress} from "@store/slices/addressSlice.ts";

export default function AddressForm() {

    const dispatch = useDispatch();

    const onStateChanged = (event: Event) => {
        event.stopPropagation();
        event.preventDefault();
        console.log('address form state change : ', event);

        const ce = event as CustomEvent;

        dispatch(updateAddress({
            address: ce.detail.state.address,
            city: ce.detail.state.city,
            postalCode: ce.detail.state.postalCode
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
