import styles from './header.scss?inline';
import {r2wc} from "@cobreti/r2wc";
import {Inputs as LoginCredentials, Login} from "@components/login/login.tsx";

export type { LoginCredentials }


class HeaderProxy {
    setHeaderMessage(msg: string) {
        console.log(msg);
    }
}


export interface HeaderProps {
    container?: HTMLElement
    proxy?: HeaderProxy
}

export function Header (props: HeaderProps) {

    const onLogin = (creds: LoginCredentials) => {
        if (props.container) {
            const webEvent = new CustomEvent('on-login', {
                bubbles: true,
                composed: true,
                cancelable: true,
                detail: {
                    credentials: creds
                }
            });

            props.container.dispatchEvent(webEvent);
        }
    }

    return (
        <>
            <div className="header">
                <div>
                    <slot name="logo"></slot>
                </div>
                <div></div>
                <div><Login onLogin={onLogin}></Login></div>
            </div>
        </>
    )
}

const proxy = new HeaderProxy();

const WCHeader = r2wc<HeaderProps, HeaderProxy>(Header,{
    shadow: 'open',
    styles: styles,
    webComponentApi: proxy
});

customElements.define('test-header', WCHeader);
