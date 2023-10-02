import styles from './header.scss?inline';
import r2wc from "@r2wc/react-to-web-component";

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
    props: {}
});

const oldConnectedCallback = WCHeader.prototype.connectedCallback;

WCHeader.prototype.connectedCallback = function() {
    oldConnectedCallback.apply(this);

    const styleElm = document.createElement('style');
    styleElm.textContent = styles;
    this.shadowRoot.appendChild(styleElm);
}

customElements.define('test-header', WCHeader);
