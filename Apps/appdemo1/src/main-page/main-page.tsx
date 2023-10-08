import './main-page.scss'
import Header from "../header/header.tsx";

export default function MainPage() {

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
