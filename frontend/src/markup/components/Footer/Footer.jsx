import React from "react";
// import { Link } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';
function Footer() {
  return (
    <div>
      {/* <!-- Footer Start --> */}
      <div
        className="container-fluid bg-dark text-light footer wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container pb-5">
          <div className="row g-5">
            <div className="col-md-6 col-lg-4">
              <div className="bg-primary rounded p-4">
                <Link to="index.html">
                  <h1 className="text-white text-uppercase mb-3">Diamond</h1>
                </Link>
                <p className="text-white mb-0">
                  Welcome to Diamond Hotel, where luxury meets comfort.
                  Experience world-class hospitality, elegant accommodations,
                  and unforgettable moments during your stay.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <h6 className="section-title text-start text-primary text-uppercase mb-4">
                Contact
              </h6>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3"></i>Dessie, Ethiopia
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3"></i>+251 911 000 000
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3"></i>info@diamondhotel.com
              </p>
              <div className="d-flex pt-2">
                <Link className="btn btn-outline-light btn-social" to="">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link className="btn btn-outline-light btn-social" to="">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link className="btn btn-outline-light btn-social" to="">
                  <i className="fab fa-youtube"></i>
                </Link>
                <Link className="btn btn-outline-light btn-social" to="">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </div>
            </div>
            <div className="col-lg-5 col-md-12">
              <div className="row gy-5 g-4">
                <div className="col-md-6">
                  <h6 className="section-title text-start text-primary text-uppercase mb-4">
                    Company
                  </h6>
                  <Link className="btn btn-link" to="">
                    About Us
                  </Link>
                  <Link className="btn btn-link" to="">
                    Contact Us
                  </Link>
                  <Link className="btn btn-link" to="">
                    Privacy Policy
                  </Link>
                  <Link className="btn btn-link" to="">
                    Terms & Condition
                  </Link>
                  <Link className="btn btn-link" to="">
                    Support
                  </Link>
                </div>
                <div className="col-md-6">
                  <h6 className="section-title text-start text-primary text-uppercase mb-4">
                    Services
                  </h6>
                  <Link className="btn btn-link" to="">
                    Food & Restaurant
                  </Link>
                  <Link className="btn btn-link" to="">
                    Spa & Fitness
                  </Link>
                  <Link className="btn btn-link" to="">
                    Sports & Gaming
                  </Link>
                  <Link className="btn btn-link" to="">
                    Event & Party
                  </Link>
                  <Link className="btn btn-link" to="">
                    GYM & Yoga
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                &copy;{" "}
                <Link className="border-bottom" to="#">
                  Diamond Hotel
                </Link>
                , All Right Reserved.
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div className="footer-menu">
                  <Link to="">Home</Link>
                  {/* <!-- <Link to="">Cookies</Link> --> */}
                  <Link to="">Help</Link>
                  <Link to="">FQAs</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Footer End --> */}
      
        {/* <!-- Back to Top --> */}

      <Link to="/#top" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></Link>
    </div>
  );
}
export default Footer;
