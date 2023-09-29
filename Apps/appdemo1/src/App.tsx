import './App.scss'

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "test-address-form": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
        }
    }
}

function App() {

    return (
        <div className="container">
            <div className="header"></div>
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
