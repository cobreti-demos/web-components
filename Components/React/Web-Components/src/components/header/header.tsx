import styles from './header.scss?inline';
import {r2wc} from "@cobreti/r2wc";
import {Inputs as LoginCredentials, Login} from "@components/login/login.tsx";

export type { LoginCredentials }

export interface HeaderProps {
    container: HTMLElement
    onLogin?: (credentials: LoginCredentials) => void
}

export function Header (props: HeaderProps) {

    const onLogin = (creds: LoginCredentials) => {
        if (props.container) {
            const webEvent = new CustomEvent('on-login', {
                bubbles: true,
                composed: true,
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

const WCHeader = r2wc<HeaderProps>(Header, {
    shadow: 'open',
    styles: styles
});

customElements.define('test-header', WCHeader);
