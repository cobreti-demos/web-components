import './main-page.scss'
import Header from "@components/header/header.tsx";
import AddressForm from "@components/address-form/address-form.tsx";

export default function MainPage() {

    return (
        <div className="container">
            <div className="header">
                <Header></Header>
            </div>
            <div className="content">
                <div className="form">
                    <AddressForm></AddressForm>
                </div>
            </div>
            <div className="footer"></div>
        </div>
    )
}
