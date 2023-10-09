import './header.scss';
import ComponentEventHandlers, {
    TComponentEventHandlersArray
} from "@components/component-event-handlers/component-event-handlers.tsx";
import {useDispatch} from "react-redux";
import {updateLogin} from "@store/slices/loginSlice.ts";

export default function Header() {

    const dispatch = useDispatch();

    const onLoginEvHandler = (ev: Event) => {
        ev.preventDefault();
        ev.stopPropagation();
        console.log('on-login event', ev);

        const ce = ev as CustomEvent;

        dispatch(updateLogin({
            username: ce.detail.credentials.username,
            password: ce.detail.credentials.password
        }));
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
