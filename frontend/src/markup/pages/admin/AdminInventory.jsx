import React from 'react'
import SideBar from '../../components/SideBar/SideBar'
import Inventory from '../../components/Inventory/Inventory'
function AdminInventory() {
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
      <Inventory/>
    </div>
  )
}

export default AdminInventory
