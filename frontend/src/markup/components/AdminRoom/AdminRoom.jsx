import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./adminRoom.module.css";

function AdminRoom() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch Rooms Data from Database
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/admin/get-rooms-type",
        );
        const data = response.data.rooms || response.data;

        setRooms(data);

        if (data && data.length > 0) {
          setSelectedRoom(data[0]);
        }
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("error fetching rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-5 text-danger">{error}</div>;
  }
  return (
    <div>
      <div className={styles["main-content"]}>
        {/* Header Section */}
        <div className="d-flex justify-content-end align-items-center mb-3">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
              <img
                src="https://i.pravatar.cc/100?img=12"
                className="rounded-circle"
                width="36"
                height="36"
                alt="Admin"
              />
              <div>
                <div className="fw-bold" style={{ fontSize: "0.85rem" }}>
                  Jaylon Dorwart
                </div>
                <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                  Admin
                </div>
              </div>
            </div>
            <i
              className={`bi bi-gear fs-5 text-muted ${styles["cursor-pointer"]}`}
            ></i>
            <i
              className={`bi bi-bell fs-5 text-muted ${styles["cursor-pointer"]}`}
            ></i>
          </div>
        </div>

        {/* Action Controls */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex gap-2">
            <button
              className={`btn ${styles["btn-filter-dropdown"]} px-3 py-1`}
            >
              Type <i className="bi bi-chevron-down ms-1"></i>
            </button>
          </div>
          <Link
            to="/add-room"
            className={`btn ${styles["btn-lime"]} px-3 py-1 fw-bold`}
            style={{ fontSize: "0.85rem" }}
          >
            + Add Room
          </Link>
        </div>

        {/* Content Layout */}
        <div className="row g-3">
          {/* Left Column - Room List */}
          <div className="col-md-5">
            {rooms.map((room) => {
              const isSelected =
                selectedRoom &&
                room &&
                (selectedRoom.id ?? selectedRoom.room_id) ===
                  (room.id ?? room.room_id);

              return (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={`${styles["room-card"]} ${
                    isSelected ? styles["active"] : ""
                  }`}
                >
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="fw-bold mb-0">{room?.room_type}</h6>
                    <span className={styles[`badge-${room?.room_status}`]}>
                      {room?.room_status}
                    </span>
                  </div>
                  <p
                    className="text-muted mb-2"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {room?.short_description}
                  </p>
                  <div className="fw-bold fs-5 text-dark">
                    ${room?.price_per_night}/Night
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column - Selected Room Details */}
          <div className="col-md-7">
            {selectedRoom ?
              <div className={styles["detail-card"]}>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                      Room Detail
                    </span>
                    <div className="d-flex align-items-center gap-2">
                      <h4 className="fw-bold m-0">{selectedRoom?.room_type}</h4>
                      <span
                        className={styles[`badge-${selectedRoom?.room_status}`]}
                      >
                        {selectedRoom?.room_status}
                      </span>
                    </div>
                    <small className="text-muted">
                      Occupied:{" "}
                      <strong>18/{selectedRoom?.total_rooms} Rooms</strong>
                    </small>
                  </div>
                  <button
                    className={`btn ${styles["btn-lime"]} btn-sm px-3 fw-bold`}
                  >
                    Edit
                  </button>
                </div>

                {/* Image Gallery */}
                {(() => {
                  const imageList =
                    selectedRoom?.images ? selectedRoom.images.split(",") : [];
                  const mainImage = imageList[0]?.trim();

                  return (
                    <div className="row g-2 my-3">
                      <div className="col-9">
                        <img
                          src={
                            mainImage ||
                            "https://via.placeholder.com/600x400?text=No+Image"
                          }
                          className={styles["main-detail-img"]}
                          alt={selectedRoom?.title}
                          style={{
                            width: "100%",
                            height: "250px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      </div>

                      <div className="col-3 d-flex flex-column gap-2">
                        {imageList.slice(1, 4).map((imgUrl, idx) => (
                          <img
                            key={idx}
                            src={imgUrl.trim()}
                            className={styles["sub-detail-img"]}
                            alt={`Sub detail ${idx}`}
                            style={{
                              width: "100%",
                              height: "70px",
                              objectFit: "cover",
                              borderRadius: "6px",
                            }}
                          />
                        ))}

                        <button
                          className={`btn ${styles["btn-lime"]} btn-sm w-100 fw-bold mt-auto`}
                          style={{ fontSize: "0.75rem" }}
                        >
                          View All
                        </button>
                      </div>
                    </div>
                  );
                })()}

                <div
                  className="d-flex gap-4 text-muted mb-3"
                  style={{ fontSize: "0.85rem" }}
                >
                  <span>
                    <i className="bi bi-aspect-ratio me-1"></i>{" "}
                    {selectedRoom?.size_m2} m²
                  </span>
                  <span>
                    <i className="bi bi-border-outer me-1"></i>{" "}
                    {selectedRoom?.bed_type}
                  </span>
                  <span>
                    <i className="bi bi-people me-1"></i>
                    {selectedRoom?.max_guests} guests
                  </span>
                </div>

                <p
                  className="text-muted mb-4"
                  style={{ fontSize: "0.85rem", lineHeight: "1.5" }}
                >
                  {selectedRoom?.full_description}
                </p>

                <h6 className="fw-bold mb-2">Features</h6>
                <div className="row g-2 mb-4">
                  {selectedRoom?.features ?
                    selectedRoom.features
                      .split(/,\r?\n?|\r?\n|,/)
                      .map((feature, index) => {
                        const trimmedFeature = feature.trim();
                        if (!trimmedFeature) return null;

                        return (
                          <div
                            key={index}
                            className={`col-6 ${styles["facility-item"]}`}
                          >
                            <i
                              className={`bi bi-check-circle-fill ${styles["check-icon"]}`}
                            ></i>{" "}
                            {trimmedFeature}
                          </div>
                        );
                      })
                  : null}
                </div>

                <h6 className="fw-bold mb-2">Facilities</h6>
                <div className="row g-2 mb-4">
                  {selectedRoom?.facilities ?
                    selectedRoom.facilities
                      .split(",")
                      .map((facility, index) => {
                        const trimmedFacility = facility.trim();
                        if (!trimmedFacility) return null;

                        return (
                          <div
                            key={index}
                            className={`col-6 ${styles["facility-item"]}`}
                          >
                            <i className="bi bi-check2 text-muted me-1"></i>{" "}
                            {trimmedFacility}
                          </div>
                        );
                      })
                  : null}
                </div>

                <h6 className="fw-bold mb-2">Amenities</h6>
                <div className="row g-2 mb-4">
                  {selectedRoom?.amenities ?
                    selectedRoom.amenities.split(",").map((amenity, index) => {
                      const trimmedAmenity = amenity.trim();
                      if (!trimmedAmenity) return null;

                      return (
                        <div
                          key={index}
                          className={`col-6 ${styles["facility-item"]}`}
                        >
                          <i className="bi bi-star-fill text-warning me-1"></i>{" "}
                          {trimmedAmenity}
                        </div>
                      );
                    })
                  : null}
                </div>
              </div>
            : <div className="text-center p-5 text-muted">empty room!</div>}
          </div>
        </div>

        {/* Footer Section */}
        <div
          className="d-flex justify-content-between align-items-center mt-4 text-muted"
          style={{ fontSize: "0.8rem" }}
        >
          <div>
            <Link to="#" className="text-muted text-decoration-none">
              Privacy Policy
            </Link>{" "}
            &nbsp;|&nbsp;{" "}
            <Link to="#" className="text-muted text-decoration-none">
              Terms and conditions
            </Link>{" "}
            &nbsp;|&nbsp;{" "}
            <Link to="#" className="text-muted text-decoration-none">
              Contact
            </Link>
          </div>
          <div className="d-flex gap-2 fs-6">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-twitter-x"></i>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-youtube"></i>
            <i className="bi bi-linkedin"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRoom;
