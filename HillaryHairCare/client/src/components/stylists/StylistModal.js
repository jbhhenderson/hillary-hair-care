import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, InputGroup, InputGroupText } from 'reactstrap';
import { addStylist } from '../../data/stylistsData';

export default function StylistModal({ getAllStylists }) {
  const [modal, setModal] = useState(false);
  const [stylistName, setStylistName] = useState("")

  const toggle = () => setModal(!modal);

  const handleSubmitStylist = (e) => {
    e.preventDefault()
    
    const stylistToSendToAPI = {
        name: stylistName,
        isEmployee: true
    }

    addStylist(stylistToSendToAPI)
        .then(() => toggle())
        .then(() => getAllStylists())
  }

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Add Stylist
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Input Stylist Information:</ModalHeader>
        <ModalBody>
            <InputGroup>
                <InputGroupText>
                Name:
                </InputGroupText>
                <Input placeholder="stylistName" onChange={(e) => setStylistName(e.target.value)} />
            </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmitStylist}>
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