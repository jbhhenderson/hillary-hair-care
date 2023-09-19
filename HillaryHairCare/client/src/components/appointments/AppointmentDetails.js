import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getAppointment, updateAppointment } from "../../data/appointmentsData";
import { FormGroup, Input, Label } from "reactstrap";
import { getStylists } from "../../data/stylistsData";
import { getServices } from "../../data/servicesData";

export default function AppointmentDetails () {
    const [appointment, setAppointment] = useState({})
    const [stylists, setStylists] = useState([])
    const [services, setServices] = useState([])
    const [selectedServices, setSelectedServices] = useState([])
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [selectedStylist, setSelectedStylist] = useState(0)
    const { appointmentId } = useParams()

    useEffect(() => {
        getThisAppointment()
        getStylists()
          .then(setStylists)
        getServices()
          .then(setServices)
    }, [])

    useEffect(() => {
      setSelectedServices(appointment.services)
    }, [appointment])

    const getThisAppointment = () => {
      getAppointment(parseInt(appointmentId))
        .then(setAppointment)
    }

    const dollars = (price) => {
      return new Intl.NumberFormat(`en-US`, {
      currency: `USD`,
      style: 'currency',
    }).format(price)};

    const handleCheckboxChange = (e, service) => {
      const { checked } = e.target;
      let clone = structuredClone(selectedServices);

      if (checked) {
        clone.push(structuredClone(service));
      } else {
        clone = clone.filter((serv) => serv.id !== service.id);
      }
      setSelectedServices(clone);
    }

    const handleSubmitButton = (e) => {
      e.preventDefault()

      let newAppointment = structuredClone(appointment);
      newAppointment.services = structuredClone(selectedServices);
      newAppointment.stylistId = selectedStylist ? selectedStylist : appointment.stylistId
      newAppointment.time = `${selectedDate ? selectedDate : appointment.time?.split("T")[0]}T${selectedTime ? selectedTime : appointment.time?.split("T")[1]}:00`

      updateAppointment(newAppointment.id, newAppointment)
      .then(getThisAppointment)
    };

    return (
    <div className="container">
      <h2>{appointment.customer?.name}</h2>
      <p>Current Appointment Date</p>
      <Input type="date" value={appointment.time?.split("T")[0]}></Input>
      <p></p>
      <p>New Appointment Date</p>
      <Input type="date" onChange={(e) => setSelectedDate(e.target.value)}></Input>
      <p></p>
      <p>Current Appointment Time</p>
      <Input type="time" value={appointment.time?.split("T")[1]}></Input>
      <p></p>
      <p>New Appointment Time</p>
      <Input type="time" onChange={(e) => setSelectedTime(e.target.value)}></Input>
      <p></p>
      <p>Current Stylist: {appointment.stylist?.name}</p>
      <FormGroup>
        <Label for="exampleSelect">
          Select Stylist
        </Label>
        <Input
          id="exampleSelect"
          name="select"
          type="select"
          onChange={(e) => setSelectedStylist(parseInt(e.target.value))}
        >
          <option>-Choose A Stylist-</option>
          {stylists.map((s) => {
            return <option value={s.id}>{s.name}</option>
          })}
        </Input>
      </FormGroup>
      {selectedServices?.length ?
        services.map(s => (
          <React.Fragment key={s.id}>
            <label>
              {s.name}
            </label>
            <input
              type="checkbox"
              name="services"
              checked={!!selectedServices.find((service) => service.id === s.id)}
              onChange={(e) => handleCheckboxChange(e, s)}
            ></input>
          </React.Fragment>
        ))
        :<></>
      }
      <p>Total Price: {dollars(appointment.totalPrice)}</p>
      <button onClick={handleSubmitButton}>Submit</button>
    </div>
  );
}