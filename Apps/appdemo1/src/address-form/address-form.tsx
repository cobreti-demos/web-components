import ComponentEventHandlers, {
    TComponentEventHandlersArray
} from "../component-event-handlers/component-event-handlers.tsx";

export default function AddressForm() {

    const onStateChanged = (event: Event) => {
        event.stopPropagation();
        event.preventDefault();
        console.log('address form state change : ', event);
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
