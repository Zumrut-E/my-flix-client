import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Row, Col, Fade } from "react-bootstrap"; // Importing Fade for animation

export const SignUpView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate(); // Hook for redirection

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    fetch("https://myflix2024-e1c9b1faca45.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        navigate("/login"); // Redirect to the login page on successful signup
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <>
      <Fade in={true}>
        <h1 className="text-center mt-4">Welcome to myFLIX</h1>
      </Fade>

      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="5"
            placeholder="Enter a username"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" size="sm" className="mt-3">
          Sign Up
        </Button>
      </Form>

      <Row className="mt-3">
        <Col className="text-center">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-primary">
              Log In
            </a>
          </p>
        </Col>
      </Row>
    </>
  );
};


