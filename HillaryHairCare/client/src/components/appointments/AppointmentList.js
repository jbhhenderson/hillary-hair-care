import { useEffect, useState } from "react"
import { getAppointments } from "../../data/appointmentsData"
import { Spinner, Table } from "reactstrap"

export default function AppointmentList () {
    const [appointments, setAppointments] = useState([])

    const getAllAppointments = () => {
        getAppointments().then(setAppointments)
    }

    useEffect(() => {
        getAllAppointments()
    }, [])

    const dollars = (price) => {
        return new Intl.NumberFormat(`en-US`, {
        currency: `USD`,
        style: 'currency',
    }).format(price)};

    // const handleDeactivateButton = (e, patronId) => {
    //     e.preventDefault();
    //     deactivatePatron(patronId)
    //         .then(getAllPatrons())
    // }

    if(appointments.length === 0)
    {
        return <Spinner />
    }

    return (<div className="container">
    <div className="sub-menu bg-light">
      <h4>Appointments</h4>
    </div>
    <Table>
      <thead>
        <tr>
          <th>Appointment</th>
          <th>Customer</th>
          <th>Stylist</th>
          <th>Date</th>
          <th>Time</th>
          <th>Price</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((a) => (
          <tr key={`appointments-${a.id}`}>
            <th scope="row">{a.id}</th>
            <td>{a.customer.name}</td>
            <td>{a.stylist.name}</td>
            <td>{a.time?.split("T")[0]}</td>
            <td>{a.time?.slice(11,16)}</td>
            <td>{dollars(a.totalPrice)}</td>
            <td>Details link goes here</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>)
}