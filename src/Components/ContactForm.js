import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

function ContactForm({ formSubmit }) {
  const initialState = { city: "" };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(initialState);
  const [showAlert, setShowAlert] = useState(false);

  function handleSubmitBtn(e) {
    e.preventDefault();
    console.log("Contact form in");
    if (name && email && phone && address.city) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((user) => {
          console.log(user);
          formSubmit(user);
        });
    }else{
        setShowAlert(true);
    }
  }

  return (
    <>
      <Container>
        <Form className="border border-secondary p-4 border-5 rounded">
          <Row>
            {showAlert && (
              <Alert variant="danger">Please fill in all the details...</Alert>
            )}
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row className="mb-2">
            <Form.Group as={Col} controlId="formGridPhonenumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Phone number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row className="mb-4">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                onChange={(e) => setAddress({city:e.target.value})}
              />
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit" onClick={handleSubmitBtn}>
            Add Contact
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default ContactForm;
