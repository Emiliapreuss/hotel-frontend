import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  let today = new Date();
  return (
    <footer className="by-dark py-3 footer mt-lg-5">
      <Container>
        <Row>
          <Col xs={12} md={12} className="text-center">
            <p className="mb-0">&copy; {today.getFullYear()} XYZ hotel</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
