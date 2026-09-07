import React, { useState } from "react";
import styles from "./addroom.module.css";
import { Link } from "react-router-dom";
import { addRoomService } from "../../../services/RoomService.js";
import axios from "axios";
const AddRoom = ({ isOpen = true, onClose }) => {
  const [error, setErrors] = useState({});

  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    room_type:"deluxe",
    room_type_id: 1,
    room_number: 234,
    price_per_night: 29.0,
    status: "Available",
    total_rooms: "1",
    size_m2: "67",
    bed_type: "king",
    max_guests: 2,
    title: "Deluxe King Room",
    short_description: "ROOM",
    full_description: "",
    images: [],
    feature_ids: [],
    facility_ids: [],
    amenity_ids: [],

    features: {
      privateBalcony: false,
      DedicatedWorkDesk: false,
      spaciousLayout: false,
      CityViewOceanViewGardenView: false,
  


      
    },
    facilities: {
      wifi: false,
      MiniFridgeMiniBar: false,
      airConditioning: false,
      Hairdryer: false,
      ElectronicKeyCardLock: false,
      DirectDialTelephone: false,
    },
    amenities: {
      complimentaryWater: false,
      toiletries: false,
      bathrobes: false,
      LaundryDryCleaningServiceAccess: false,

    },
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };
const featureIdMap = {
  privateBalcony: 1,
  DedicatedWorkDesk: 2,
  spaciousLayout: 3,
  CityViewOceanViewGardenView: 4,
  TerraceBalcony: 5

};

const facilityIdMap = {
  wifi: 1,
  MiniFridgeMiniBar: 2,
  airConditioning: 3,
  Hairdryer: 4,
  ElectronicKeyCardLock: 5,
  DirectDialTelephone: 6
};

