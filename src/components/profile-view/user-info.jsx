import React from 'react';
import { Card } from 'react-bootstrap';

export const UserInfo = ({ user }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>User Information</Card.Title>
        <Card.Text><strong>Username:</strong> {user.username}</Card.Text>
        <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
        <Card.Text><strong>Date of Birth:</strong> {new Date(user.birthday).toLocaleDateString()}</Card.Text>
      </Card.Body>
    </Card>
  );
};
