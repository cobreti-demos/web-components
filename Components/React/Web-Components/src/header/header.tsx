import styles from './header.scss?inline';
import {r2wc} from "@cobreti/r2wc";

export function Header () {
    return (
        <>
            <div className="header">
                header test
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
