import CustomerNavbar from "./CustomerNavbar";

const CustCartDash = ({children}) => {
    return (
        <div>
            {/* <CustomerNavbar /> */}
            <div className="p-4">{children}</div>
            <footer/>
        </div>
    )
}

export default CustCartDash;