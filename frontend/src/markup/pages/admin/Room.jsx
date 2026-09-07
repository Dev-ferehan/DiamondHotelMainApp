import React from "react";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import AdminRoom from "../../components/AdminRoom/AdminRoom";
function Room() {
    const wrapperStyle = {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f4f6f8',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#333'
      };
  return (
    <div  style={wrapperStyle} >
        <SideBar/>
  <AdminRoom/>
    </div>
  );
}

export default Room;
