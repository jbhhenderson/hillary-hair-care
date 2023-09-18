import { useEffect, useState } from "react"
import { getStylists } from "../../data/stylistsData"
import { Table } from "reactstrap"

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

    return (<div className="container">
    <div className="sub-menu bg-light">
      <h4>Stylists</h4>
    </div>
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {stylists.map((s) => (
          <tr key={`stylists-${s.id}`}>
            <th scope="row">{s.id}</th>
            <td>{s.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>)
}