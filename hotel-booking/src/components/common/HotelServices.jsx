import { Card, Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import {
  FaClock,
  FaCocktail,
  FaParking,
  FaSnowflake,
  FaTshirt,
  FaUtensils,
  FaWifi,
} from "react-icons/fa";

const HotelServices = () => {
  return (
    <>
      <Container className="mb-2">
        <Header title={"Our services"}></Header>
        <Row>
          <h4 className="text-center">
            Services at <span className="hotel-color">XYZ hotel</span>
            <span className="gap-2">
              <FaClock /> - 24-hour front desk
            </span>
          </h4>
        </Row>
        <hr />
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaWifi>Free WiFi</FaWifi>
                </Card.Title>
                <Card.Text>High-speed internet access</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaUtensils>Breakfast</FaUtensils>
                </Card.Title>
                <Card.Text>Breakfast from 6.00 - 10.00</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaTshirt>Laundry</FaTshirt>
                </Card.Title>
                <Card.Text>Keep your clothes clean</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaCocktail>Mini-bar</FaCocktail>
                </Card.Title>
                <Card.Text>Drinks and snack in our mini-bar</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaSnowflake>Air conditioning</FaSnowflake>
                </Card.Title>
                <Card.Text>Stay cool and comfortable</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaParking>Parking</FaParking>
                </Card.Title>
                <Card.Text>Free parking lot</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HotelServices;
