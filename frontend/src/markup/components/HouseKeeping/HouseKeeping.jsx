import React from 'react'
import styles from './housekeeping.module.css'

function HouseKeeping() {
  return (
    <div>
      <div className={styles['main-content']}>
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold m-0">Housekeeping</h4>
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
                <div className="fw-bold" style={{ fontSize: '0.85rem' }}>
                  Jaylon Dorwart
                </div>
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                  Admin
                </div>
              </div>
            </div>
            <i className={`bi bi-gear fs-5 text-muted ${styles['cursor-pointer']}`}></i>
            <i className={`bi bi-bell fs-5 text-muted ${styles['cursor-pointer']}`}></i>
          </div>
        </div>

        {/* Content Card */}
        <div className={styles['card-custom']}>
          {/* Controls / Filters */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <div className={styles['search-wrapper']} style={{ width: '280px' }}>
              <i className="bi bi-search"></i>
              <input
                type="text"
                className={`form-control ${styles['search-input']}`}
                placeholder="Search room, floor, etc"
              />
            </div>

            <div className="d-flex gap-2">
              <button className={`btn ${styles['btn-filter']}`}>
                <i className="bi bi-funnel"></i> All Room <i className="bi bi-chevron-down ms-1"></i>
              </button>
              <button className={`btn ${styles['btn-filter']}`}>
                <i className="bi bi-funnel"></i> All Status <i className="bi bi-chevron-down ms-1"></i>
              </button>
              <button className={`btn ${styles['btn-filter']}`}>
                <i className="bi bi-funnel"></i> All Priority <i className="bi bi-chevron-down ms-1"></i>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <input className="form-check-input" type="checkbox" />
                  </th>
                  <th>Room Number <i className="bi bi-arrow-down-up"></i></th>
                  <th>Room Type <i className="bi bi-arrow-down-up"></i></th>
                  <th>Housekeeping Status <i className="bi bi-arrow-down-up"></i></th>
                  <th>Priority <i className="bi bi-arrow-down-up"></i></th>
                  <th>Floor <i className="bi bi-arrow-down-up"></i></th>
                  <th>Reservation Status <i className="bi bi-arrow-down-up"></i></th>
                  <th>Notes <i className="bi bi-arrow-down-up"></i></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input className="form-check-input" type="checkbox" /></td>
                  <td className="fw-bold">Room 101</td>
                  <td>Deluxe</td>
                  <td>
                    <span className={`${styles['badge-status-pill']} ${styles['badge-in-progress']}`}>
                      Cleaning in Progress <i className="bi bi-chevron-down"></i>
                    </span>
                  </td>
                  <td>
                    <span className={styles['priority-text']}>
                      <i className={`bi bi-circle-fill ${styles['priority-high']} me-1`}></i> High <i className="bi bi-chevron-down"></i>
                    </span>
                  </td>
                  <td>1st</td>
                  <td>Checked-In</td>
                  <td className="text-muted">Guest requested extra towels and pillows.</td>
                </tr>

                <tr>
                  <td><input className="form-check-input" type="checkbox" /></td>
                  <td className="fw-bold">Room 102</td>
                  <td>Standard</td>
                  <td>
                    <span className={`${styles['badge-status-pill']} ${styles['badge-ready']}`}>
                      Ready <i className="bi bi-chevron-down"></i>
                    </span>
                  </td>
                  <td>
                    <span className={styles['priority-text']}>
                      <i className={`bi bi-circle-fill ${styles['priority-low']} me-1`}></i> Low <i className="bi bi-chevron-down"></i>
                    </span>
                  </td>
                  <td>1st</td>
                  <td>Reserved</td>
                  <td className="text-muted">-</td>
                </tr>

                <tr>
                  <td><input className="form-check-input" type="checkbox" defaultChecked /></td>
                  <td className="fw-bold">Room 103</td>
                  <td>Suite</td>
                  <td>
                    <span className={`${styles['badge-status-pill']} ${styles['badge-needs-cleaning']}`}>
                      Needs Cleaning <i className="bi bi-chevron-down"></i>
                    </span>
                  </td>
                  <td>
                    <span className={styles['priority-text']}>
                      <i className={`bi bi-circle-fill ${styles['priority-high']} me-1`}></i> High <i className="bi bi-chevron-down"></i>
                    </span>
                  </td>
                  <td>2nd</td>
                  <td>Checked-Out</td>
                  <td className="text-muted">Ensure room is stocked with amenities.</td>
                </tr>

                <tr>
                  <td><input className="form-check-input" type="checkbox" defaultChecked /></td>
                  <td className="fw-bold">Room 201</td>
                  <td>Standard</td>
                  <td>
                    <span className={`${styles['badge-status-pill']} ${styles['badge-in-progress']}`}>
                      Cleaning in Progress <i className="bi bi-chevron-down"></i>
                    </span>
                  </td>
                  <td>
                    <span className={styles['priority-text']}>
                      <i className={`bi bi-circle-fill ${styles['priority-medium']} me-1`}></i> Medium <i className="bi bi-chevron-down"></i>
                    </span>
                  </td>
                  <td>2nd</td>
                  <td>Checked-In</td>
                  <td className="text-muted">Deep clean due to extended stay.</td>
                </tr>

                <tr>
                  <td><input className="form-check-input" type="checkbox" /></td>
                  <td className="fw-bold">Room 202</td>
                  <td>Standard</td>
                  <td>
                    <span className={`${styles['badge-status-pill']} ${styles['badge-needs-cleaning']}`}>
                      Needs Cleaning <i className="bi bi-chevron-down"></i>
                    </span>
                  </td>
                  <td>
                    <span className={styles['priority-text']}>
                      <i className={`bi bi-circle-fill ${styles['priority-medium']} me-1`}></i> Medium <i className="bi bi-chevron-down"></i>
                    </span>
                  </td>
                  <td>2nd</td>
                  <td>Checked-Out</td>
                  <td className="text-muted">Guest requested fresh linens.</td>
                </tr>

                <tr>
                  <td><input className="form-check-input" type="checkbox" /></td>
                  <td className="fw-bold">Room 203</td>
                  <td>Deluxe</td>
                  <td>
                    <span className={`${styles['badge-status-pill']} ${styles['badge-ready']}`}>
                      Ready <i className="bi bi-chevron-down"></i>
                    </span>
                  </td>
                  <td>
                    <span className={styles['priority-text']}>
                      <i className={`bi bi-circle-fill ${styles['priority-low']} me-1`}></i> Low <i className="bi bi-chevron-down"></i>
                    </span>
                  </td>
                  <td>2nd</td>
                  <td>Reserved</td>
                  <td className="text-muted">Ensure bathroom amenities are replenished.</td>
                </tr>

                <tr>
                  <td><input className="form-check-input" type="checkbox" /></td>
                  <td className="fw-bold">Room 301</td>
                  <td>Suite</td>
                  <td>
                    <span className={`${styles['badge-status-pill']} ${styles['badge-inspection']}`}>
                      Needs Inspection <i className="bi bi-chevron-down"></i>
                    </span>
                  </td>
                  <td>
                    <span className={styles['priority-text']}>
                      <i className={`bi bi-circle-fill ${styles['priority-medium']} me-1`}></i> Medium <i className="bi bi-chevron-down"></i>
                    </span>
                  </td>
                  <td>3rd</td>
                  <td>Checked-Out</td>
                  <td className="text-muted">Check minibar supplies and restock if necessary.</td>
                </tr>

                <tr>
                  <td><input className="form-check-input" type="checkbox" /></td>
                  <td className="fw-bold">Room 302</td>
                  <td>Deluxe</td>
                  <td>
                    <span className={`${styles['badge-status-pill']} ${styles['badge-in-progress']}`}>
                      Cleaning in Progress <i className="bi bi-chevron-down"></i>
                    </span>
                  </td>
                  <td>
                    <span className={styles['priority-text']}>
                      <i className={`bi bi-circle-fill ${styles['priority-high']} me-1`}></i> High <i className="bi bi-chevron-down"></i>
                    </span>
                  </td>
                  <td>3rd</td>
                  <td>Checked-In</td>
                  <td className="text-muted">Verify that all electronics are functioning properly.</td>
                </tr>

                <tr>
                  <td><input className="form-check-input" type="checkbox" /></td>
                  <td className="fw-bold">Room 303</td>
                  <td>Suite</td>
                  <td>
                    <span className={`${styles['badge-status-pill']} ${styles['badge-ready']}`}>
                      Ready <i className="bi bi-chevron-down"></i>
                    </span>
                  </td>
                  <td>
                    <span className={styles['priority-text']}>
                      <i className={`bi bi-circle-fill ${styles['priority-low']} me-1`}></i> Low <i className="bi bi-chevron-down"></i>
                    </span>
                  </td>
                  <td>3rd</td>
                  <td>Reserved</td>
                  <td className="text-muted">Guest reported a spill on the carpet.</td>
                </tr>

                <tr>
                  <td><input className="form-check-input" type="checkbox" /></td>
                  <td className="fw-bold">Room 304</td>
                  <td>Standard</td>
                  <td>
                    <span className={`${styles['badge-status-pill']} ${styles['badge-needs-cleaning']}`}>
                      Needs Cleaning <i className="bi bi-chevron-down"></i>
                    </span>
                  </td>
                  <td>
                    <span className={styles['priority-text']}>
                      <i className={`bi bi-circle-fill ${styles['priority-medium']} me-1`}></i> Medium <i className="bi bi-chevron-down"></i>
                    </span>
                  </td>
                  <td>3rd</td>
                  <td>Checked-Out</td>
                  <td className="text-muted">Ensure all towels are replaced.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3 pt-2">
            <span className="text-muted" style={{ fontSize: '0.8rem' }}>
              Showing 1-10 of 535
            </span>
            <ul className="pagination pagination-sm m-0 gap-1">
              <li className="page-item disabled">
                <a className="page-link border-0 text-muted" href="#">
                  <i className="bi bi-chevron-left"></i>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link border-0 text-dark" href="#">1</a>
              </li>
              <li className="page-item active">
                <a className="page-link border-0 bg-warning text-dark fw-bold rounded" href="#">2</a>
              </li>
              <li className="page-item">
                <a className="page-link border-0 text-dark" href="#">3</a>
              </li>
              <li className="page-item">
                <span className="page-link border-0 text-muted">...</span>
              </li>
              <li className="page-item">
                <a className="page-link border-0 text-dark" href="#">8</a>
              </li>
              <li className="page-item">
                <a className="page-link border-0 text-dark" href="#">
                  <i className="bi bi-chevron-right"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HouseKeeping