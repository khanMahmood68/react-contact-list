import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

function UpdateContact({ user, hideForm,editContact  }) {
  const initialState = { city: "" };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(initialState);
  const [showAlert, setShowAlert] = useState(false);

  function handleSubmitBtn(e) {
    e.preventDefault();
    const userId = user.id;
    let url = `https://jsonplaceholder.typicode.com/users/1`;
    if (name && email && phone && address.city) {
      fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          userId,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
      })
      .then((res)=>res.json())
      .then((user)=>{
        editContact(user);
        hideForm();
      })
    }else{
        setShowAlert(true)
    }
  }

  return (
    <Container className="m-3">
      <Form
        className="border border-secondary p-4 border-3 rounded"
        style={{ width: "22rem" }}
      >
        <Row>
          {showAlert && (
            <Alert variant="info">
              Please fill in new or existing records...
            </Alert>
          )}
        </Row>

        <Button variant="danger" className="my-3" onClick={hideForm}>
          Close Form
        </Button>

        <Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={user.name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="emai"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-2">
          <Form.Group as={Col} controlId="formGridPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              placeholder={user.phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-4">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder={user.address.city}
              onChange={(e) => setAddress({ city: e.target.value })}
            />
          </Form.Group>
        </Row>

        <Button type="submit" variant="primary" onClick={handleSubmitBtn}>
          Update Contact
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateContact;
