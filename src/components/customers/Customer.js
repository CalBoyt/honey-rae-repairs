import { Link } from "react-router-dom"


export const Customer = ({ id, fullName, phoneNumber, address }) => {
    return <section className="customer" key={`customer--${id}`}>
                <div>
                    <Link to={`/customers/${id}`}>Customer Name: {fullName}</Link>
                </div>
                <div>Customer Phone Number: {phoneNumber}</div>
                <div>Customer Address: {address}</div>
            </section>
}