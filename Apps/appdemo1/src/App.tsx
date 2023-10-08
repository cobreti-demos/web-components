import './App.scss'
import {WebComponentLoader} from "./web-component-loader.ts";
import {useEffect} from "react";
import Header from "./header/header.tsx";

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

    useEffect(() => {
        webComponentLoader.loadWebComponents();
    }, [webComponentLoader]);

    return (
        <div className="container">
            <div className="header">
                <Header></Header>
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
