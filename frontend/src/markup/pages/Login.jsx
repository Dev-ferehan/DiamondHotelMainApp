import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import NewLetter from "../components/NewLetter/NewLetter";

function Login() {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted with:", formData);
    // የ Login API / Backend request እዚህ ይፃፋል
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
                <div className="col-lg-5">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    
                    {/* Header Section with Hotel Title */}
                    <div className="card-header text-center py-4 bg-white border-bottom-0">
                      <h2 className="text-warning text-uppercase fw-bold m-0">
                        Diamond <span className="text-dark">Hotel</span>
                      </h2>
                      <p className="text-muted small mt-1 mb-0">
                        Welcome back! Please login to your account.
                      </p>
                    </div>

                    <div className="card-body px-4 py-3">
                      <form onSubmit={handleSubmit}>
                        
                        {/* Email or Username Input */}
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            id="emailOrUsername"
                            type="text"
                            placeholder="Email or Username"
                            value={formData.emailOrUsername}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="emailOrUsername">Email Address or Username</label>
                        </div>

                        {/* Password Input */}
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="password">Password</label>
                        </div>

                        {/* Remember Password Checkbox */}
                        <div className="form-check mb-3 ms-1">
                          <input
                            className="form-check-input"
                            id="rememberMe"
                            type="checkbox"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                          />
                          <label className="form-check-label text-muted small" htmlFor="rememberMe">
                            Remember Password
                          </label>
                        </div>

                        {/* Forgot Password & Submit Button */}
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <Link className="small text-decoration-none text-muted" to="/forgot-password">
                            Forgot Password?
                          </Link>
                          <button type="submit" className="btn btn-warning text-white fw-bold px-4 py-2">
                            Login
                          </button>
                        </div>

                      </form>
                    </div>

                    {/* Footer Section - Sign Up Link */}
                    <div className="card-footer text-center py-3 bg-light border-top-0">
                      <div className="small">
                        Need a hotel account?{" "}
                        <Link to="/register" className="text-warning fw-bold text-decoration-none">
                          Sign up here!
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
    {/* <NewLetter/> */}
    {/* <Footer/> */}
    </>
  );
}

export default Login;
