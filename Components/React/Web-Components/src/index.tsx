import r2wc from "@r2wc/react-to-web-component"
import { Header } from './header/header.tsx';

const WCHeader = r2wc(Header, {
    shadow: 'open',
    props: {}
});

console.log('defining custom element');
customElements.define('test-header', WCHeader);
