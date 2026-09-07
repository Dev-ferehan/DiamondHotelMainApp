import React from "react";
// import { Link } from "react-router-dom";
import { HashLink as Link  } from 'react-router-hash-link';
function Header() {
  return (
    <div>


           {/* <!-- Spinner Start --> */}
        {/* <div id="spinner"
            className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-primary" style={{ width:'3rem' , height:'3rem'}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div> */}
        {/* <!-- Spinner End --> */}
      {/* <!-- Header Start --> */}
      <div className="container-fluid bg-dark px-0" id="top">
        <div className="row gx-0">
          <div className="col-lg-3 bg-dark d-none d-lg-block">
            <Link
              to="index.html"
              className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
            >
              <h1 className="m-0 text-primary text-uppercase">Diamond</h1>
            </Link>
          </div>
          <div className="col-lg-9">
            <div className="row gx-0 bg-white d-none d-lg-flex">
              <div className="col-lg-7 px-5 text-start">
                <div className="h-100 d-inline-flex align-items-center py-2 me-4">
                  <i className="fa fa-envelope text-primary me-2"></i>
                  <p className="mb-0">info@diamond.com</p>
                </div>
                <div className="h-100 d-inline-flex align-items-center py-2">
                  <i className="fa fa-phone-alt text-primary me-2"></i>
                  <p className="mb-0">+251 911 000 000</p>
                </div>
              </div>
              <div className="col-lg-5 px-5 text-end">
                <div className="d-inline-flex align-items-center py-2">
                  <Link className="me-3" to="">
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                  <Link className="me-3" to="">
                    <i className="fab fa-twitter"></i>
                  </Link>
                  <Link className="me-3" to="">
                    <i className="fab fa-linkedin-in"></i>
                  </Link>
                  <Link className="me-3" to="">
                    <i className="fab fa-instagram"></i>
                  </Link>
                  <Link className="" to="">
                    <i className="fab fa-youtube"></i>
                  </Link>
                </div>
              </div>
            </div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
              <Link to="index.html" className="navbar-brand d-block d-lg-none">
                <h1 className="m-0 text-primary text-uppercase">Diamond</h1>
              </Link>
              <button
                type="button"
                className="navbar-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                <div className="navbar-nav mr-auto py-0">
                  <Link to="/" className="nav-item nav-link active">
                    Home
                  </Link>
                  <Link smooth to="/#about-section" className="nav-item nav-link">
                    About
                  </Link>
                  <Link smooth to="/#service-section" className="nav-item nav-link">
                    Services
                  </Link>
                  <Link smooth to="/#room-section" className="nav-item nav-link">
                    Rooms
                  </Link>
                  <div className="nav-item dropdown">
                    <Link
                      to="#"
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      Pages
                    </Link>
                    <div className="dropdown-menu rounded-0 m-0">
                      <Link to="/booking" className="dropdown-item">
                        Booking
                      </Link>
                      <Link smooth to="/#testimonial-section" className="dropdown-item">
                        Testimonial
                      </Link>
                    </div>
                  </div>
                  <Link to="/contact" className="nav-item nav-link">
                    Contact
                  </Link>
                </div>
                <Link
                  to="/login"
                  className="btn btn-primary rounded-0 py-4 px-md-5 d-none d-lg-block"
                >
                  Login<i className="fa fa-arrow-right ms-3"></i>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* <!-- Header End --> */}
      </div>

  );
}

export default Header;
