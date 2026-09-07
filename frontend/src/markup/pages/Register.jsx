import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");
    console.log("Register submitted with:", formData);
    // የ Register API / Backend request እዚህ ይፃፋል
  };

  return (
    <>
  <Header/>
    <div className=" min-vh-100 d-flex flex-column justify-content-between">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-7">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    
                    {/* Header Section with Hotel Title */}
                    <div className="card-header text-center py-4 bg-white border-bottom-0">
                      <h2 className="text-warning text-uppercase fw-bold m-0">
                        Diamond <span className="text-dark">Hotel</span>
                      </h2>
                      <p className="text-muted small mt-1 mb-0">
                        Create an account to book rooms and manage your reservations.
                      </p>
                    </div>

                    <div className="card-body px-4 py-3">
                      {error && (
                        <div className="alert alert-danger p-2 small text-center" role="alert">
                          {error}
                        </div>
                      )}

                      <form onSubmit={handleSubmit}>
                        
                        {/* First Name & Last Name */}
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <div className="form-floating mb-3 mb-md-0">
                              <input
                                className="form-control"
                                id="firstName"
                                type="text"
                                placeholder="Enter your first name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                              />
                              <label htmlFor="firstName">First name</label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-floating">
                              <input
                                className="form-control"
                                id="lastName"
                                type="text"
                                placeholder="Enter your last name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                              />
                              <label htmlFor="lastName">Last name</label>
                            </div>
                          </div>
                        </div>

                        {/* Email Address */}
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="email">Email address</label>
                        </div>

                        {/* Phone Number (ለሆቴል ተበጅቶ የተጨመረ) */}
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            id="phoneNumber"
                            type="tel"
                            placeholder="+251..."
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="phoneNumber">Phone Number (+251...)</label>
                        </div>

                        {/* Password & Confirm Password */}
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <div className="form-floating mb-3 mb-md-0">
                              <input
                                className="form-control"
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                              />
                              <label htmlFor="password">Password</label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-floating mb-3 mb-md-0">
                              <input
                                className="form-control"
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                              />
                              <label htmlFor="confirmPassword">Confirm Password</label>
                            </div>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4 mb-0">
                          <div className="d-grid">
                            <button type="submit" className="btn btn-warning text-white fw-bold btn-block py-3">
                              Create Account
                            </button>
                          </div>
                        </div>

                      </form>
                    </div>

                    {/* Footer Section - Login Link */}
                    <div className="card-footer text-center py-3 bg-light border-top-0">
                      <div className="small">
                        Have an account?{" "}
                        <Link to="/login" className="text-warning fw-bold text-decoration-none">
                          Go to login
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className="py-3 bg-light mt-auto">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between small text-muted">
            <div>Copyright &copy; Diamond Hotel {new Date().getFullYear()}</div>
            <div>
              <Link to="/privacy" className="text-muted text-decoration-none me-2">Privacy Policy</Link>
              &middot;
              <Link to="/terms" className="text-muted text-decoration-none ms-2">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

export default Register;