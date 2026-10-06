import React, { useState, useEffect } from "react";
import styles from "./editRoom.module.css";
import { Link } from "react-router-dom";
import {getRoomTypeService} from '../../../services/RoomService.js'
const EditRoom = ({ isOpen = true, onClose, initialData, onRoomUpdated }) => {
  const [error, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [existingData, setExistingData] = useState({});

  // ID mappings
  const featureIdMap = {
    privateBalcony: 1,
    DedicatedWorkDesk: 2,
    spaciousLayout: 3,
    CityViewOceanViewGardenView: 4,
    TerraceBalcony: 5,
  };

  const facilityIdMap = {
    wifi: 1,
    MiniFridgeMiniBar: 2,
    airConditioning: 3,
    Hairdryer: 4,
    ElectronicKeyCardLock: 5,
    DirectDialTelephone: 6,
  };

  const amenityIdMap = {
    complimentaryWater: 1,
    toiletries: 2,
    bathrobes: 3,
    LaundryDryCleaningServiceAccess: 4,
  };

  // Form State
  const [formData, setFormData] = useState({
    room_id: "",
    room_type: "Deluxe Room",
    room_type_id: 1,
    room_number: "",
    price_per_night: "",
    status: "Available",
    total_rooms: "1",
    size_m2: "",
    bed_type: "king",
    max_guests: 2,
    title: "",
    short_description: "",
    full_description: "",
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

  const [existingImages, setExistingImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(async() => {
    const result=await getRoomTypeService()
    console.log("99999999999999999",result.rooms[0]
      )
    setExistingData({
      room_id: result.rooms[0].
      room_id,
      room_type: result.rooms[0].
      room_type,
      room_type_id: result.rooms[0].room_type_id,
      room_number: result.rooms[0].room_number,
      price_per_night: result.rooms[0].
      price_per_night,
      status:  result.rooms[0].room_status,
      total_rooms:  result.rooms[0].total_rooms,
      size_m2:  result.rooms[0].size_m2,
      bed_type:  result.rooms[0].bed_type,
      max_guests:  result.rooms[0].max_guests,
   
      short_description: result.rooms[0].short_description,
      full_description: result.rooms[0].full_description,
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
      }
    });
    if (initialData) {
      const mappedFeatures = { ...formData.features };
      const mappedFacilities = { ...formData.facilities };
      const mappedAmenities = { ...formData.amenities };

      if (initialData.feature_ids) {
        Object.keys(featureIdMap).forEach((key) => {
          if (initialData.feature_ids.includes(featureIdMap[key])) {
            mappedFeatures[key] = true;
          }
        });
      }

      if (initialData.facility_ids) {
        Object.keys(facilityIdMap).forEach((key) => {
          if (initialData.facility_ids.includes(facilityIdMap[key])) {
            mappedFacilities[key] = true;
          }
        });
      }

      if (initialData.amenity_ids) {
        Object.keys(amenityIdMap).forEach((key) => {
          if (initialData.amenity_ids.includes(amenityIdMap[key])) {
            mappedAmenities[key] = true;
          }
        });
      }

      setFormData({
        room_id: initialData.room_id || initialData.id || "",
        room_type: initialData.room_type || "Deluxe Room",
        room_type_id: initialData.room_type_id || 1,
        room_number: initialData.room_number || "",
        price_per_night: initialData.price_per_night || "",
        status: initialData.status || "Available",
        total_rooms: initialData.total_rooms || "1",
        size_m2: initialData.size_m2 || "",
        bed_type: initialData.bed_type || "king",
        max_guests: initialData.max_guests || 2,
        title: initialData.title || initialData.short_description || "",
        short_description: initialData.short_description || "",
        full_description: initialData.full_description || "",
        feature_ids: initialData.feature_ids || [],
        facility_ids: initialData.facility_ids || [],
        amenity_ids: initialData.amenity_ids || [],
        features: mappedFeatures,
        facilities: mappedFacilities,
        amenities: mappedAmenities,
      });

      if (initialData.images && Array.isArray(initialData.images)) {
        setExistingImages(initialData.images);
      }
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (error[id]) {
      setErrors((prev) => ({ ...prev, [id]: null }));
    }
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
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

  // Image Management (Pure Front-End Preview)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const currentTotal = existingImages.length + selectedImages.length;
    const remainingSlots = 4 - currentTotal;
    const selectedFiles = files.slice(0, remainingSlots);

    const newImages = selectedFiles.map((file, index) => ({
      file: file,
      preview: URL.createObjectURL(file),
      is_primary: currentTotal === 0 && index === 0,
    }));

    setSelectedImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNewImage = (index) => {
    setSelectedImages((prev) => {
      const imageToRemove = prev[index];
      if (imageToRemove?.preview) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  // Form Validation
  const validateRoomForm = (data) => {
    const errors = {};
    if (!data.room_number || String(data.room_number).trim() === "") {
      errors.room_number = "Room Number/Name is required";
    }
    if (
      !data.price_per_night ||
      isNaN(data.price_per_night) ||
      Number(data.price_per_night) <= 0
    ) {
      errors.price_per_night = "Base Price/Night must be greater than 0";
    }
    if (!data.size_m2 || isNaN(data.size_m2) || Number(data.size_m2) <= 0) {
      errors.size_m2 = "Room Size must be greater than 0";
    }
    if (!data.bed_type || String(data.bed_type).trim() === "") {
      errors.bed_type = "Bed Type is required";
    }
    if (
      !data.max_guests ||
      isNaN(data.max_guests) ||
      Number(data.max_guests) <= 0
    ) {
      errors.max_guests = "Number of Guests must be greater than 0";
    }

    setErrors(errors);
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  // Submit Handler (Pure Front-End Logic)
  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid } = validateRoomForm(formData);

    if (!isValid) return;

    setIsLoading(true);
    setMessage("");

    try {
      const finalImages = [
        ...existingImages.map((img, idx) => ({
          image_url: typeof img === "string" ? img : img.image_url,
          is_primary: idx === 0,
        })),
        ...selectedImages.map((img, idx) => ({
          image_url: img.preview,
          is_primary: existingImages.length === 0 && idx === 0,
        })),
      ];

      const finalRoomData = {
        ...formData,
        images: finalImages,
      };

      setMessage("Room updated successfully!");

      // Pass the updated object to parent component
      if (onRoomUpdated) {
        onRoomUpdated(finalRoomData);
      }

      setTimeout(() => {
        if (onClose) onClose();
      }, 1000);
    } catch (err) {
      setMessage("Failed to update room.");
    } finally {
      setIsLoading(false);
    }
  };

  const totalImageCount = existingImages.length + selectedImages.length;

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-card"]}>
        <div className={styles["modal-header"]}>
          <h2>Edit Room</h2>
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
              type="number"
              id="room_number"
              placeholder="e.g. 101"
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
            <label htmlFor="status">Availability</label>
            <div className={styles["toggle-container"]}>
              <select
                id="status"
                value={formData.status}
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

            <div className={`${styles["form-group"]} ${styles["full-width"]}`}>
              <label htmlFor="short_description">Title</label>
              <input
                type="text"
                id="short_description"
                placeholder="Enter room title..."
                value={formData.short_description}
                onChange={handleChange}
                style={{ marginBottom: "12px" }}
              />
              <label htmlFor="full_description">Description</label>
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
            {/* Existing Images */}
            {existingImages.map((img, index) => {
              const src = typeof img === "string" ? img : img.image_url;
              return (
                <div
                  key={`existing-${index}`}
                  className={styles["dropzone-preview"]}
                >
                  <img src={src} alt={`Existing Room ${index + 1}`} />
                  <button
                    type="button"
                    className={styles["remove-img-btn"]}
                    onClick={() => handleRemoveExistingImage(index)}
                  >
                    &times;
                  </button>
                  {index === 0 && (
                    <span className={styles["badge-primary"]}>Primary</span>
                  )}
                </div>
              );
            })}

            {/* Newly Selected Images */}
            {selectedImages.map((img, index) => (
              <div key={`new-${index}`} className={styles["dropzone-preview"]}>
                <img src={img.preview} alt={`New Room ${index + 1}`} />
                <button
                  type="button"
                  className={styles["remove-img-btn"]}
                  onClick={() => handleRemoveNewImage(index)}
                >
                  &times;
                </button>
                {existingImages.length === 0 && index === 0 && (
                  <span className={styles["badge-primary"]}>Primary</span>
                )}
              </div>
            ))}

            {totalImageCount < 4 && (
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

          {/* Features, Facilities & Amenities */}
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
                  checked={formData.features.CityViewOceanViewGardenView}
                  onChange={() =>
                    handleCheckboxChange(
                      "features",
                      "CityViewOceanViewGardenView",
                    )
                  }
                />
                City view / Ocean view / Garden view
              </label>
              <label className={styles["checkbox-item"]}>
                <input
                  type="checkbox"
                  checked={formData.features.privateBalcony}
                  onChange={() =>
                    handleCheckboxChange("features", "privateBalcony")
                  }
                />
                Private balcony / Terrace
              </label>
            </div>

            <div>
              <div className={styles["checkbox-column-title"]}>Facilities</div>
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
                  checked={formData.facilities.MiniFridgeMiniBar}
                  onChange={() =>
                    handleCheckboxChange("facilities", "MiniFridgeMiniBar")
                  }
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
                  onChange={() =>
                    handleCheckboxChange("facilities", "Hairdryer")
                  }
                />
                Hairdryer
              </label>
              <label className={styles["checkbox-item"]}>
                <input
                  type="checkbox"
                  checked={formData.facilities.ElectronicKeyCardLock}
                  onChange={() =>
                    handleCheckboxChange("facilities", "ElectronicKeyCardLock")
                  }
                />
                Electronic key card lock
              </label>
              <label className={styles["checkbox-item"]}>
                <input
                  type="checkbox"
                  checked={formData.facilities.DirectDialTelephone}
                  onChange={() =>
                    handleCheckboxChange("facilities", "DirectDialTelephone")
                  }
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
                    handleCheckboxChange(
                      "amenities",
                      "LaundryDryCleaningServiceAccess",
                    )
                  }
                />
                Laundry / Dry cleaning service access
              </label>
            </div>
          </div>

          {message && (
            <div
              style={{
                color: message.includes("Failed") ? "red" : "green",
                padding: "8px",
              }}
            >
              {message}
            </div>
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
              disabled={isLoading}
              className={`${styles.btn} ${styles["btn-confirm"]}`}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoom;
