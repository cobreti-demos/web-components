import './App.scss'
import {WebComponentLoader} from "./web-component-loader.ts";
import {useEffect} from "react";
import MainPage from "@components/main-page/main-page.tsx";

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
        <MainPage></MainPage>
    )
}

export default App
