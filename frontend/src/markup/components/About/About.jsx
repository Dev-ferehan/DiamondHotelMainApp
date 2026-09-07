import React from "react";
import { Link } from "react-router-dom";
import about1 from'../../../assets/img/about-1.jpg'
import about2 from'../../../assets/img/about-2.jpg'
import about3 from'../../../assets/img/about-3.jpg'
import about4 from'../../../assets/img/about-4.jpg'
function About() {
  return (
    <>
      {/* <!-- About Start --> */}
      <div className="container-xxl py-5" id="about-section">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h6 className="section-title text-start text-primary text-uppercase">
                About Us
              </h6>
              <h1 className="mb-4">
                Welcome to{" "}
                <span className="text-primary text-uppercase">Diamond</span>
              </h1>
              <p className="mb-4">
                Located in the heart of Dessie, Diamond Hotel delivers a perfect
                blend of modern luxury and authentic Ethiopian hospitality.
                Whether you are visiting for business or leisure, our hotel
                provides elegant accommodations, fine dining, and exceptional
                services tailored to make your stay memorable and comfortable.
              </p>
              <div className="row g-3 pb-4">
                <div className="col-sm-4 wow fadeIn" data-wow-delay="0.1s">
                  <div className="border rounded p-1">
                    <div className="border rounded text-center p-4">
                      <i className="fa fa-hotel fa-2x text-primary mb-2"></i>
                      <h2 className="mb-1" data-toggle="counter-up">
                        50
                      </h2>
                      <p className="mb-0">Rooms</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 wow fadeIn" data-wow-delay="0.3s">
                  <div className="border rounded p-1">
                    <div className="border rounded text-center p-4">
                      <i className="fa fa-users-cog fa-2x text-primary mb-2"></i>
                      <h2 className="mb-1" data-toggle="counter-up">
                        55
                      </h2>
                      <p className="mb-0">Staffs</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 wow fadeIn" data-wow-delay="0.5s">
                  <div className="border rounded p-1">
                    <div className="border rounded text-center p-4">
                      <i className="fa fa-users fa-2x text-primary mb-2"></i>
                      <h2 className="mb-1" data-toggle="counter-up">
                        5000
                      </h2>
                      <p className="mb-0">Clients</p>
                    </div>
                  </div>
                </div>
              </div>
              <Link className="btn btn-primary py-3 px-5 mt-2" to="">
                Explore More
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6 text-end">
                  <img
                    className="img-fluid rounded w-75 wow zoomIn"
                    data-wow-delay="0.1s"
                    src={about1}
                    style={{marginTop: '25%'}}
                  />
                </div>
                <div className="col-6 text-start">
                  <img
                    className="img-fluid rounded w-100 wow zoomIn"
                    data-wow-delay="0.3s"
                    src={about2}
                  />
                </div>
                <div className="col-6 text-end">
                  <img
                    className="img-fluid rounded w-50 wow zoomIn"
                    data-wow-delay="0.5s"
                    src={about3}
                  />
                </div>
                <div className="col-6 text-start">
                  <img
                    className="img-fluid rounded w-75 wow zoomIn"
                    data-wow-delay="0.7s"
                    src={about4}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- About End --> */}
    </>
  );
}

export default About;
