import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, InputGroup, InputGroupText } from 'reactstrap';
import { addCustomer } from '../../data/customersData';

export default function CustomerModal({ getAllCustomers }) {
  const [modal, setModal] = useState(false);
  const [custName, setCustName] = useState("")

  const toggle = () => setModal(!modal);

  const handleSubmitCustomer = (e) => {
    e.preventDefault()
    
    const customerToSendToAPI = {
        name: custName
    }

    addCustomer(customerToSendToAPI)
        .then(() => toggle())
        .then(() => getAllCustomers())
  }

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Add Customer
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Input Customer Information:</ModalHeader>
        <ModalBody>
            <InputGroup>
                <InputGroupText>
                Name:
                </InputGroupText>
                <Input placeholder="customerName" onChange={(e) => setCustName(e.target.value)} />
            </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmitCustomer}>
            Submit
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}