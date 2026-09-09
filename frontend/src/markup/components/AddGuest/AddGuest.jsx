import React, { useState } from "react";
import styles from "./addGuest.module.css";
import { addGuest } from "../../../services/Reservation.service";
import { Link } from "react-router-dom";

function AddGuest() {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    bookingStatus: "",
    gender: "",
    nationality: "",
    idType: "",
    idNumber: "",
    idAttachment: [],
    roomType: "",
    roomNumber: "",
    checkIn: "",
    checkOut: "",
    guestsCount: "",
    paymentStatus: "",
    paymentMethod: "",
    totalAmount: "",
    notes: "",
  });



  const submitForm = async (e) => {
    e.preventDefault();
    try {
      let uploadedAttachments = [];

      if (frontImage || backImage) {
        const uploadFormData = new FormData();
        if (frontImage) uploadFormData.append("images", frontImage);
        if (backImage) uploadFormData.append("images", backImage);

        console.log("Uploading ID images...");
        const uploadResponse = await fetch(
          "http://localhost:8000/api/upload",
          {
            method: "POST",
            body: uploadFormData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Image upload failed");
        }

        const uploadData = await uploadResponse.json();
        console.log("Upload response:", uploadData);

        if (!uploadData.success) {
          throw new Error(uploadData.message || "Image upload failed");
        }

        uploadedAttachments = uploadData.images.map((image) => ({
          image_url: image.image_url,
        }));
      }

      const finalFormData = {
        ...formData,
        idAttachment: uploadedAttachments,
      };

      console.log("Submitting Add Guest Form Data:", finalFormData);
      const result = await addGuest(finalFormData);
      console.log("Guest saved successfully:", result);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <>
      {/* Modal Container */}
      <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
          {/* Modal Header */}
          <div className={styles.modalHeader}>
            <div>
              <h2>Add New Guest</h2>
              <p>
                Enter guest details, ID verification, and booking information.
              </p>
            </div>
            <Link to="/reservation" className={styles.closeBtn}>
              &times;
            </Link>
          </div>

          {/* Modal Body / Form */}
          <form className={styles.guestForm} onSubmit={submitForm}>
            {/* SECTION 1: Personal & Identity Info */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <i className="fa-solid fa-user"></i> Guest Identity & Personal
                Info
              </h3>

              <div className={styles.formGrid}>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    type="text"
                    id="fullName"
                    placeholder="e.g. Angus Copper"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    type="tel"
                    id="phone"
                    placeholder="+251 912 345 678"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    type="email"
                    id="email"
                    placeholder="guest@example.com"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="bookingStatus">Booking Status</label>
                  <select
                    id="bookingStatus"
                    required
                    defaultValue="Confirmed"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bookingStatus: e.target.value,
                      })
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Checked In">Checked In</option>
                    <option value="Checked Out">Checked Out</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="gender">Gender *</label>
                  <select
                    id="gender"
                    defaultValue=""
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="nationality">Nationality *</label>
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, nationality: e.target.value })
                    }
                    type="text"
                    id="nationality"
                    placeholder="e.g. Ethiopian, American"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="idType">ID Document Type *</label>
                  <select
                    id="idType"
                    required
                    defaultValue="Fayda ID"
                    onChange={(e) =>
                      setFormData({ ...formData, idType: e.target.value })
                    }
                  >
                    <option value="Fayda ID">Fayda / Digital ID</option>
                    <option value="Passport">Passport</option>
                    <option value="Kebele ID">Kebele ID</option>
                    <option value="Driver License">Driver's License</option>
                  </select>
                </div>

                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label htmlFor="idNumber">ID / Passport Number *</label>
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, idNumber: e.target.value })
                    }
                    type="text"
                    id="idNumber"
                    placeholder="Enter ID/Passport Number"
                    required
                  />
                </div>

                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label>Upload ID Attachments (Front & Back)</label>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "15px",
                      marginTop: "8px",
                    }}
                  >
                    {/* Front Photo */}
                    <div className={styles.fileUploadBox}>
                      <i
                        className={`fa-solid fa-id-card ${styles.uploadIcon}`}
                      ></i>
                      <p>
                        {frontImage
                          ? `Selected: ${frontImage.name}`
                          : "Upload Front Side Photo"}
                      </p>
                      <span>JPG, PNG (Max 5MB)</span>
                      <input
                        onChange={(e) => setFrontImage(e.target.files[0])}
                        type="file"
                        accept="image/*"
                      />
                    </div>

                    {/* Back Photo */}
                    <div className={styles.fileUploadBox}>
                      <i
                        className={`fa-solid fa-id-card ${styles.uploadIcon}`}
                      ></i>
                      <p>
                        {backImage
                          ? `Selected: ${backImage.name}`
                          : "Upload Back Side Photo"}
                      </p>
                      <span>JPG, PNG (Max 5MB)</span>
                      <input
                        onChange={(e) => setBackImage(e.target.files[0])}
                        type="file"
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: Booking Details */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <i className="fa-solid fa-bed"></i> Booking Details
              </h3>

              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label htmlFor="roomType">Room Type *</label>
                  <select
                    id="roomType"
                    required
                    defaultValue="Deluxe"
                    onChange={(e) =>
                      setFormData({ ...formData, roomType: e.target.value })
                    }
                  >
                    <option value="Deluxe">Deluxe Room</option>
                    <option value="Standard Room">Standard Room</option>
                    <option value="Suite">Executive Suite</option>
                    <option value="Family Room">Family Room</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="roomNumber">Room Number *</label>
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, roomNumber: e.target.value })
                    }
                    type="text"
                    id="roomNumber"
                    placeholder="e.g. Room 101"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="checkIn">Check-In Date & Time *</label>
                  <input
                    type="datetime-local"
                    id="checkIn"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, checkIn: e.target.value })
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="checkOut">Check-Out Date & Time *</label>
                  <input
                    type="datetime-local"
                    id="checkOut"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, checkOut: e.target.value })
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="guestsCount">Guests </label>
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, guestsCount: e.target.value })
                    }
                    type="number"
                    id="guestsCount"
                    min="1"
                    defaultValue="1"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="paymentStatus">Payment Status *</label>
                  <select
                    id="paymentStatus"
                    required
                    defaultValue="Paid"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentStatus: e.target.value,
                      })
                    }
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Partially Paid">Partially Paid</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="paymentMethod">Payment Method </label>
                  <select
                    id="paymentMethod"
                    required
                    defaultValue="Card"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentMethod: e.target.value,
                      })
                    }
                  >
                    <option value="Card">Card</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="total_amount">Total Amount </label>
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, totalAmount: e.target.value })
                    }
                    type="number"
                    id="total_amount"
                    required
                  />
                </div>

                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label htmlFor="notes">Special Notes / Requests</label>
                  <textarea
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    id="notes"
                    rows="3"
                    placeholder="e.g. Guest requested extra pillows and towels."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={styles.modalFooter}>
              <Link
                to="/reservation"
                className={`${styles.btn} ${styles.btnSecondary}`}
              >
                Cancel
              </Link>
              <button
                type="submit"
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Save Guest
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddGuest;