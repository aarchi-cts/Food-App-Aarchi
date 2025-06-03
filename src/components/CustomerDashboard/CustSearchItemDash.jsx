import CustomerNavbar from "./CustomerNavbar";
import SearchItem from "./SearchItem"

const CustSearchItemDash = ({children}) => {
    return (
        <div>
            <CustomerNavbar />
            <div className="p-4">{children}</div>
            <footer/>
        </div>
    )
}

export default CustSearchItemDash;