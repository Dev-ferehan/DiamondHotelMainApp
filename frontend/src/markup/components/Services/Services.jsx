import React from 'react'
import { Link } from "react-router-dom";

function Services() {
  return (
    <>
        {/* <!-- Service Start --> */}
      <div className="container-xxl py-5" id="service-section">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">
              Our Services
            </h6>
            <h1 className="mb-5">
              Explore Our{" "}
              <span className="text-primary text-uppercase">Services</span>
            </h1>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <Link className="service-item rounded" to="">
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-hotel fa-2x text-primary"></i>
                  </div>
                </div>
                <h5 className="mb-3">Rooms </h5>
                <p className="text-body mb-0">
                  Comfortable rooms with modern amenities, private bathrooms,
                  and relaxing spaces for a pleasant stay.
                </p>
              </Link>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <Link className="service-item rounded" to="">
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-utensils fa-2x text-primary"></i>
                  </div>
                </div>
                <h5 className="mb-3">Food & Restaurant</h5>
                <p className="text-body mb-0">
                  Enjoy delicious meals, breakfast, and refreshing drinks in a
                  comfortable dining environment.
                </p>
              </Link>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <Link className="service-item rounded" to="">
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-spa fa-2x text-primary"></i>
                  </div>
                </div>
                <h5 className="mb-3">Spa & Fitness</h5>
                <p className="text-body mb-0">
                  Relax and refresh with our spa, sauna, hot tub, and fitness
                  facilities.
                </p>
              </Link>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <Link className="service-item rounded" to="">
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-swimmer fa-2x text-primary"></i>
                  </div>
                </div>
                <h5 className="mb-3">Sports & Gaming</h5>
                <p className="text-body mb-0">
                  Enjoy your free time with relaxing activities and
                  entertainment during your stay.
                </p>
              </Link>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <Link className="service-item rounded" to="">
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-glass-cheers fa-2x text-primary"></i>
                  </div>
                </div>
                <h5 className="mb-3">Event & Party</h5>
                <p className="text-body mb-0">
                  A comfortable setting for gatherings, celebrations, and
                  special occasions.
                </p>
              </Link>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.6s"
            >
              <Link className="service-item rounded" to="">
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-dumbbell fa-2x text-primary"></i>
                  </div>
                </div>
                <h5 className="mb-3">GYM & Yoga</h5>
                <p className="text-body mb-0">
                  Stay active during your visit with fitness facilities designed
                  for your daily workout.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Service End --> */}
    </>
  )
}

export default Services
