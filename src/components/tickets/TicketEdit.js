import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const TicketEdit = () => {

    // TODO: This state object should not be blank
    const [ticket, assignTicket] = useState({
        description: "",
        emergency: false
    })

    // TODO: What is the variable in which you stored the route parameter?
    const { ticketId} = useParams()
    const navigate = useNavigate()

    // TODO: Get the ticket state from the API.
    useEffect(() => {
        fetch(`http://localhost:8088/serviceTickets/${ticketId}`) 
          .then(response => response.json())
          .then((data) => {
            assignTicket(data)
        })


    }, [ticketId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Write the fetch for the PUT request to replace the object being edited
        return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/tickets")
            }) 
    }
    
    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">Edit Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        style={{
                            height: "10rem"
                        }}
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (evt) => {
                                // TODO: Update state with a modified copy
                                const copy = { ...ticket}
                                copy.description = evt.target.value
                                assignTicket(copy)
                            }
                        }>{ticket.description}</input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (evt) => {
                                // TODO: Update state with a modified copy
                                const copy = { ...ticket}
                                copy.emergency = evt.target.checked
                                assignTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}
 