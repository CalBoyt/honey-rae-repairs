import "./NavBar.css"
import { EmployeeNav } from "./EmployeeNav"
import { CustomerNav } from "./CustomerNav"

export const NavBar = () => {
    
    //getting item (users) out of storage
    const localHoneyUser = localStorage.getItem("honey_user")
    //parsing it back into an object 
    const honeyUserObject = JSON.parse(localHoneyUser)

    if(honeyUserObject.staff) {
        //Return employee views
        return <EmployeeNav />

    }
    else {
        //Return customer views
        return <CustomerNav />
    }
}
