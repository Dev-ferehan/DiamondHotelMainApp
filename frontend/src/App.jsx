import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./markup/pages/Home";
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";
import Contact from "./markup/pages/Contact";
import Booking from "./markup/pages/Booking";
import Login from "./markup/pages/Login";
import Register from "./markup/pages/Register";
import Reservation from "../src/markup/pages/admin/Reservation.jsx";
import Dashboard from "../src/markup/pages/admin/Dashboard.jsx";
import Room from "./markup/pages/admin/Room.jsx";
import AdminAddRoom from "./markup/pages/admin/AdminAddRoom.jsx";
import AdminMessages from "../src/markup/pages/admin/AdminMessages.jsx";
import AdminHouseKeeping from "../src/markup/pages/admin/AdminHouseKeeping.jsx";
import AdminInventory from "../src/markup/pages/admin/AdminInventory.jsx";
import AddGuest from "./markup/components/AddGuest/AddGuest.jsx";
function App() {
  useEffect(() => {
    if (window.WOW) {
      new window.WOW().init();
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/add-guest" element={<AddGuest />} />
        <Route path='/room' element={<Room/>}/>
        <Route path='/message' element={<AdminMessages/>}/>
        <Route path='/housekeeping' element={<AdminHouseKeeping/>}/>
        <Route path='/inventory' element={<AdminInventory/>}/>
        <Route path='/add-room' element={<AdminAddRoom/>}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
