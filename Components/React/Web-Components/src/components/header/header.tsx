import styles from './header.scss?inline';
import {r2wc} from "@cobreti/r2wc";
import {LoginData} from "@react-web-component/api";
import {Login} from "@components/login/login.tsx";
import {HeaderApi} from "@react-web-component/api";




export interface HeaderProps {
    container?: HTMLElement
    webComponentApi?: HeaderApi
}

export function Header (props: HeaderProps) {

    const onLogin = (creds: LoginData) => {
        if (props.webComponentApi){
            props.webComponentApi.loginSubject.next(creds);
        }

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

const WCHeader = r2wc<HeaderProps, HeaderApi>(Header,{
    shadow: 'open',
    styles: styles,
    webComponentApiFactory: () => { return new HeaderApi() }
});

customElements.define('test-header', WCHeader);
