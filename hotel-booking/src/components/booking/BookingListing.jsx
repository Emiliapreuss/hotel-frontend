import { useState, useEffect } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import BookingFilter from "./BookingFilter";
import Paginator from "../common/Paginator";
import Booking from "./Booking";
import { getAllBookingsByUser, cancelBooking } from "../utils/ApiFunctions";

const BookingListing = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(6);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const result = await getAllBookingsByUser();
        setBookings(result);
        setFilteredBookings(result);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage("Failed to load bookings");
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = async (confirmationCode) => {
    try {
      await cancelBooking(confirmationCode);
      setSuccessMessage(
        `Booking with confirmation code ${confirmationCode} has been cancelled.`
      );

      const updatedBookings = bookings.filter(
        (b) => b.confirmationCode !== confirmationCode
      );
      setBookings(updatedBookings);
      setFilteredBookings(updatedBookings);
    } catch (error) {
      setErrorMessage("Failed to cancel booking.");
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const displayedBookings = filteredBookings.slice(
    (currentPage - 1) * bookingsPerPage,
    currentPage * bookingsPerPage
  );

  return (
    <Container className="bg-light p-2 mb-5 mt-5 shadow">
      <Row>
        <Col md={6} className="mt-2 mb-3 mb-md-0">
          <BookingFilter
            bookings={bookings}
            setFilteredBookings={setFilteredBookings}
          />
        </Col>
        <Col md={6} className="d-flex align-items-center justify-content-end">
          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <Table className="text-center align-middle" striped bordered hover>
        <thead>
          <tr>
            <th>Room</th>
            <th>Confirmation code</th>
            <th>Guest Name</th>
            <th>Email</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedBookings.map((booking, index) => (
            <Booking
              key={booking.confirmationCode}
              booking={booking}
              index={index + (currentPage - 1) * bookingsPerPage}
              onCancel={handleCancel}
            />
          ))}
        </tbody>
      </Table>
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default BookingListing;
