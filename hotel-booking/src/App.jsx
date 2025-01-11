import "./App.css";
import Home from "./components/home/Home";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/Navbar";
import AddRoom from "./components/room/AddRoom";
import EditRoom from "./components/room/EditRoom";
import ExistingRooms from "./components/room/ExistingRooms";
import BookingForm from "./components/booking/BookingForm";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RoomListing from "./components/room/RoomListing";
import Admin from "./components/admin/Admin";
import BookingSuccess from "./components/booking/BookingSuccess";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Logout from "./components/authentication/Logout";
import HomePageRedirect from "./routes/HomePageRedirect";
import BookingListing from "./components/booking/BookingListing";
function App() {
  return (
    <>
      <main>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePageRedirect />} />
            <Route path="/home" element={<Home />} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/existing-rooms" element={<ExistingRooms />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/book-room/:roomId" element={<BookingForm />} />
            <Route path="/bookings" element={<BookingListing />} />
            <Route path="/browse-rooms" element={<RoomListing />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />{" "}
          </Routes>
          <Footer />
        </Router>
      </main>
    </>
  );
}

export default App;
