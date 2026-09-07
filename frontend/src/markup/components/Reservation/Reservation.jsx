import React from 'react'
import styles from './reservation.module.css'
import { Link } from 'react-router-dom'
// import "../../../assets/css/admin/styles.css";

function Reservation() {
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
                  <h5 className="fw-bold mb-0">Angus Copper</h5>
                  <small className="text-muted">G011-987654321</small>
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
                  <i className="bi bi-envelope"></i> angus.copper@example.com
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
                  <div className={styles.textVal}>Male</div>
                </div>
                <div className="col-6">
                  <div className={styles.textLabel}>Nationality</div>
                  <div className={styles.textVal}>American</div>
                </div>
                <div className="col-6">
                  <div className={styles.textLabel}>Passport No.</div>
                  <div className={styles.textVal}>A12345678</div>
                </div>
              </div>

              <hr className="my-3" style={{ color: "#eee" }} />

              <h6 className="fw-bold mb-2">Loyalty Program</h6>
              <div className="row g-2">
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
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className={styles.cardCustom}>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="fw-bold mb-1">Booking Info</h6>
                  <span className={styles.badgeStatus}>
                    <i className="bi bi-check-circle-fill me-1"></i> Booking
                    Confirmed
                  </span>
                </div>
                <i className="bi bi-three-dots text-muted"></i>
              </div>

              <h4 className="fw-bold mb-1">Booking ID: LG-B00109</h4>
              <small className="text-muted d-block mb-3">
                June 17, 2024, 9:46 AM
              </small>

              <div className="row g-3 mb-3">
                <div className="col-3">
                  <div className={styles.textLabel}>Room Type</div>
                  <div className={styles.textVal}>Deluxe</div>
                </div>
                <div className="col-3">
                  <div className={styles.textLabel}>Room Number</div>
                  <div className={styles.textVal}>101</div>
                </div>
                <div className="col-3">
                  <div className={styles.textLabel}>Price</div>
                  <div className={styles.textVal}>
                    $150 <span className="fw-normal text-muted">/night</span>
                  </div>
                </div>
                <div className="col-3">
                  <div className={styles.textLabel}>Guests</div>
                  <div className={styles.textVal}>2 Adults</div>
                </div>
                <div className="col-3">
                  <div className={styles.textLabel}>Check In</div>
                  <div className={styles.textVal}>June 19, 2024</div>
                  <small className="text-muted">1:45 PM</small>
                </div>
                <div className="col-3">
                  <div className={styles.textLabel}>Check Out</div>
                  <div className={styles.textVal}>June 22, 2024</div>
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
                  Guest requested extra pillows and towels. Ensure room service
                  is available upon arrival.
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
                      src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500"
                      className={styles.roomImg}
                      alt="Room"
                    />
                    <div
                      className="d-flex gap-2 text-muted mt-2"
                      style={{ fontSize: "0.75rem" }}
                    >
                      <span>
                        <i className="bi bi-aspect-ratio me-1"></i> 35 m²
                      </span>
                      <span>
                        <i className="bi bi-border-outer me-1"></i> King Bed
                      </span>
                      <span>
                        <i className="bi bi-people me-1"></i> 2 guests
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
                        Paid
                      </span>
                    </div>
                    <div
                      className="d-flex justify-content-between text-muted mb-1"
                      style={{ fontSize: "0.8rem" }}
                    >
                      <span>Room and offer</span>
                      <span>$450.00</span>
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
                      <span>$535.50</span>
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
                  <button className="btn btn-sm btn-success text-nowrap">
                    add new guest
                  </button>
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
                  <tbody>
                    <tr>
                      <td>
                        <img
                          src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=100"
                          className={styles.tableImg}
                          alt="Room"
                        />
                      </td>
                      <td className="fw-bold">LG-B00109</td>
                      <td>
                        June 09, 2028 <br />
                        <small className="text-muted">9:08 AM</small>
                      </td>
                      <td>
                        <span className={styles.badgeCustom}>Deluxe</span>
                      </td>
                      <td>Room 101</td>
                      <td>
                        June 19, 2024 <br />
                        <small className="text-muted">1:45 PM</small>
                      </td>
                      <td>
                        June 21, 2024 <br />
                        <small className="text-muted">11:45 AM</small>
                      </td>
                      <td>2 Guests</td>
                      <td>
                        <i className="bi bi-three-dots text-muted"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Reservation
