import React from "react";
import room1 from "../../../assets/img/room-1.jpg";
import room2 from "../../../assets/img/room-2.jpg";
import room3 from "../../../assets/img/room-3.jpg";
import { Link } from "react-router-dom";
function Room() {
  return (
    <>
      {/* <!-- Room Start --> */}
      <div className="container-xxl py-5" id="room-section">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">
              Our Rooms
            </h6>
            <h1 className="mb-5">
              Explore Our{" "}
              <span className="text-primary text-uppercase">Rooms</span>
            </h1>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="room-item shadow rounded overflow-hidden">
                <div className="position-relative">
                  <img className="img-fluid" src={room1} alt="" />
                  <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                    2900 birr
                  </small>
                </div>
                <div className="p-4 mt-2">
                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="mb-0">Junior Suite</h5>
                    <div className="ps-2">
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                    </div>
                  </div>
                  <div className="d-flex mb-3">
                    <small className="border-end me-3 pe-3">
                      <i className="fa fa-bed text-primary me-2"></i>1 Bed
                    </small>
                    <small className="border-end me-3 pe-3">
                      <i className="fa fa-bath text-primary me-2"></i>1 Bath
                    </small>
                    <small>
                      <i className="fa fa-wifi text-primary me-2"></i>Wifi
                    </small>
                  </div>
                  <p className="text-body mb-3">
                    Elegant king room with warm lighting, Link comfortable bed,
                    and stylish interior.
                  </p>
                  <div className="d-flex justify-content-between">
                    <Link
                      className="btn btn-sm btn-primary rounded py-2 px-4"
                      to=""
                    >
                      View Detail
                    </Link>
                    <Link
                      className="btn btn-sm btn-dark rounded py-2 px-4"
                      to="/booking"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="room-item shadow rounded overflow-hidden">
                <div className="position-relative">
                  <img className="img-fluid" src={room2} alt="" />
                  <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                    3,500 Birr
                  </small>
                </div>
                <div className="p-4 mt-2">
                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="mb-0">Twin Room</h5>
                    <div className="ps-2">
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                    </div>
                  </div>
                  <div className="d-flex mb-3">
                    <small className="border-end me-3 pe-3">
                      <i className="fa fa-bed text-primary me-2"></i>2 Bed
                    </small>
                    <small className="border-end me-3 pe-3">
                      <i className="fa fa-bath text-primary me-2"></i>1 Bath
                    </small>
                    <small>
                      <i className="fa fa-wifi text-primary me-2"></i>Wifi
                    </small>
                  </div>
                  <p className="text-body mb-3">
                    Comfortable room with two separate beds, modern furnishings.
                  </p>
                  <div className="d-flex justify-content-between">
                    <Link
                      className="btn btn-sm btn-primary rounded py-2 px-4"
                      to=""
                    >
                      View Detail
                    </Link>
                    <Link
                      className="btn btn-sm btn-dark rounded py-2 px-4"
                      to="/booking"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.6s"
            >
              <div className="room-item shadow rounded overflow-hidden">
                <div className="position-relative">
                  <img className="img-fluid" src={room3} alt="" />
                  <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                    3,200 Birr
                  </small>
                </div>
                <div className="p-4 mt-2">
                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="mb-0">Deluxe Room</h5>
                    <div className="ps-2">
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                    </div>
                  </div>
                  <div className="d-flex mb-3">
                    <small className="border-end me-3 pe-3">
                      <i className="fa fa-bed text-primary me-2"></i>1 Bed
                    </small>
                    <small className="border-end me-3 pe-3">
                      <i className="fa fa-bath text-primary me-2"></i>1 Bath
                    </small>
                    <small>
                      <i className="fa fa-wifi text-primary me-2"></i>Wifi
                    </small>
                  </div>
                  <p className="text-body mb-3">
                    Bright and cozy room with Link comfortable king bed and
                    elegant hotel-style design.
                  </p>
                  <div className="d-flex justify-content-between">
                    <Link
                      className="btn btn-sm btn-primary rounded py-2 px-4"
                      to=""
                    >
                      View Detail
                    </Link>
                    <Link
                      className="btn btn-sm btn-dark rounded py-2 px-4"
                      to="/booking"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Room End --> */}
    </>
  );
}

export default Room;
