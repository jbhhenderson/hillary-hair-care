import React, { useEffect, useState } from "react";
import { addAppointment, updateAppointment } from "../../data/appointmentsData";
import { FormGroup, Input, Label } from "reactstrap";
import { getStylists } from "../../data/stylistsData";
import { getServices } from "../../data/servicesData";
import { getCustomers } from "../../data/customersData";
import { useNavigate } from "react-router-dom";

export default function CreateAppointment () {
    const [stylists, setStylists] = useState([])
    const [services, setServices] = useState([])
    const [customers, setCustomers] = useState([])
    const [selectedServices, setSelectedServices] = useState([])
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [selectedStylist, setSelectedStylist] = useState(0)
    const [selectedCustomer, setSelectedCustomer] = useState(0)

    const navigate = useNavigate();

    useEffect(() => {
        getStylists()
          .then(setStylists)
        getServices()
          .then(setServices)
        getCustomers()
          .then(setCustomers)
    }, [])

    const dollars = () => {
      let totalPrice = 0;

      for (const service of selectedServices) {
        totalPrice += service?.price
      }
        
      return new Intl.NumberFormat(`en-US`, {
      currency: `USD`,
      style: 'currency',
    }).format(totalPrice)};

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

      let newAppointment = {
        services: structuredClone(selectedServices),
        customerId: structuredClone(selectedCustomer),
        stylistId: structuredClone(selectedStylist),
        time: `${selectedDate}T${selectedTime}:00`
      }

      addAppointment(newAppointment)
      .then(() => navigate("/"))
    };

    return (
    <div className="container">
      <FormGroup>
        <Label for="exampleSelect">
          Select Customer
        </Label>
        <Input
          id="exampleSelect"
          name="select"
          type="select"
          onChange={(e) => setSelectedCustomer(parseInt(e.target.value))}
        >
          <option>-Choose A Customer-</option>
          {customers.map((c) => {
            return <option value={c.id}>{c.name}</option>
          })}
        </Input>
      </FormGroup>
      <p>New Appointment Date</p>
      <Input type="date" onChange={(e) => setSelectedDate(e.target.value)}></Input>
      <p></p>
      <p>New Appointment Time</p>
      <Input type="time" onChange={(e) => setSelectedTime(e.target.value)}></Input>
      <p></p>
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
      {services.map(s => (
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
      }
      <p>Total Price: {dollars()}</p>
      <button onClick={handleSubmitButton}>Submit</button>
    </div>
  );
}