import { useEffect, useState } from "react";
import BookingSummary from "./BookingSummary";
import { Form } from "react-bootstrap";
import { DateRangePicker } from "rsuite";
import {
  getAllBookingsByRoomId,
  getRoomById,
  bookRoom,
} from "../utils/ApiFunctions";
import "rsuite/dist/rsuite.min.css"; // RSuite style file
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";

const BookingForm = () => {
  const [booking, setBooking] = useState({
    checkInDate: null,
    checkOutDate: null,
    numOfAdults: 1,
    numOfChildren: 0,
  });
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const [bookedDates, setBookedDates] = useState([]);

  const { roomId } = useParams();
  const navigate = useNavigate();

  const getRoomPriceById = async (roomId) => {
    try {
      const response = await getRoomById(roomId);
      setRoomPrice(response.price);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getRoomPriceById(roomId);
  }, [roomId]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookings = await getAllBookingsByRoomId(roomId);
        const dates = [];
        bookings.forEach(({ checkInDate, checkOutDate }) => {
          let current = new Date(checkInDate);
          const end = new Date(checkOutDate);
          while (current <= end) {
            dates.push(new Date(current));
            current.setDate(current.getDate() + 1);
          }
        });
        setBookedDates(dates);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [roomId]);

  const handleDateChange = (value) => {
    if (value && value.length === 2) {
      const [startDate, endDate] = value;
      setBooking({
        ...booking,
        checkInDate: startDate,
        checkOutDate: endDate,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  const handleBooking = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, booking);
      setIsSubmitted(true);
      navigate("/booking-success", { state: { message: confirmationCode } });
    } catch (error) {
      setErrorMessage(error.message);
      navigate("/booking-success", { state: { error: errorMessage } });
    }
  };

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diff = checkOutDate.diff(checkInDate, "days");
    return diff * roomPrice;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    // Validate form
    if (form.checkValidity() === false || parseInt(booking.numOfAdults) < 1) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setIsValidated(true);
  };

  const isDateDisabled = (date) => {
    return (
      date <= new Date() || // Disable past dates
      bookedDates.some(
        (bookedDate) => date.toDateString() === bookedDate.toDateString()
      )
    );
  };

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-6">
          <div className="card card-body mt-5">
            <h4 className="card card-title">Reserve room</h4>
            <Form validated={isValidated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Select dates</Form.Label>
                <DateRangePicker
                  value={
                    booking.checkInDate && booking.checkOutDate
                      ? [
                          new Date(booking.checkInDate),
                          new Date(booking.checkOutDate),
                        ]
                      : null
                  }
                  onChange={handleDateChange}
                  placeholder="Select Check-In and Check-Out Dates"
                  block
                  disabledDate={isDateDisabled}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Number of Adults</Form.Label>
                <Form.Control
                  type="number"
                  name="numOfAdults"
                  value={booking.numOfAdults}
                  onChange={handleChange}
                  min="1"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter at least one adult.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Number of Children</Form.Label>
                <Form.Control
                  type="number"
                  name="numOfChildren"
                  value={booking.numOfChildren}
                  onChange={handleChange}
                  min="0"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid number of children.
                </Form.Control.Feedback>
              </Form.Group>
              <div className="form-group mt-2 mb-2">
                <button type="submit" className="btn btn-hotel">
                  Continue
                </button>
              </div>
            </Form>
          </div>
        </div>

        <div className="col-6">
          {isSubmitted && (
            <BookingSummary
              booking={booking}
              payment={calculatePayment()}
              isFormValid={isValidated}
              onConfirm={handleBooking}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
