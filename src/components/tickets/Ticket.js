import { Link } from "react-router-dom"

export const Ticket = ({ ticketObject, currentUser, employees, getAllTickets }) => {

    //Find the assigned employee for the current ticket
    let assignedEmployee = null

    if(ticketObject.employeeTickets.length) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)


    }

    //Find the employee profile object for the current user
    const userEmployee = employees.find(employee => employee.userId === currentUser.id)

    //Function that determines if the current user close the ticket (Only the employee assigned to the ticket can see button to close it), and then invokes closeTicket
    const canClose = () => {
        if (userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "") {
            return <button onClick={closeTicket} className="ticket_finish">Finish</button>
        }
        else {
            return ""
        }
    }

    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
                    method: "DELETE"
                })                  
                  .then(() => {
                    getAllTickets()

                  })

            }} className="ticket_delete">Delete</button>
        }
        else {
            return ""
        }
    }

    //Function that updates the ticket with a new date completed by updating API
    const closeTicket = () => {
        const copy = {
            userId: ticketObject.userId,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date()
        }

        return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
           .then(response => response.json())
           .then(getAllTickets)
    }


    const buttonOrNoButton = () => {
        if (currentUser.staff) {
            return <button
            onClick={() => {
              fetch(`http://localhost:8088/employeeTickets`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                      employeeId: userEmployee.id,
                      serviceTicketId: ticketObject.id
                  })
              })
                .then(response => response.json())
                .then(() => {
                  
                  getAllTickets()
                })
            }}
            >Claim</button>
        }
        else {
            return ""
        }
    }

    //In header: conditional logic for what should be displayed in the header
    //In footer: conditional logic for either text displayed if ticket is currently assigned to an employee, or else a button (above), that when clicked on, uses fetch to modify the API state
    //Once the state is modified, go get it from the API again using getAllTickets(), which rerenders the entire ticket list and each ticket component from the filteredTickets.map in TicketList.js
    return <section className="ticket" key={`ticket--${ticketObject.id}`}>
        <header>
            
            {
                currentUser.staff
                ? `Ticket ${ticketObject.id}`
                :             <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
            }

        </header>
        <section>{ticketObject.description}</section>
        <section>Emergency: {ticketObject.emergency ? "🧨🧨🧨" : "No"}</section>
        <footer>
        
        
            {
                ticketObject.employeeTickets.length
                  ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName: ""}`
                  : buttonOrNoButton()
            }
            {
                canClose()
            }
            {
                deleteButton()
            }
        </footer>

    </section>
}