import React, { useState } from "react";
import { useEffect } from "react";
import { api } from "../Api/url";
import Contact from "./Contact";
import { Container, Button, Row, CardGroup, Col } from "react-bootstrap";
import Header from "./Header";
import ContactForm from "./ContactForm";

function ContactList() {
  const [users, setUsers] = useState([]);
  const [showAddform, setShowAddform] = useState(false);
  const [lastId, setLastId] = useState(10);
  const [lastDeletedIndex, setLastDeletedIndex] = useState(-1);
  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((users) => {
        console.log(users);
        setUsers(users);
      });
  }, []);

  //  Adding New Contact
  function handleformSubmit(user) {
    user.id = lastId + 1;
    console.log(user);
    let newArray = [...users];
    newArray.push(user);
    setShowAddform(false);
    setLastId(user.id);
    setUsers(newArray);

    // scroll to the bottom
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "auto",
    });
  }

  //   Updating Contact Details
  function handleUpdateContact(user) {
    user.id = user.userId;
    let newArray = [...users];
    let length = newArray.length;
    let diff = lastId - length;
    if (user.id <= lastDeletedIndex) {
      newArray[user.id - 1] = user;
    } else {
      newArray[user.id - diff - 1] = user;
    }
    console.log(newArray);
    setUsers(newArray);
  }

  //   Handling Delete Contact
  function handleDeleteContact(userId) {
    const filteredUser = users.filter((user) => user.id !== userId);

    setUsers(filteredUser);
    setLastDeletedIndex(userId - 1);
  }

  return (
    <>
      <Container>
        <Row>
          <Header />
        </Row>
        <Row className="d-grid gap-2 mb-3">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setShowAddform((e) => !e)}
          >
            {showAddform ? "Close Edit form" : "Open Edit form"}
          </Button>
        </Row>
        <Row className="mb-3">
          {showAddform ? <ContactForm formSubmit={handleformSubmit} /> : null}
        </Row>

        <Row className="d-flex justify-content-center">
          {users.map((user) => (
            <Col>
              <CardGroup>
                <Contact
                  contact={user}
                  key={user.id}
                  deleteContact={handleDeleteContact}
                  editContact={handleUpdateContact}
                />
              </CardGroup>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default ContactList;
