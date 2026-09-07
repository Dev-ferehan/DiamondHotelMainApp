import React from 'react'
import SideBar from '../../components/SideBar/SideBar'
import Messages from '../../components/Messages/Messages'
 function AdminMessages() {
  const wrapperStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#333'
  };
  return (
    <div style={wrapperStyle}>
      <SideBar/>
      <Messages/>
    </div>
  )
}
export default AdminMessages
