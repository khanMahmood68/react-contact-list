import React, { useState } from "react";
import { Button, Card, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import UpdateContact from "./UpdateContact";

function Contact({ contact, deleteContact, editContact }) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [hideCard, setHideCard] = useState(false);

  //hide update from
  const hideUpdateContactForm = () => {
    setShowUpdateForm(false);
    setHideCard(false);
  };

  const handleContactEdit = () => {
    setShowUpdateForm(true);
    setHideCard(true);
  };

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 5,
      }}
    />
  );

  const handleContactDelete = (userId) => {
    let url = `https://jsonplaceholder.typicode.com/users/${userId}`;
    fetch(url, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        deleteContact(userId);
      }
    });
  };
  return (
    <>
      <Row>
        {showUpdateForm ? (
          <UpdateContact
            user={contact}
            hideForm={hideUpdateContactForm}
            editContact={editContact}
          />
        ) : null}
      </Row>
      {!hideCard && (
        <Row>
          <Card style={{ width: "22rem" }} className="mt-3" border="secondary">
            <Card.Body>
              <Card.Title>Contact Card</Card.Title>
            </Card.Body>
            <ColoredLine color="blue" />
            <Card.Body>
              <Button variant="success" onClick={handleContactEdit}>
                Edit
              </Button>
              {" "}
              <Button
                variant="danger"
                onClick={() => handleContactDelete(contact.id)}
              >
                Delete
              </Button>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>User Id : {contact.id}</ListGroupItem>
              <ListGroupItem>User Name : {contact.name}</ListGroupItem>
              <ListGroupItem>User Email : {contact.email}</ListGroupItem>
              <ListGroupItem>Phone Number : {contact.phone}</ListGroupItem>
              <ListGroupItem>
                User Address : {contact.address.city}
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Row>
      )}
    </>
  );
}

export default Contact;
