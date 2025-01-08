import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numOfDays = checkOutDate.diff(checkInDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingBooking, setIsProcessingBooking] = useState(false);

  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    setIsProcessingBooking(true);
    setTimeout(() => {
      setIsProcessingBooking(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 3000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [isBookingConfirmed, navigate]);

  return (
    <div className="card card-body mt-5">
      <h4> Reservation Summary</h4>
      <p>
        Fullname: <stong>{booking.guestName}</stong>
      </p>
      <p>
        Email: <stong>{booking.guestEmail}</stong>
      </p>
      <p>
        Check-in date:{" "}
        <stong>{moment(booking.checkInDate).format("Do MMM YYYY")}</stong>
      </p>
      <p>
        Check-out date:{" "}
        <stong>{moment(booking.checkOutDate).format("Do MMM YYYY")}</stong>
      </p>
      <p>
        Number of days: <stong>{numOfDays}</stong>
      </p>
      <div>
        <h5>Number of Guests</h5>
        <strong>
          Adult{booking.numOfAdults > 1 ? "s" : ""}: {booking.numOfAdults}
        </strong>
        <strong> Children: {booking.numOfChildren}</strong>
      </div>
      {
        <>
          <p>
            Total payment: <strong>${payment}</strong>
          </p>
          {isFormValid && !isBookingConfirmed ? (
            <Button variant="success" onClick={handleConfirmBooking}>
              {isProcessingBooking ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  />
                  Proceeding booking...
                </>
              ) : (
                "Confirm booking"
              )}
            </Button>
          ) : isBookingConfirmed ? (
            <div className="d-flex justify-content-center align-items-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading</span>
              </div>
            </div>
          ) : null}
        </>
      }
    </div>
  );
};

export default BookingSummary;
