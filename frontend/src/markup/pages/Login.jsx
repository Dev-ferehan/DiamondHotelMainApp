import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Security & Loading States
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    setSuccessMessage("");

    const cleanEmail = formData.email.trim();
    const cleanPassword = formData.password.trim();

    if (!cleanEmail || !cleanPassword) {
      setErrorMessage("Invalid email/username or password.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          password: cleanPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || "Invalid email/username or password.");
        return;
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
      }


      setSuccessMessage(data.message || "Login Successful!");

      const userRole = data.user?.role?.toLowerCase();

      setTimeout(() => {
        if (userRole === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/receptionist/dashboard");
        }
      }, 1500);

    } catch (error) {
      setErrorMessage("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="min-vh-100 d-flex flex-column justify-content-between">
        <div id="layoutAuthentication">
          <div id="layoutAuthentication_content">
            <main>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-5">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                      
                      {/* Header Section */}
                      <div className="card-header text-center py-4 bg-white border-bottom-0">
                        <h2 className="text-warning text-uppercase fw-bold m-0">
                          Diamond <span className="text-dark">Hotel</span>
                        </h2>
                        <p className="text-muted small mt-1 mb-0">
                          Welcome back! Please login to your account.
                        </p>
                      </div>

                      <div className="card-body px-4 py-3">

                 
                        {errorMessage && (
                          <div className="alert alert-danger p-2 small text-center mb-3" role="alert">
                            {errorMessage}
                          </div>
                        )}

                     
                        {successMessage && (
                          <div className="alert alert-success p-2 small text-center mb-3" role="alert">
                            {successMessage}
                          </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate>
                          
                          {/* Email Input */}
                          <div className="form-floating mb-3">
                            <input
                              className="form-control"
                              id="email"
                              type="text" 
                              placeholder="Email Address or Username"
                              value={formData.email}
                              onChange={handleChange}
                              autoComplete="username"
                              maxLength={150}
                              required
                            />
                            <label htmlFor="email">Email Address or Username</label>
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
                              autoComplete="current-password" 
                              required
                            />
                            <label htmlFor="password">Password</label>
                          </div>

                          {/* Forgot Password & Submit Button */}
                          <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                            <Link className="small text-decoration-none text-muted" to="/forgot-password">
                              Forgot Password?
                            </Link>

                            <button 
                              type="submit" 
                              className="btn btn-warning text-white fw-bold px-4 py-2 d-flex align-items-center gap-2"
                              disabled={loading}
                            >
                              {loading ? (
                                <>
                                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                  Logging in...
                                </>
                              ) : (
                                "Login"
                              )}
                            </button>
                          </div>

                        </form>
                      </div>

                      {/* Footer Section */}
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
    </>
  );
}

export default Login;