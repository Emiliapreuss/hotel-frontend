import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { getRoomById } from "../utils/ApiFunctions";

const Booking = ({ booking, index, onCancel }) => {
  const [roomDetails, setRoomDetails] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const room = await getRoomById(booking.roomId);
        setRoomDetails(room);
      } catch (error) {
        console.error("Failed to fetch room details:", error);
      }
    };

    fetchRoomDetails();
  }, [booking.roomId]);

  return (
    <tr>
      <td>
        {roomDetails ? (
          <Card.Body className="d-flex flex-wrap align-items-center">
            <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
              <Card.Img
                variant="top"
                src={roomDetails.photo}
                alt="Room Photo"
                style={{ width: "100%", maxWidth: "150px", height: "auto" }}
              />
            </div>
            <div className="flex-grow-1 ml-3">
              <Card.Title className="hotel-color">
                {roomDetails.type}
              </Card.Title>
              <Card.Title className="room-price">
                {roomDetails.price}$ / night
              </Card.Title>
            </div>
          </Card.Body>
        ) : (
          <p>Loading room details...</p>
        )}
      </td>
      <td>{booking.confirmationCode}</td>
      <td>{booking.guestFullName}</td>
      <td>{booking.guestEmail}</td>
      <td>{booking.checkInDate}</td>
      <td>{booking.checkOutDate}</td>
      <td>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onCancel(booking.confirmationCode)}
        >
          Cancel
        </Button>
      </td>
    </tr>
  );
};

export default Booking;
