import React, { useEffect, useState } from "react";
import styles from "./reservation.module.css";
import { Link } from "react-router-dom";
import { getGuest } from "../../../services/Reservation.service.js";
// import "../../../assets/css/admin/styles.css";
function Reservation() {
  const [selectedGuestId, setSelectedGuestId] = useState(null);
  const [guests, setGuests] = useState([]);
  const [currentGuest, setCurrentGuest] = useState({});
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchGuest = async () => {
      try {
        const response = await getGuest();

        const data = Array.isArray(response) ? response : [response];

        setGuests(data);
        if (data.length > 0) {
          setCurrentGuest(data[0]);
        }
      } catch (err) {
        console.error("Error fetching guest:", err);
        setError("Failed to fetch guest details.");
      }
    };
    fetchGuest();
  }, []);

  return (
    <>
      <div className={styles.mainContent}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <small className="text-muted">
              Reservation / <span className="text-dark">Guest Profile</span>
            </small>
            <h4 className="fw-bold m-0">
              <i className="bi bi-arrow-left cursor-pointer me-2"></i> Guest
              Profile
            </h4>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
              <img
                src="https://i.pravatar.cc/100?img=12"
                className="rounded-circle"
                width="36"
                height="36"
                alt="Admin"
              />
              <div>
                <div className="fw-bold" style={{ fontSize: "0.85rem" }}>
                  Jaylon Dorwart
                </div>
                <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                  Admin
                </div>
              </div>
            </div>
            <i className="bi bi-gear fs-5 text-muted"></i>
            <i className="bi bi-bell fs-5 text-muted"></i>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-4">
            <div className={styles.cardCustom}>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h6 className="fw-bold">Profile</h6>
                <i className="bi bi-three-dots text-muted"></i>
              </div>

              <div className="d-flex align-items-center gap-3 mb-3">
                <img
                  src="https://i.pravatar.cc/100?img=60"
                  className="rounded-circle"
                  width="54"
                  height="54"
                  alt="Guest"
                />
                <div>
                  <h5 className="fw-bold mb-0">{currentGuest?.full_name}</h5>
                  <small className="text-muted">
                    {currentGuest?.phone_number}
                  </small>
                </div>
              </div>

              <div className="mb-3">
                <div
                  className="d-flex align-items-center gap-2 text-muted mb-1"
                  style={{ fontSize: "0.85rem" }}
                >
                  <i className="bi bi-telephone"></i> +1 (555) 789-1234
                </div>
                <div
                  className="d-flex align-items-center gap-2 text-muted"
                  style={{ fontSize: "0.85rem" }}
                >
                  <i className="bi bi-envelope"></i>
                  {currentGuest?.email}
                </div>
              </div>

              <hr className="my-3" style={{ color: "#eee" }} />

              <h6 className="fw-bold mb-2">Personal Information</h6>
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <div className={styles.textLabel}>Date of Birth</div>
                  <div className={styles.textVal}>June 15, 1985</div>
                </div>
                <div className="col-6">
                  <div className={styles.textLabel}>Gender</div>
                  <div className={styles.textVal}>{currentGuest?.gender}</div>
                </div>
                <div className="col-6">
                  <div className={styles.textLabel}>Nationality</div>
                  <div className={styles.textVal}>
                    {currentGuest?.nationality}
                  </div>
                </div>
                <div className="col-6">
                  <div className={styles.textLabel}>
                    {currentGuest?.id_type}
                  </div>
                  <div className={styles.textVal}>
                    {currentGuest?.id_number}
                  </div>
                </div>
              </div>

              <hr className="my-3" style={{ color: "#eee" }} />

              <h6 className="fw-bold mb-2">Guest ID</h6>
              <div className="row">
                {currentGuest?.document_paths?.map((url, i) => (
                  <div key={i} className="col-6 ">
                    <img
                      src={url}
                      className={styles.guestID}
                      alt={`Guest ID`}
                    />
                  </div>
                ))}
              </div>

              {/* <div className="row g-2">
                <div className="col-6">
                  <div className={styles.textLabel}>Membership Status</div>
                  <div>
                    <span className={styles.badgeCustom}>Platinum Member</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className={styles.textLabel}>Tier Level</div>
                  <div className={styles.textVal}>
                    <i className="bi bi-award text-warning"></i> Elite
                  </div>
                </div>
                <div className="col-12 mt-2">
                  <div className={styles.textLabel}>Points Balance</div>
                  <div className={styles.textVal}>15,000 points</div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="col-md-8">
            <div className={styles.cardCustom}>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="fw-bold mb-1">Booking Info</h6>
                  <span className={styles.badgeStatus}>
                    <i className="bi bi-check-circle-fill me-1"></i> Booking{" "}
                    {currentGuest?.status}
                  </span>
                </div>
                <i className="bi bi-three-dots text-muted"></i>
              </div>

              <h4 className="fw-bold mb-1">
                Booking ID: {currentGuest?.booking_code}
              </h4>
              <small className="text-muted d-block mb-3">
                {currentGuest?.created_at}
              </small>

              <div className="row g-3 mb-3">
                <div className="col-3">
                  <div className={styles.textLabel}>Room Type</div>
                  <div className={styles.textVal}>
                    {currentGuest?.room_type_name}
                  </div>
                </div>
                <div className="col-3">
                  <div className={styles.textLabel}>Room Number</div>
                  <div className={styles.textVal}>
                    {currentGuest?.room_number}
                  </div>
                </div>
                <div className="col-3">
                  <div className={styles.textLabel}>Price</div>
                  <div className={styles.textVal}>
                    ${currentGuest?.total_amount}{" "}
                    <span className="fw-normal text-muted">/night</span>
                  </div>
                </div>
                <div className="col-3">
                  <div className={styles.textLabel}>Guests</div>
                  <div className={styles.textVal}>
                    {currentGuest?.guests_count} Adults
                  </div>
                </div>
                <div className="col-3">
                  <div className={styles.textLabel}>Check In</div>
                  <div className={styles.textVal}>{currentGuest?.check_in}</div>
                  <small className="text-muted">1:45 PM</small>
                </div>
                <div className="col-3">
                  <div className={styles.textLabel}>Check Out</div>
                  <div className={styles.textVal}>
                    {currentGuest?.check_out}
                  </div>
                  <small className="text-muted">11:45 AM</small>
                </div>
                <div className="col-3">
                  <div className={styles.textLabel}>Duration</div>
                  <div className={styles.textVal}>3 nights</div>
                </div>
              </div>

              <div className="p-2 bg-light rounded mb-3">
                <div className={styles.textLabel}>Notes</div>
                <div style={{ fontSize: "0.8rem" }} className="text-dark">
                  {currentGuest?.notes}
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="border rounded p-2">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-bold" style={{ fontSize: "0.85rem" }}>
                        Room Info
                      </span>
                      <Link
                        to="#"
                        className="text-muted"
                        style={{ fontSize: "0.75rem" }}
                      >
                        View Detail
                      </Link>
                    </div>
                    <img
                      src={currentGuest?.room_image}
                      className={styles.roomImg}
                      alt="Room"
                    />
                    <div
                      className="d-flex gap-2 text-muted mt-2"
                      style={{ fontSize: "0.75rem" }}
                    >
                      <span>
                        <i className="bi bi-aspect-ratio me-1"></i>{" "}
                        {currentGuest?.size_m2} m²
                      </span>
                      <span>
                        <i className="bi bi-border-outer me-1"></i>{" "}
                        {currentGuest?.bed_type} Bed
                      </span>
                      <span>
                        <i className="bi bi-people me-1"></i>{" "}
                        {currentGuest?.max_guests} guests
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="border rounded p-2">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold" style={{ fontSize: "0.85rem" }}>
                        Price Summary
                      </span>
                      <span
                        className="badge bg-success"
                        style={{ fontSize: "0.65rem" }}
                      >
                        {currentGuest?.payment_status}
                      </span>
                    </div>
                    <div
                      className="d-flex justify-content-between text-muted mb-1"
                      style={{ fontSize: "0.8rem" }}
                    >
                      <span>Room and offer</span>
                      <span>${currentGuest?.price_per_night}</span>
                    </div>
                    <div
                      className="d-flex justify-content-between text-muted mb-1"
                      style={{ fontSize: "0.8rem" }}
                    >
                      <span>Extras</span>
                      <span>$0.00</span>
                    </div>
                    <div
                      className="d-flex justify-content-between text-muted mb-1"
                      style={{ fontSize: "0.8rem" }}
                    >
                      <span>8% VAT</span>
                      <span>$36.00</span>
                    </div>
                    <div
                      className="d-flex justify-content-between text-muted mb-2"
                      style={{ fontSize: "0.8rem" }}
                    >
                      <span>City Tax</span>
                      <span>$49.50</span>
                    </div>
                    <hr className="my-1" />
                    <div
                      className="d-flex justify-content-between fw-bold text-dark"
                      style={{ fontSize: "0.9rem" }}
                    >
                      <span>Total Price</span>
                      <span>{currentGuest?.total_amount}</span>
                    </div>
                  </div>

                  <div className="d-flex gap-2 justify-content-end mt-3">
                    <button className="btn btn-sm btn-outline-secondary px-3">
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger px-3">
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className={styles.cardCustom}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold m-0">Booking History</h6>
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Search guest, status, etc"
                  />
                  <Link
                    to="/add-guest"
                    className="btn btn-sm btn-success text-nowrap"
                  >
                    add new guest
                  </Link>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Booking ID</th>
                      <th>Booking Date</th>
                      <th>Room Type</th>
                      <th>Room Number</th>
                      <th>Check-In</th>
                      <th>Check-Out</th>
                      <th>Guests</th>
                      <th></th>
                    </tr>
                  </thead>
                  {guests.map((guest) => {
                    const guestUniqueId = guest?.booking_code;
                    const isSelected = selectedGuestId === guestUniqueId;
                    return (
                      <tbody
                        onClick={() => {
                          setSelectedGuestId(guestUniqueId);
                          setCurrentGuest(guest);
                        }}
                        style={{
                          cursor: "pointer",
                          backgroundColor: isSelected ? "#c9c9c9" : "#ffffff",
                        }}
                      >
                        <tr>
                          <td>
                            <img
                              src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=100"
                              className={styles.tableImg}
                              alt="Room"
                            />
                          </td>
                          <td className="fw-bold">{guest?.booking_code}</td>
                          <td>
                            {guest?.booking_created_at} <br />
                            <small className="text-muted">9:08 AM</small>
                          </td>
                          <td>
                            <span className={styles.badgeCustom}>
                              {guest?.room_type_name}
                            </span>
                          </td>
                          <td>Room {guest?.room_number}</td>
                          <td>
                            {guest?.check_in} <br />
                            <small className="text-muted">1:45 PM</small>
                          </td>
                          <td>
                            {guest?.check_out} <br />
                            <small className="text-muted">11:45 AM</small>
                          </td>
                          <td>{guest?.guests_count} Guests</td>
                          <td>
                            <i className="bi bi-three-dots text-muted"></i>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reservation;
