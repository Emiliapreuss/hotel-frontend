import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const BookingFilter = ({ bookings, setFilteredBookings }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter((booking) =>
        booking.confirmationCode.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBookings(filtered);
    }
  };

  const clearFilter = () => {
    setSearchQuery("");
    setFilteredBookings(bookings);
  };

  return (
    <div className="input-group mb-3">
      <Form.Control
        type="text"
        placeholder="Search by Confirmation Code"
        value={searchQuery}
        onChange={handleSearch}
      />
      <button className="btn btn-hotel" type="button" onClick={clearFilter}>
        Clear filter
      </button>
    </div>
  );
};

export default BookingFilter;
