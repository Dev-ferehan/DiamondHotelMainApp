

-- 6juJj3anlfrMbc5I




-- PostgreSQL / Standard SQL Dialect

-- -----------------------------------------------------
-- 1. GUESTS & LOYALTY
-- -----------------------------------------------------
CREATE TABLE guests (
    guest_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    nationality VARCHAR(50),
    passport_number VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loyalty_programs (
    loyalty_id SERIAL PRIMARY KEY,
    guest_id INT UNIQUE NOT NULL REFERENCES guests(guest_id) ON DELETE CASCADE,
    membership_status VARCHAR(50) DEFAULT 'Standard', -- e.g. Platinum Member
    tier_level VARCHAR(50) DEFAULT 'Regular',          -- e.g. Elite
    points_balance INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- 2. ROOM TYPES & ATTRIBUTES (Normalized)
-- -----------------------------------------------------
CREATE TABLE room_types (
    room_type_id VARCHAR(50) PRIMARY KEY, -- e.g. 'room_type_01'
    name VARCHAR(100) NOT NULL,            -- e.g. 'Deluxe Room'
    price_per_night DECIMAL(10, 2) NOT NULL,
    short_description TEXT,
    description TEXT,
    size VARCHAR(20),                      -- e.g. '35 m²'
    bed_type VARCHAR(50),                  -- e.g. 'King Bed'
    capacity INT DEFAULT 2,
    total_rooms INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE room_images (
    image_id SERIAL PRIMARY KEY,
    room_type_id VARCHAR(50) NOT NULL REFERENCES room_types(room_type_id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_cover BOOLEAN DEFAULT FALSE
);

CREATE TABLE room_features (
    feature_id SERIAL PRIMARY KEY,
    feature_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE room_type_features (
    room_type_id VARCHAR(50) REFERENCES room_types(room_type_id) ON DELETE CASCADE,
    feature_id INT REFERENCES room_features(feature_id) ON DELETE CASCADE,
    PRIMARY KEY (room_type_id, feature_id)
);

CREATE TABLE facilities (
    facility_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50) -- e.g. 'wifi', 'safe'
);

CREATE TABLE room_type_facilities (
    room_type_id VARCHAR(50) REFERENCES room_types(room_type_id) ON DELETE CASCADE,
    facility_id INT REFERENCES facilities(facility_id) ON DELETE CASCADE,
    PRIMARY KEY (room_type_id, facility_id)
);

CREATE TABLE amenities (
    amenity_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE room_type_amenities (
    room_type_id VARCHAR(50) REFERENCES room_types(room_type_id) ON DELETE CASCADE,
    amenity_id INT REFERENCES amenities(amenity_id) ON DELETE CASCADE,
    PRIMARY KEY (room_type_id, amenity_id)
);

-- -----------------------------------------------------
-- 3. INDIVIDUAL ROOMS & HOUSEKEEPING
-- -----------------------------------------------------
CREATE TABLE rooms (
    room_id VARCHAR(50) PRIMARY KEY,      -- e.g. 'hk_101'
    room_number VARCHAR(20) NOT NULL UNIQUE, -- e.g. 'Room 101'
    room_type_id VARCHAR(50) NOT NULL REFERENCES room_types(room_type_id),
    floor VARCHAR(10) NOT NULL,            -- e.g. '1st'
    housekeeping_status VARCHAR(50) DEFAULT 'Needs Cleaning', -- 'Needs Cleaning', 'Cleaning in Progress', 'Ready'
    priority VARCHAR(20) DEFAULT 'Low',    -- 'High', 'Medium', 'Low'
    notes TEXT
);

-- -----------------------------------------------------
-- 4. RESERVATIONS & BOOKINGS
-- -----------------------------------------------------
CREATE TABLE reservations (
    reservation_id VARCHAR(50) PRIMARY KEY, -- e.g. 'RES-12345' / 'LG-B00109'
    guest_id INT NOT NULL REFERENCES guests(guest_id) ON DELETE RESTRICT,
    room_id VARCHAR(50) REFERENCES rooms(room_id),
    room_type_id VARCHAR(50) NOT NULL REFERENCES room_types(room_type_id),
    check_in TIMESTAMP NOT NULL,
    check_out TIMESTAMP NOT NULL,
    guests_count INT DEFAULT 1,
    reservation_status VARCHAR(50) DEFAULT 'Reserved', -- 'Reserved', 'Checked-In', 'Checked-Out', 'Cancelled'
    cancellation_reason TEXT,
    notes TEXT,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE price_summaries (
    summary_id SERIAL PRIMARY KEY,
    reservation_id VARCHAR(50) UNIQUE NOT NULL REFERENCES reservations(reservation_id) ON DELETE CASCADE,
    payment_status VARCHAR(20) DEFAULT 'Pending', -- 'Paid', 'Pending'
    currency VARCHAR(10) DEFAULT 'USD',
    room_and_offer DECIMAL(10, 2) NOT NULL,
    extras DECIMAL(10, 2) DEFAULT 0.00,
    vat_amount DECIMAL(10, 2) DEFAULT 0.00,
    city_tax DECIMAL(10, 2) DEFAULT 0.00,
    total_price DECIMAL(10, 2) NOT NULL
);

-- -----------------------------------------------------
-- 5. INVENTORY MANAGEMENT
-- -----------------------------------------------------
CREATE TABLE inventory_categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE -- e.g. 'Linen', 'Toiletries', 'Refreshments'
);

CREATE TABLE inventory_items (
    item_id VARCHAR(50) PRIMARY KEY, -- e.g. 'inv_101'
    item_name VARCHAR(150) NOT NULL,
    category_id INT NOT NULL REFERENCES inventory_categories(category_id),
    image_url TEXT,
    quantity_in_stock INT NOT NULL DEFAULT 0,
    quantity_in_reorder INT NOT NULL DEFAULT 0,
    unit_price DECIMAL(10, 2),
    supplier VARCHAR(150),
    availability VARCHAR(30) GENERATED ALWAYS AS (
        CASE 
            WHEN quantity_in_stock = 0 THEN 'Out of Stock'
            WHEN quantity_in_stock <= 20 THEN 'Low'
            ELSE 'Available'
        END
    ) STORED,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reorders (
    reorder_id VARCHAR(50) PRIMARY KEY, -- e.g. 'ord_9901'
    item_id VARCHAR(50) NOT NULL REFERENCES inventory_items(item_id) ON DELETE CASCADE,
    requested_quantity INT NOT NULL,
    notes TEXT,
    status VARCHAR(30) DEFAULT 'Pending', -- 'Pending', 'Approved', 'Completed'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);










-- GET /api/v1/reservations/{reservation_id}



SELECT 
    r.reservation_id,
    g.nationality, g.passport_number,
    lp.membership_status, lp.tier_level, lp.points_balance,
    r.notes,
    rt.name AS room_type, rt.size, rt.bed_type, rt.capacity AS max_guests,
    ri.image_url,
    ps.payment_status, ps.currency, ps.room_and_offer, ps.extras, ps.vat_amount, ps.city_tax, ps.total_price
FROM reservations r
JOIN guests g ON r.guest_id = g.guest_id
LEFT JOIN loyalty_programs lp ON g.guest_id = lp.guest_id
JOIN room_types rt ON r.room_type_id = rt.room_type_id
LEFT JOIN room_images ri ON rt.room_type_id = ri.room_type_id AND ri.is_cover = TRUE
JOIN price_summaries ps ON r.reservation_id = ps.reservation_id
WHERE r.reservation_id = 'RES-12345';

-- GET /api/v1/housekeeping (Search & Filter)

SELECT 
    rm.room_id AS id,
    rm.room_number,
    rt.name AS room_type,
    rm.housekeeping_status,
    rm.priority,
    rm.floor,
    COALESCE(res.reservation_status, 'Vacant') AS reservation_status,
    rm.notes
FROM rooms rm
JOIN room_types rt ON rm.room_type_id = rt.room_type_id
LEFT JOIN reservations res ON rm.room_id = res.room_id AND res.reservation_status IN ('Checked-In', 'Reserved')
WHERE 
    (:search IS NULL OR rm.room_number ILIKE '%' || :search || '%' OR rm.floor ILIKE '%' || :search || '%')
    AND (:room_type IS NULL OR rt.name = :room_type)
    AND (:housekeeping_status IS NULL OR rm.housekeeping_status = :housekeeping_status)
    AND (:priority IS NULL OR rm.priority = :priority)
ORDER BY rm.room_number ASC;

-- GET /api/v1/inventory (With Categories)

SELECT 
    i.item_id AS id,
    i.item_name,
    c.name AS category,
    i.image_url,
    i.availability,
    i.quantity_in_stock,
    i.quantity_in_reorder
FROM inventory_items i
JOIN inventory_categories c ON i.category_id = c.category_id
WHERE (:category IS NULL OR c.name = :category)
  AND (:search IS NULL OR i.item_name ILIKE '%' || :search || '%')
ORDER BY i.last_updated DESC
LIMIT :limit OFFSET :offset;

-- Indexes for Performance Efficiency


-- በብዛት ለሚፈለጉና Filter ለሚደረጉ Columnዎች የተሰሩ Indexዎች
CREATE INDEX idx_reservations_guest ON reservations(guest_id);
CREATE INDEX idx_reservations_status ON reservations(reservation_status);
CREATE INDEX idx_rooms_housekeeping ON rooms(housekeeping_status, priority);
CREATE INDEX idx_inventory_search ON inventory_items(item_name, category_id);
