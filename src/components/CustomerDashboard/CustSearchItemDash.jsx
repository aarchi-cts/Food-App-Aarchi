import Header from "../Header/Header";
// import CustomerNavbar from "./CustomerNavbar";

const CustSearchItemDash = ({children}) => {
    return (
        <div>
            {/* <CustomerNavbar /> */}
            <Header/>
            <div className="p-4">{children}</div>
            <footer/>
        </div>
    )
}

export default CustSearchItemDash;