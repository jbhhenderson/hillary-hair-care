import { Spinner, Table } from "reactstrap"
import { getCustomers, removeCustomer } from "../../data/customersData"
import { useEffect, useState } from "react"
import CustomerModal from "./CustomerModal"

export default function CustomerList () {
    const [customers, setCustomers] = useState([])

    const getAllCustomers = () => {
        getCustomers().then(setCustomers)
    }

    useEffect(() => {
        getAllCustomers()
    }, [])

    const handleRemoveButton = (e, customerId) => {
        e.preventDefault();
        removeCustomer(customerId)
            .then(() => getAllCustomers())
    }

    if(customers.length === 0)
    {
        return <Spinner />
    }

    return (<div className="container">
    <div className="sub-menu bg-light">
      <h4>Customers</h4>
    </div>
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((c) => (
          <tr key={`customers-${c.id}`}>
            <th scope="row">{c.id}</th>
            <td>{c.name}</td>
            <td>
                <button onClick={(e) => handleRemoveButton(e, c.id)}>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    <CustomerModal getAllCustomers = {getAllCustomers} />
  </div>)
}