import './App.scss'
import {WebComponentLoader} from "./web-component-loader.ts";
import {useEffect, useRef} from "react";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "test-address-form": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
            "test-header": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
        }
    }
}

const webComponentLoader = new WebComponentLoader('web-components.json');

function App() {

    const testHeaderRef = useRef<HTMLElement | null>(null);

    const onLoginEvHandler = (ev: Event) => {
        ev.preventDefault();
        ev.stopPropagation();
        console.log('on-login event', ev);
    }

    useEffect(() => {
        webComponentLoader.loadWebComponents();
    }, [webComponentLoader]);

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
        <div className="container">
            <div className="header">
                <test-header ref={testHeaderRef}></test-header>
            </div>
            <div className="content">
                <div className="form">
                    <test-address-form></test-address-form>
                </div>
            </div>
            <div className="footer"></div>
        </div>
  )
}

export default App
