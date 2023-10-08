import './header.scss';
import {useEffect, useRef} from "react";

export default function Header() {
    const testHeaderRef = useRef<HTMLElement | null>(null);

    const onLoginEvHandler = (ev: Event) => {
        ev.preventDefault();
        ev.stopPropagation();
        console.log('on-login event', ev);
    }

    useEffect(() => {
        const htmlElm = testHeaderRef.current;
        console.log('useEffect - register event handler', testHeaderRef);
        htmlElm?.addEventListener('on-login', onLoginEvHandler);

        return () => {
            console.log('useEffect cleanup event handler');
            htmlElm?.removeEventListener('on-login', onLoginEvHandler);
        }
    }, [testHeaderRef]);

    return (
        <>
            <test-header ref={testHeaderRef}></test-header>
        </>
    )
}
