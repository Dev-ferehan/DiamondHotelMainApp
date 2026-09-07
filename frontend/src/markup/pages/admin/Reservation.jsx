import React from 'react'
import SideBar from '../../components/SideBar/SideBar'
import Reservations from '../../components/Reservation/Reservation'
const wrapperStyle = {
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#f4f6f8',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  color: '#333'
};
function Reservation() {
  return (
     <div style={wrapperStyle}>
     <SideBar/>
 <Reservations/> 

 </div>

  
    
  )
}

export default Reservation
