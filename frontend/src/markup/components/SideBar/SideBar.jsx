import React from "react";
import { Link, useLocation } from "react-router-dom"; 
import styles from "./sideBar.module.css";
import "../../../assets/css/admin/styles.css";

function SideBar() {
  const location = useLocation(); 
  const currentPath = location.pathname;

  return (
    <nav className={styles.sidebar}>
      <div className={`${styles.brand} d-flex align-items-center gap-2`}>
        <i className="bi bi-grid-3x3-gap-fill text-success"></i> Diamond Hotel
      </div>

      <ul className={styles.navList}>
        <li className={currentPath === "/dashboard" ? styles.active : ""}>
          <Link to="/dashboard">
            <i className="bi bi-grid"></i> Dashboard
          </Link>
        </li>

        <li className={currentPath.startsWith("/reservation") ? styles.active : ""}>
          <Link to="/reservation">
            <i className="bi bi-calendar-check"></i> Reservation
          </Link>
        </li>

        <li className={currentPath.startsWith("/room") ? styles.active : ""}>
          <Link to="/room">
            <i className="bi bi-door-closed"></i> Rooms
          </Link>
        </li>

        <li className={currentPath.startsWith("/message") ? styles.active : ""}>
          <Link
            to="/message"
            className="d-flex justify-content-between align-items-center w-100"
          >
            <span>
              <i className="bi bi-chat-left-text me-2"></i> Messages
            </span>
            <span className="badge bg-danger rounded-circle px-2 py-1">
              5
            </span>
          </Link>
        </li>

        <li className={currentPath.startsWith("/housekeeping") ? styles.active : ""}>
          <Link to="/housekeeping">
            <i className="bi bi-house-door"></i> Housekeeping
          </Link>
        </li>

        <li className={currentPath.startsWith("/inventory") ? styles.active : ""}>
          <Link to="/inventory">
            <i className="bi bi-box-seam"></i> Inventory
          </Link>
        </li>

        <li className={currentPath.startsWith("/calendar") ? styles.active : ""}>
          <Link to="/calendar">
            <i className="bi bi-calendar3"></i> Calendar
          </Link>
        </li>

        <li className={currentPath.startsWith("/financial") ? styles.active : ""}>
          <Link to="/financial">
            <i className="bi bi-cash-stack"></i> Financials
          </Link>
        </li>

        <li className={currentPath.startsWith("/review") ? styles.active : ""}>
          <Link to="/review">
            <i className="bi bi-star"></i> Reviews
          </Link>
        </li>

        <li className={currentPath.startsWith("/concierge") ? styles.active : ""}>
          <Link to="/concierge">
            <i className="bi bi-person-badge"></i> Concierge
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default SideBar;