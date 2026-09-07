import React from "react";
import about1 from "../../../src/assets/img/about-1.jpg";
import about2 from "../../../src/assets/img/about-2.jpg";
import about3 from "../../../src/assets/img/about-3.jpg";
import about4 from "../../../src/assets/img/about-4.jpg";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import NewLetter from "../components/NewLetter/NewLetter";

function Booking() {
  return (
    <div>
      <Header/>
      {/* <!-- Booking Start --> */}
      {/* <div
        className="container-fluid booking pb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div className="bg-white shadow" style={{ padding: "35px" }}>
            <div className="row g-2">
              <div className="col-md-10">
                <div className="row g-2">
                  <div className="col-md-3">
                    <div
                      className="date"
                      id="date1"
                      data-target-input="nearest"
                    >
                      <input
                        type="text"
                        className="form-control datetimepicker-input"
                        placeholder="Check in"
                        data-target="#date1"
                        data-toggle="datetimepicker"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div
                      className="date"
                      id="date2"
                      data-target-input="nearest"
                    >
                      <input
                        type="text"
                        className="form-control datetimepicker-input"
                        placeholder="Check out"
                        data-target="#date2"
                        data-toggle="datetimepicker"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <select className="form-select">
                      <option selected>Adult</option>
                      <option value="1">Adult 1</option>
                      <option value="2">Adult 2</option>
                      <option value="3">Adult 3</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select className="form-select">
                      <option selected>Child</option>
                      <option value="1">Child 1</option>
                      <option value="2">Child 2</option>
                      <option value="3">Child 3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary w-100">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <!-- Booking End -->


        <!-- Booking Start --> */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">
              Room Booking
            </h6>
            <h1 className="mb-5">
              Book Link{" "}
              <span className="text-primary text-uppercase">Luxury Room</span>
            </h1>
          </div>
          <div className="row g-5">
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
            <div className="col-lg-6">
              <div className="wow fadeInUp" data-wow-delay="0.2s">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                        />
                        <label for="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Your Email"
                        />
                        <label for="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="form-floating date"
                        id="date3"
                        data-target-input="nearest"
                      >
                        <input
                          type="text"
                          className="form-control datetimepicker-input"
                          id="checkin"
                          placeholder="Check In"
                          data-target="#date3"
                          data-toggle="datetimepicker"
                        />
                        <label for="checkin">Check In</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="form-floating date"
                        id="date4"
                        data-target-input="nearest"
                      >
                        <input
                          type="text"
                          className="form-control datetimepicker-input"
                          id="checkout"
                          placeholder="Check Out"
                          data-target="#date4"
                          data-toggle="datetimepicker"
                        />
                        <label for="checkout">Check Out</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select className="form-select" id="select1">
                          <option value="1">Adult 1</option>
                          <option value="2">Adult 2</option>
                          <option value="3">Adult 3</option>
                        </select>
                        <label for="select1">Select Adult</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select className="form-select" id="select2">
                          <option value="1">Child 1</option>
                          <option value="2">Child 2</option>
                          <option value="3">Child 3</option>
                        </select>
                        <label for="select2">Select Child</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <select className="form-select" id="select3">
                          <option value="1">Room 1</option>
                          <option value="2">Room 2</option>
                          <option value="3">Room 3</option>
                        </select>
                        <label for="select3">Select Link Room</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Special Request"
                          id="message"
                          style={{height:'100px'}}
                        ></textarea>
                        <label for="message">Special Request</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Booking End --> */}
      <NewLetter/>
      <Footer/>
    </div>
  );
}

export default Booking;
