import './header.scss';
import ComponentEventHandlers, {
    TComponentEventHandlersArray
} from "../component-event-handlers/component-event-handlers.tsx";

export default function Header() {
    const onLoginEvHandler = (ev: Event) => {
        ev.preventDefault();
        ev.stopPropagation();
        console.log('on-login event', ev);
    }

    const EventHandlersMapping : TComponentEventHandlersArray = [
        {
            event: 'on-login',
            handler: onLoginEvHandler
        }
    ];

    return (
        <>
            <ComponentEventHandlers handlers={EventHandlersMapping}>
                <test-header></test-header>
            </ComponentEventHandlers>
        </>
    )
}
