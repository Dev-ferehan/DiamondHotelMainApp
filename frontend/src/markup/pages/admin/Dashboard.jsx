import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js Modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function Dashboard() {
  const wrapperStyle = {
    display: "flex",
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#f4f6f8",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: "#333",
    overflowX: "hidden",
  };

  // Chart Data Configuration
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        fill: true,
        label: "Revenue ($)",
        data: [1200, 1900, 3000, 5000, 2400, 3200, 4500],
        borderColor: "rgba(13, 110, 253, 1)",
        backgroundColor: "rgba(13, 110, 253, 0.15)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#e9ecef",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={wrapperStyle}>
      {/* Sidebar Component */}
      <SideBar />

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column min-vh-100" style={{ overflowX: "hidden" }}>
        {/* Top Navbar */}
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark px-3">
      
          <button
            className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 text-white"
            id="sidebarToggle"
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* Navbar Search */}
          <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Search for..."
                aria-label="Search for..."
              />
              <button className="btn btn-primary" type="button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>

          {/* User Menu Dropdown */}
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user fa-fw"></i>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="#!">Settings</Link></li>
                <li><Link className="dropdown-item" to="#!">Activity Log</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="#!">Logout</Link></li>
              </ul>
            </li>
          </ul>
        </nav>

        {/* Dashboard Body Content */}
        <main className="px-4 py-3 flex-grow-1">
          <div className="container-fluid px-0">
            <h1 className="mt-2 fw-bold fs-3">Dashboard</h1>
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item active">Dashboard Overview</li>
            </ol>

            {/* Top Cards Row */}
            <div className="row g-3 mb-4">
              <div className="col-xl-3 col-md-6">
                <div className="card bg-warning text-white h-100 shadow-sm border-0">
                  <div className="card-body">
                    <div className="fw-semibold">New Bookings</div>
                    <h2 className="display-6 fw-bold my-2">850</h2>
                    <div className="small text-white-50">from last week</div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6">
                <div className="card bg-white text-dark h-100 shadow-sm border-0">
                  <div className="card-body">
                    <div className="fw-semibold text-muted">Check-in</div>
                    <h2 className="display-6 fw-bold my-2">567</h2>
                    <div className="small text-muted">from last week</div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6">
                <div className="card bg-white text-dark h-100 shadow-sm border-0">
                  <div className="card-body">
                    <div className="fw-semibold text-muted">Check-out</div>
                    <h2 className="display-6 fw-bold my-2">567</h2>
                    <div className="small text-muted">from last week</div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6">
                <div className="card bg-white text-dark h-100 shadow-sm border-0">
                  <div className="card-body">
                    <div className="fw-semibold text-muted">Total Revenue</div>
                    <h2 className="display-6 fw-bold my-2">$56,700</h2>
                    <div className="small text-muted">from last week</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Availability & Revenue Chart Row */}
            <div className="row g-3 mb-4">
              <div className="col-xl-4">
                <div className="card bg-white h-100 p-4 shadow-sm border-0">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold m-0 text-dark fs-6">Room Availability</h5>
                    <span className="text-muted fw-bold fs-5 cursor-pointer">&bull;&bull;&bull;</span>
                  </div>

                  {/* Availability Progress Bar */}
                  <div className="progress mb-4" style={{ height: "12px", borderRadius: "8px" }}>
                    <div className="progress-bar bg-primary" style={{ width: "68.4%" }} title="Occupied: 68.4%"></div>
                    <div className="progress-bar bg-info" style={{ width: "20.8%" }} title="Reserved: 20.8%"></div>
                    <div className="progress-bar bg-success" style={{ width: "7.6%" }} title="Available: 7.6%"></div>
                    <div className="progress-bar bg-danger" style={{ width: "3.2%" }} title="Not Ready: 3.2%"></div>
                  </div>

                  <div className="row g-3">
                    <div className="col-6 d-flex align-items-center">
                      <div className="border-start border-4 border-primary ps-2">
                        <div className="text-muted small">Occupied</div>
                        <div className="fw-bold fs-5">286</div>
                      </div>
                    </div>
                    <div className="col-6 d-flex align-items-center">
                      <div className="border-start border-4 border-info ps-2">
                        <div className="text-muted small">Reserved</div>
                        <div className="fw-bold fs-5">87</div>
                      </div>
                    </div>
                    <div className="col-6 d-flex align-items-center">
                      <div className="border-start border-4 border-success ps-2">
                        <div className="text-muted small">Available</div>
                        <div className="fw-bold fs-5">32</div>
                      </div>
                    </div>
                    <div className="col-6 d-flex align-items-center">
                      <div className="border-start border-4 border-danger ps-2">
                        <div className="text-muted small">Not Ready</div>
                        <div className="fw-bold fs-5">13</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue Area Chart */}
              <div className="col-xl-8">
                <div className="card bg-white h-100 shadow-sm border-0">
                  <div className="card-header bg-transparent fw-bold border-0 pt-3 pb-0">
                    <i className="fas fa-chart-line me-2 text-primary"></i>
                    Revenue Trend
                  </div>
                  <div className="card-body" style={{ minHeight: "260px", position: "relative" }}>
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>

            {/* Booking List Table */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-transparent fw-bold py-3 border-0">
                <i className="fas fa-table me-2 text-primary"></i>Booking List
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-3">Booking ID</th>
                        <th>Guest Name</th>
                        <th>Room Type</th>
                        <th>Room Number</th>
                        <th>Check-in & Check-out Date</th>
                        <th className="pe-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="ps-3 fw-semibold">BK-1001</td>
                        <td>Abebe Bikila</td>
                        <td>Deluxe Suite</td>
                        <td>101</td>
                        <td>2026-09-01 - 2026-09-05</td>
                        <td className="pe-3"><span className="badge bg-success">Checked-In</span></td>
                      </tr>
                      <tr>
                        <td className="ps-3 fw-semibold">BK-1002</td>
                        <td>Tigist Assefa</td>
                        <td>Single Room</td>
                        <td>102</td>
                        <td>2026-09-01 - 2026-09-03</td>
                        <td className="pe-3"><span className="badge bg-warning text-dark">Reserved</span></td>
                      </tr>
                      <tr>
                        <td className="ps-3 fw-semibold">BK-1003</td>
                        <td>Yared Lemma</td>
                        <td>Double Room</td>
                        <td>201</td>
                        <td>2026-08-28 - 2026-09-02</td>
                        <td className="pe-3"><span className="badge bg-danger">Checked-Out</span></td>
                      </tr>
                      <tr>
                        <td className="ps-3 fw-semibold">BK-1004</td>
                        <td>Bethlehem Tilahun</td>
                        <td>Executive Suite</td>
                        <td>305</td>
                        <td>2026-09-02 - 2026-09-08</td>
                        <td className="pe-3"><span className="badge bg-warning text-dark">Reserved</span></td>
                      </tr>
                      <tr>
                        <td className="ps-3 fw-semibold">BK-1005</td>
                        <td>Dawit Tsige</td>
                        <td>Standard Room</td>
                        <td>104</td>
                        <td>2026-08-30 - 2026-09-04</td>
                        <td className="pe-3"><span className="badge bg-success">Checked-In</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="py-3 bg-white mt-auto border-top">
          <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between small text-muted">
              <div>Copyright &copy; Diamond Admin 2026</div>
              <div>
                <Link to="#" className="text-decoration-none me-2">Privacy Policy</Link>
                &middot;
                <Link to="#" className="text-decoration-none ms-2">Terms &amp; Conditions</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;