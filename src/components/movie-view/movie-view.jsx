import React from "react";
import { Button, Container, Image } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col'
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";


export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  console.log('movieId from URL:', movieId)

  const movie = movies.find((m) => m._id === movieId);

  return (
      <Container>
      <Row className="mb-4">
        <Col md={8} lg={6}>
          {movie  ? (
        <Image
          className="full-width-img"
          
          alt={movie.title}
          fluid
        />
      ) : (
        <p>Loading...</p>
      )}
    </Col>
      </Row>
      
    </Container>
  );
};