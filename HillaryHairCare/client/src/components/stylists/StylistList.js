import { useEffect, useState } from "react"
import { changeStylistEmployment, getStylists } from "../../data/stylistsData"
import { Spinner, Table } from "reactstrap"
import StylistModal from "./StylistModal"

export default function StylistList () {
    const [stylists, setStylists] = useState([])

    const getAllStylists = () => {
        getStylists().then(setStylists)
    }

    useEffect(() => {
        getAllStylists()
    }, [])

    // const handleDeactivateButton = (e, patronId) => {
    //     e.preventDefault();
    //     deactivatePatron(patronId)
    //         .then(getAllPatrons())
    // }

    const handleChangeEmployment = (e, stylistId) => {
        e.preventDefault();
        changeStylistEmployment(stylistId)
            .then(() => getAllStylists())
    };
    if(stylists.length === 0)
    {
        return <Spinner />
    }

    return (<div className="container">
    <div className="sub-menu bg-light">
      <h4>Stylists</h4>
    </div>
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Employment Status</th>
          <th>Hire/Fire Employee</th>
        </tr>
      </thead>
      <tbody>
        {stylists.map((s) => (
          <tr key={`stylists-${s.id}`}>
            <th scope="row">{s.id}</th>
            <td>{s.name}</td>
            <td>{s.isEmployee ? "Employee" : "Not Employee"}</td>
            <td>
                <button onClick={(e) => handleChangeEmployment(e, s.id)}>
                    {s.isEmployee ? "Fire" : "Hire"}
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    <StylistModal getAllStylists = {getAllStylists} />
  </div>)
}