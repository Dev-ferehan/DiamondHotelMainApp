import React, { useEffect, useState } from "react";
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
import ProtectedRoute from './markup/components/ProtectedRoute/ProtectedRoute.jsx'
import EditRoom from "./markup/components/EditRoom/EditRoom.jsx";
function App() {
  const [isEditOpen,setIsEditOpen]=useState(true)
  useEffect(() => {
    if (window.WOW) {
      new window.WOW().init();
    }
  }, []);
  return (
    <>
      <Routes>


      <Route element={<ProtectedRoute />}>
      <Route path="/reservation" element={<Reservation />} />
        <Route path="/add-guest" element={<AddGuest />} />
        <Route path='/room' element={<Room/>}/>
        <Route path='/messages' element={<AdminMessages/>}/>
        <Route path="/register" element={<Register />} />
        
        <Route path='/housekeeping' element={<AdminHouseKeeping/>}/>
        <Route path='/inventory' element={<AdminInventory/>}/>
        <Route path='/add-room' element={<AdminAddRoom/>}/>
        <Route path='/edit-room' element={<EditRoom 
  isOpen={isEditOpen} 
  onClose={() => setIsEditOpen(false)} 
  initialData={selectedRoomData} 
/>}/>
        </Route>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
    
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
