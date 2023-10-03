import styles from './header.scss?inline';
import {r2wc} from "@cobreti/r2wc";
import {Login} from "@components/login/login.tsx";

export function Header () {
    return (
        <>
            <div className="header">
                <div>header test</div>
                <div></div>
                <div><Login></Login></div>
            </div>
        </>
    )
}

const WCHeader = r2wc(Header, {
    shadow: 'open',
    props: {},
    styles: styles
});

customElements.define('test-header', WCHeader);
