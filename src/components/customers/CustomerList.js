import { useEffect, useState } from "react"
import { Customer } from "./Customer"


export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&user.isStaff=false`)
            .then(response => response.json())
            .then((customerArray) => {
                setCustomers(customerArray)

            })
        },
        []
    )
    return <article className="customers">
        {
            customers.map(customer => <Customer key={`customer--${customer.id}`}
                id={customer.id} 
                fullName={customer?.user?.fullName}
                phoneNumber={customer.phoneNumber}
                address={customer.address} 
                email={customer?.user?.email}/>)
        }
    </article>
}