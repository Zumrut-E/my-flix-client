import React from "react";
import { Button, Container, Image } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col'
import { useParams } from "react-router-dom";


export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  console.log('movieId from URL:', movieId)

  const movie = movies.find((m) =>( m.id) === (movieId));
  console.log('movie:', movies)
  return (
      <Container>
      <Row className="mb-4 justify-content-center">
        <Col md={8} lg={4}>
      
          <Image className="full-width-img" src={movie.image_url} alt={movie.title} fluid />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={3} className="font-weight-bold text-right">Title:</Col>
        <Col md={9}>{movie.title}</Col>
      </Row>
      <Row className="mb-2">
        <Col md={3} className="font-weight-bold text-right">Description:</Col>
        <Col md={9}>{movie.description}</Col>
      </Row>
      <Row className="mb-2">
        <Col md={3} className="font-weight-bold text-right">Genre:</Col>
        <Col md={9}>{movie.genre.name}</Col>
      </Row>
      <Row className="mb-2">
        <Col md={3} className="font-weight-bold text-right"></Col>
        <Col md={9}><em>{movie.genre.description}</em></Col>
      </Row>
      <Row className="mb-2">
        <Col md={3} className="font-weight-bold text-right">Director:</Col>
        <Col md={9}>{movie.director.name}</Col>
      </Row>
      <Row className="mb-2">
        <Col md={3} className="font-weight-bold text-right"></Col>
        <Col md={9}><em>{movie.director.bio}</em></Col>
      </Row>
      <Row className="mb-2">
        <Col md={3} className="font-weight-bold text-right">Feature:</Col>
        <Col md={9}>{movie.isFeatured ? 'Yes' : 'No'}</Col>
      </Row>
      <Row className="mt-4">
        <Col md={{ span: 6, offset: 3 }} className="text-center">
     
    </Col>
      </Row>
      
    </Container>
  );
};