import "./App.css";
import Home from "./components/home/Home";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/Navbar";
import AddRoom from "./components/room/AddRoom";
import EditRoom from "./components/room/EditRoom";
import ExistingRooms from "./components/room/ExistingRooms";
import Checkout from "./components/booking/Checkout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomListing from "./components/room/RoomListing";
import Admin from "./components/admin/Admin";
import BookingSuccess from "./components/booking/BookingSuccess";

function App() {
  return (
    <>
      <main>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/existing-rooms" element={<ExistingRooms />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/book-room/:roomId" element={<Checkout />} />
            <Route path="/browse-rooms" element={<RoomListing />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
          </Routes>
          <Footer />
        </Router>
      </main>
    </>
  );
}

export default App;
