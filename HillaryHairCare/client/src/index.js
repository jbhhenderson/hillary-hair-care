import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerList from './components/customers/CustomerList';
import StylistList from './components/stylists/StylistList';
import AppointmentList from './components/appointments/AppointmentList';
import AppointmentDetails from './components/appointments/AppointmentDetails';
import CreateAppointment from './components/appointments/CreateAppointment';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<AppointmentList />} />
        <Route path="customers">
          <Route index element={<CustomerList />} />
          {/* <Route path=":id" element={<MaterialDetails />} />
          <Route path="create" element={<CreateMaterial />} /> */}
        </Route>
        <Route path='stylists'>
          <Route index element={<StylistList />} />
        </Route>
        <Route path='appointments'>
          <Route index element={<AppointmentList />} />
          <Route path=':appointmentId' element={<AppointmentDetails />} />
          <Route path='add' element={<CreateAppointment />}/>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