const amenityIdMap = {
  complimentaryWater: 1,
  toiletries: 2,
  bathrobes: 3,
  LaundryDryCleaningServiceAccess: 4
};

  const handleCheckboxChange = (category, key) => {
    setFormData((prev) => {
      const updatedCategory = {
        ...prev[category],
        [key]: !prev[category][key],
      };
  
  
      let mapObj = {};
      let idFieldName = "";
  
      if (category === "features") {
        mapObj = featureIdMap;
        idFieldName = "feature_ids";
      } else if (category === "facilities") {
        mapObj = facilityIdMap;
        idFieldName = "facility_ids";
      } else if (category === "amenities") {
        mapObj = amenityIdMap;
        idFieldName = "amenity_ids";
      }
  
  
      const updatedIds = Object.keys(updatedCategory)
        .filter((itemKey) => updatedCategory[itemKey]) 
        .map((itemKey) => mapObj[itemKey])             
        .filter(Boolean);                              
  
      return {
        ...prev,
        [category]: updatedCategory,
        [idFieldName]: updatedIds, 
      };
    });
  };
  if (error[name]) {
    setErrors((prev) => ({ ...prev, [name]: null }));
  }

  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    const remainingSlots = 4 - selectedImages.length;
    const selectedFiles = files.slice(0, remainingSlots);

    const newImages = selectedFiles.map((file, index) => ({
      file: file,
      preview: URL.createObjectURL(file),
      is_primary: selectedImages.length === 0 && index === 0,
    }));

    setSelectedImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prev) => {
      const imageToRemove = prev[index];

      if (imageToRemove?.preview) {
        URL.revokeObjectURL(imageToRemove.preview);
      }

      const updatedImages = prev.filter((_, i) => i !== index);

      // Make first image primary
      if (updatedImages.length > 0) {
        updatedImages[0].is_primary = true;

        updatedImages.forEach((img, i) => {
          if (i !== 0) {
            img.is_primary = false;
          }
        });
      }

      return updatedImages;
    });
  };
  // Validation Function
  const validateRoomForm = (data) => {
    const errors = {};

    //  Room Number check
    if (!data.room_number || String(data.room_number).trim() === "") {
      errors.room_number = "Room Number/Name is required";
    }

    // Base Price/Night check (> 0)
    if (
      !data.price_per_night ||
      isNaN(data.price_per_night) ||
      Number(data.price_per_night) <= 0
    ) {
      errors.price_per_night = "Base Price/Night is must be greater than 0";
    }

    //  Room Size check (> 0)
    if (!data.size_m2 || isNaN(data.size_m2) || Number(data.size_m2) <= 0) {
      errors.size_m2 = "Room Size is must be greater than 0";
    }

    //  Bed Type check
    if (!data.bed_type || data.bed_type.trim() === "") {
      errors.bed_type = "Bed Type is required";
    }

    //  Number of Guests check (> 0)
    if (
      !data.max_guests ||
      isNaN(data.max_guests) ||
      Number(data.max_guests) <= 0
    ) {
      errors.max_guests = "Number of Guests is must be greater than 0";
    }
    setErrors(errors);
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validateRoomForm(formData);

    if (!isValid) {
      console.log("Validation Errors:", errors);
      setErrors(errors);
      return;
    }
    try {
      let uploadedImages = [];

      if (selectedImages.length > 0) {
        const uploadFormData = new FormData();

        selectedImages.forEach((image) => {
          uploadFormData.append("images", image.file);
        });

        console.log("Uploading images...");

        const uploadResponse = await fetch("http://localhost:8000/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Image upload failed");
        }

        const uploadData = await uploadResponse.json();

        console.log("Upload response:", uploadData);

        if (!uploadData.success) {
          throw new Error(uploadData.message || "Image upload failed");
        }

        uploadedImages = uploadData.images.map((image, index) => ({
          image_url: image.image_url,
          is_primary: index === 0,
        }));
      }

      const finalRoomData = {
        ...formData,
        images: uploadedImages,
        feature_ids: formData.feature_ids,
        facility_ids: formData.facility_ids,
        amenity_ids: formData.amenity_ids,
      };

      console.log("Final room data:", finalRoomData);

      // SEND ROOM DATA TO BACKEND

      const response = await addRoomService(finalRoomData);

      console.log("Room response:", response);

      setMessage(response?.message || "Room added successfully!");
    } catch (error) {
      console.error("Error submitting room:", error);

      setMessage(error.message || "Failed to add room.");
    }
  };

  return (
    <>
      <div className={styles["modal-overlay"]}>
        <div className={styles["modal-card"]}>
          <div className={styles["modal-header"]}>
            <h2>Add New Room</h2>

            <Link
              to="/room"
              type="button"
              className={styles["close-btn"]}
              onClick={onClose}
            >
              &times;
            </Link>
          </div>

          <form className={styles["modal-body"]} onSubmit={handleSubmit}>
            {/* Room Information */}
            <div className={styles["section-title"]}>Room Information</div>
            <div className={styles["form-grid"]}>
              <div className={styles["form-group"]}>
                <label htmlFor="room_type">Room Type</label>
                <select
                  id="room_type"
                  value={formData.room_type}
                  onChange={handleChange}
                >
                  <option value="Deluxe Room">Deluxe Room</option>
                  <option value="Standard Room">Standard Room</option>
                  <option value="Suite">Suite</option>
                  <option value="Family Room">Family Room</option>
                </select>
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="price_per_night">Base Price/Night ($)</label>
                <input
                  type="number"
                  id="price_per_night"
                  placeholder="e.g. 150.00"
                  value={formData.price_per_night}
                  onChange={handleChange}
                />
              </div>
            </div>
            {error.price_per_night && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {error.price_per_night}
              </span>
            )}

            <div className={styles["form-group"]}>
              <label htmlFor="room_number">Room Number/Name</label>
              <input
                required
                type="number"
                id="room_number"
                placeholder="e.g. 101A"
                value={formData.room_number}
                onChange={handleChange}
              />
            </div>
            {error.room_number && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {error.room_number}
              </span>
            )}
            <div className={styles["form-group"]}>
              <label>Availability</label>
              <div className={styles["toggle-container"]}>
                <select
                  id="status"
                  checked={formData.status}
                  onChange={handleChange}
                >
                  <option value="Available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
               
                </select>
              </div>

              <div className={styles["form-group"]}>
                <label htmlFor="total_rooms">Total Rooms</label>
                <input
                  type="number"
                  id="total_rooms"
                  value={formData.total_rooms}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Details */}
            <div className={styles["section-title"]}>Details</div>
            <div className={styles["form-grid"]}>
              <div className={styles["form-group"]}>
                <label htmlFor="size_m2">Room Size (m²)</label>
                <input
                  type="number"
                  id="size_m2"
                  placeholder="35"
                  value={formData.size_m2}
                  onChange={handleChange}
                />
              </div>
              {error.size_m2 && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {error.size_m2}
                </span>
              )}

              <div className={styles["form-group"]}>
                <label htmlFor="bed_type">Bed Type</label>
                <select
                  id="bed_type"
                  value={formData.bed_type}
                  onChange={handleChange}
                >
                  <option value="king">King Bed</option>
                  <option value="queen">Queen Bed</option>
                  <option value="twin">Twin Bed</option>
                  <option value="single">Single Bed</option>
                </select>
              </div>
              {error.bed_type && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {error.bed_type}
                </span>
              )}

              <div className={styles["form-group"]}>
                <label htmlFor="max_guests">Number of Guests</label>
                <select
                  id="max_guests"
                  value={formData.max_guests}
                  onChange={handleChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>

              {error.max_guests && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {error.max_guests}
                </span>
              )}

              <div
                className={`${styles["form-group"]} ${styles["full-width"]}`}
              >
                <label htmlFor="short_description">Title</label>
                <input
                  type="text"
                  id="short_description"
                  placeholder="Enter room title..."
                  value={formData.short_description}
                  onChange={handleChange}
                  style={{ marginBottom: "12px" }}
                />
                <label htmlFor="description">Description</label>
                <textarea
                  id="full_description"
                  placeholder="Enter full room description..."
                  value={formData.full_description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* Media Upload */}
            <div className={styles["section-title"]}>Media Upload</div>
            <div className={styles["media-upload-container"]}>
              {selectedImages.map((img, index) => (
                <div key={index} className={styles["dropzone-preview"]}>
                  <img src={img.preview} alt={`Room ${index + 1}`} />

                  <button
                    type="button"
                    className={styles["remove-img-btn"]}
                    onClick={() => handleRemoveImage(index)}
                  >
                    &times;
                  </button>

                  {img.is_primary && (
                    <span className={styles["badge-primary"]}>Primary</span>
                  )}
                </div>
              ))}

              {selectedImages.length < 4 && (
                <label className={styles.dropzone}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <span>+ Upload Photo</span>
                </label>
              )}
            </div>

            <div className={styles["section-title"]}>
              Features, Facilities & Amenities
            </div>
            <div className={styles["checkbox-grid"]}>
              <div>
                <div className={styles["checkbox-column-title"]}>Features</div>
            
                <label className={styles["checkbox-item"]}>
                  <input
                    type="checkbox"
                    checked={formData.features.DedicatedWorkDesk}
                    onChange={() =>
                      handleCheckboxChange("features", "DedicatedWorkDesk")
                    }
                  />
                   Dedicated work desk
                </label>
                <label className={styles["checkbox-item"]}>
                  <input
                    type="checkbox"
                    checked={formData.features.spaciousLayout}
                    onChange={() =>
                      handleCheckboxChange("features", "spaciousLayout")
                    }
                  />
                  Spacious Layout
                </label>
                <label className={styles["checkbox-item"]}>
                  <input
                    type="checkbox"
                    checked={formData.features. CityViewOceanViewGardenView}
                    onChange={() =>
                      handleCheckboxChange("features","CityViewOceanViewGardenView")
                    }
                  />
                City view / Ocean view / Garden view
                </label>
                <label className={styles["checkbox-item"]}>
                  <input
                    type="checkbox"
                    checked={formData.features.  privateBalcony}
                    onChange={() =>
                      handleCheckboxChange("features", "privateBalcony")
                    }
                  />
                Private balcony / Terrace
                </label>
              </div>

              <div>
                <div className={styles["checkbox-column-title"]}>
                  Facilities
                </div>
                <label className={styles["checkbox-item"]}>
                  <input
                    type="checkbox"
                    checked={formData.facilities.wifi}
                    onChange={() => handleCheckboxChange("facilities", "wifi")}
                  />
                High-speed Wi-Fi
                </label>
                <label className={styles["checkbox-item"]}>
                  <input
                    type="checkbox"
                    checked={formData.facilities. MiniFridgeMiniBar}
                    onChange={() => handleCheckboxChange("facilities", "MiniFridgeMiniBar")}
                  />
                Mini-fridge / Mini-bar
                </label>
                <label className={styles["checkbox-item"]}>
                  <input
                    type="checkbox"
                    checked={formData.facilities.airConditioning}
                    onChange={() =>
                      handleCheckboxChange("facilities", "airConditioning")
                    }
                  />
                  Air conditioning
                </label>
                <label className={styles["checkbox-item"]}>
                  <input
                    type="checkbox"
                    checked={formData.facilities.Hairdryer}
                    onChange={() => handleCheckboxChange("facilities", "Hairdryer")}
                  />
                 Hairdryer
                </label>
                <label className={styles["checkbox-item"]}>
                  <input
                    type="checkbox"
                    checked={formData.facilities.ElectronicKeyCardLock}
                    onChange={() => handleCheckboxChange("facilities", "ElectronicKeyCardLock")}
                  />
                Electronic key card lock
                </label>
                <label className={styles["checkbox-item"]}>
                  <input
                    type="checkbox"
                    checked={formData.facilities.DirectDialTelephone}
                    onChange={() => handleCheckboxChange("facilities", "DirectDialTelephone")}
                  />
              Direct-dial telephone
                </label>
              </div>

              <div>
                <div className={styles["checkbox-column-title"]}>Amenities</div>
                <label className={styles["checkbox-item"]}>
                  <input
                    type="checkbox"
                    checked={formData.amenities.complimentaryWater}
                    onChange={() =>
                      handleCheckboxChange("amenities", "complimentaryWater")
                    }
                  />
                 Complimentary bottled water
                </label>
                <label className={styles["checkbox-item"]}>
                  <input
                    type="checkbox"
                    checked={formData.amenities.toiletries}
                    onChange={() =>
                      handleCheckboxChange("amenities", "toiletries")
                    }
                  />
               Luxury toiletries (shampoo, conditioner, body wash)
                </label>
                <label className={styles["checkbox-item"]}>
                  <input
                    type="checkbox"
                    checked={formData.amenities.bathrobes}
                    onChange={() =>
                      handleCheckboxChange("amenities", "bathrobes")
                    }
                  />
              Plush bathrobes & slippers
                </label>
                <label className={styles["checkbox-item"]}>
                  <input
                    type="checkbox"
                    checked={formData.amenities.LaundryDryCleaningServiceAccess}
                    onChange={() =>
                      handleCheckboxChange("amenities", "LaundryDryCleaningServiceAccess")
                    }
                  />
           Laundry / Dry cleaning service access
                </label>
              </div>
            </div>
            {typeof message === "string" && message && (
              <div style={{ color: "green", padding: "8px" }}>{message}</div>
            )}

            <div className={styles["modal-footer"]}>
              <Link
                to="/room"
                type="button"
                className={`${styles.btn} ${styles["btn-cancel"]}`}
                onClick={onClose}
              >
                Cancel
              </Link>
              <button
                type="submit"
                className={`${styles.btn} ${styles["btn-confirm"]}`}
              >
                Confirm & Add Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRoom;
