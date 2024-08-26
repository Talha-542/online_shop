import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
// import Products from '../Products/ProductsList';
import onlineshopImg from '../../assets/onlineshop.jpg'; 

const Home = () => {
  return (
    <div className="bg-light py-5">
      <Container>
        <Row className="mb-4">
          <Col md={6} className="d-flex flex-column justify-content-center">
            <h1 className="display-4 font-weight-bold mb-4">Welcome to <br></br> Online Shop!</h1>
            <p className="lead mb-4">
              Discover the best deals on fashion, electronics, and more. Our wide range of products ensures you find what you're looking for at unbeatable prices. Shop now and experience the convenience of online shopping like never before.
            </p>
            <Link to="/products"> 
              <Button variant="primary" size="lg" style={{marginBottom:"1px"}}>Shop Now</Button>
            </Link>
          </Col>
          <Col md={6}>
            <img
              src={onlineshopImg} 
              alt="Shop Now"
              className="img-fluid rounded"
            />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={4}>
            <Card className="text-center p-4">
              <Card.Title>Quality Products</Card.Title>
              <Card.Text>
                We offer a wide selection of high-quality products that meet your needs. Each item is carefully chosen to ensure satisfaction and durability.
              </Card.Text>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center p-4">
              <Card.Title>Fast Shipping</Card.Title>
              <Card.Text>
                Enjoy fast and reliable shipping on all your orders. Our efficient delivery network ensures your purchases reach you quickly and safely.
              </Card.Text>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center p-4">
              <Card.Title>Excellent Support</Card.Title>
              <Card.Text>
                Our customer support team is here to help you with any questions or issues. We are committed to providing exceptional service and support.
              </Card.Text>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={4}>
            <Card className="text-center p-4">
              <Card.Title>Quality Products</Card.Title>
              <Card.Text>
                We offer a wide selection of high-quality products that meet your needs. Each item is carefully chosen to ensure satisfaction and durability.
              </Card.Text>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center p-4">
              <Card.Title>Fast Shipping</Card.Title>
              <Card.Text>
                Enjoy fast and reliable shipping on all your orders. Our efficient delivery network ensures your purchases reach you quickly and safely.
              </Card.Text>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center p-4">
              <Card.Title>Excellent Support</Card.Title>
              <Card.Text>
                Our customer support team is here to help you with any questions or issues. We are committed to providing exceptional service and support.
              </Card.Text>
            </Card>
          </Col>
        </Row>

      </Container>
    </div>
  );
};

export default Home;
