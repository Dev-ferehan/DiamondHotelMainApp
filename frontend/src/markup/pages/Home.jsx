import React,{ useEffect } from "react";
// import style from "../src/assets/css/style.css";
// import "../src/assets/css/bootstrap.min.css";
// import testimonial1 from '../../../../assets/img/testimonial-1.jpg';
import testimonial1 from '../../assets/img/testimonial-1.jpg'
import testimonial2 from '../../assets/img/testimonial-2.jpg';
import testimonial3 from '../../assets/img/testimonial-3.jpg';

import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import NewLetter from "../components/NewLetter/NewLetter";
import Footer from "../components/Footer/Footer";
import About from "../components/About/About";
import Room from "../components/Room/Room";
import Services from "../components/Services/Services";
function Home() {
  useEffect(() => {
    // 1. WOW.js 
    if (window.WOW) {
      new window.WOW().init();
    }

 
    if (window.$ && window.$.fn.owlCarousel) {
      window.$('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 20,
        dots: false,
        loop: true,
        nav: true,
        responsive: {
          0: { items: 1 },
          768: { items: 2 },
          992: { items: 3 }
        }
      });
    }
  }, []);
  return (
    <div className="container-xxl bg-white p-0">
      <div className="container-xxl bg-white p-0">
        <Header />
        {/* <!-- Carousel Start --> */}
        <div className="container-fluid p-0 mb-5">
          <div
            id="header-carousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
              <div style={{ width: '100%', height: '500px', my: '20px' }}>
<iframe
src="https://app.cloudpano.com/tours/F_bT4A587K?controls=0"
width="100%"
height="95%"
style={{ border: 'none' }}
title="360 Hotel Virtual Tour"
allowFullScreen
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
></iframe>
    </div>
            

                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{maxWidth: '700px'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Carousel End --> */}
        <About/>
        <Room/>
        {/* <!-- Video Start --> */}
      <div className="container-xxl py-5 px-0 wow zoomIn" data-wow-delay="0.1s">
        <div className="row g-0">
          <div className="col-md-6 bg-dark d-flex align-items-center">
            <div className="p-5">
              <h6 className="section-title text-start text-white text-uppercase mb-3">
                Luxury Living
              </h6>
              <h1 className="text-white mb-4">Discover Diamond Luxury Hotel</h1>
              <p className="text-white mb-4">
                Experience comfort, elegance, and exceptional hospitality at
                Diamond Luxury Hotel. Enjoy beautifully designed rooms, quality
                service, delicious dining, and a relaxing stay in a welcoming
                atmosphere.
              </p>
              <Link to="" className="btn btn-primary py-md-3 px-md-5 me-3">
                Our Rooms
              </Link>
              <Link href="" className="btn btn-light py-md-3 px-md-5">
                Book A Room
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="video">
              <button
                type="button"
                className="btn-play"
                data-bs-toggle="modal"
                data-src="https://www.youtube.com/embed/DWRcNpR6Kdc"
                data-bs-target="#videoModal"
              >
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="videoModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Youtube Video
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* <!-- 16:9 aspect ratio --> */}
              <div className="ratio ratio-16x9">
                <iframe
                  className="embed-responsive-item"
                  src=""
                  id="video"
                  allowfullscreen
                  allowscriptaccess="always"
                  allow="autoplay"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Video end --> */}

      <Services/>
      
      {/* <!-- Testimonial Start --> */}
      <div id="testimonial-section"
        className="container-xxl testimonial my-5 py-5 bg-dark wow zoomIn"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div className="owl-carousel testimonial-carousel py-5">
            <div className="testimonial-item position-relative bg-white rounded overflow-hidden">
              <p>
                Staying at Diamond Hotel was an incredible experience. the
                customer service was exceptional Highly recommended for anyone
                visiting Dessie!
              </p>
              <div className="d-flex align-items-center">
                <img
                  className="img-fluid flex-shrink-0 rounded"
                  src={testimonial1}
                  style={{width:' 45px', height: '45px'}}
                />
                <div className="ps-3">
                  <h6 className="fw-bold mb-1">Sara Alemu</h6>
                  <small>Event Planner</small>
                </div>
              </div>
              <i className="fa fa-quote-right fa-3x text-primary position-absolute end-0 bottom-0 me-4 mb-n1"></i>
            </div>
            <div className="testimonial-item position-relative bg-white rounded overflow-hidden">
              <p>
                The staff went above and beyond to make our family stay
                comfortable fast Wi-Fi, and very secure environment. It truly
                felt like a home away from home
              </p>
              <div className="d-flex align-items-center">
                <img
                  className="img-fluid flex-shrink-0 rounded"
                  src={testimonial2}
                  style={{width: '45px', height: '45px'}}
                />
                <div className="ps-3">
                  <h6 className="fw-bold mb-1">Michael Bekele</h6>
                  <small>Business Traveler</small>
                </div>
              </div>
              <i className="fa fa-quote-right fa-3x text-primary position-absolute end-0 bottom-0 me-4 mb-n1"></i>
            </div>
            <div className="testimonial-item position-relative bg-white rounded overflow-hidden">
              <p>
                Excellent hotel with modern amenities. The conference hall
                facilities and catering service for our corporate meeting were
                flawless. Will definitely return!
              </p>
              <div className="d-flex align-items-center">
                <img
                  className="img-fluid flex-shrink-0 rounded"
                  src={testimonial3}
                  style={{width: '45px', height: '45px'}}
                />
                <div className="ps-3">
                  <h6 className="fw-bold mb-1">Dawit Tadesse</h6>
                  <small>Software Engineer</small>
                </div>
              </div>
              <i className="fa fa-quote-right fa-3x text-primary position-absolute end-0 bottom-0 me-4 mb-n1"></i>
            </div>
          </div>
        </div>
      </div>
        <NewLetter />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
