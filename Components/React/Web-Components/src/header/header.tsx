import styles from './header.scss?inline';
import r2wc from "@r2wc/react-to-web-component";

export { styles };

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

    let styleElm = this.shadowRoot.getElementById('header-style');
    if (!styleElm) {
        styleElm = document.createElement('style');
        styleElm.id = 'header-style';
        styleElm.textContent = styles;
        this.shadowRoot.appendChild(styleElm);
    }
}

console.log('defining custom element');
customElements.define('test-header', WCHeader);
