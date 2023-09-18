import { Spinner, Table } from "reactstrap"
import { getCustomers } from "../../data/customersData"
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

    // const handleDeactivateButton = (e, patronId) => {
    //     e.preventDefault();
    //     deactivatePatron(patronId)
    //         .then(getAllPatrons())
    // }

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
          </tr>
        ))}
      </tbody>
    </Table>
    <CustomerModal getAllCustomers = {getAllCustomers} />
  </div>)
}