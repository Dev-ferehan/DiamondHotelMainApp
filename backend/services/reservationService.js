import query from "../config/db.config.js";
export const addGuestService = async (data) => {
  const {
    fullName,
    phone,
    email,
    bookingStatus,
    gender,
    nationality,
    idType,
    idNumber,
    idAttachment=[],
    totalAmount,
    roomType,
    roomNumber,
    checkIn,
    checkOut,
    guestsCount,
    paymentStatus,
    paymentMethod,

    notes,
  } = data;

  try {
    const addGuestQuery =
      "insert into guests (full_name,id_number ,phone_number,gender,email,nationality) values (?,?,?,?,?,?)";

    const result = await query(addGuestQuery, [
      fullName,
      idNumber,
      phone,
      gender,
      email,
      nationality,
    ]);
    const guestId = result.insertId;
    // console.log("guest first info inserted", guestId);

    const roomTypeQuery = "select id from room_types where room_type=?";
    const [roomTypeResult] = await query(roomTypeQuery, [roomType]);
    console.log("room type result", roomTypeResult, roomType);
    const roomTypeId = roomTypeResult.id;

    if (idAttachment && idAttachment.length > 0) {
      for (const img of idAttachment) {
    const addGuestDocumentsQuery =
      "insert into guest_documents (guest_id,room_type,guests_count,id_type,document_path) values (?,?,?,?,?)";
    await query(addGuestDocumentsQuery, [
      guestId,
      roomTypeId,
      guestsCount,
      idType,
      img.image_url,
    ]);
      }
    }

    console.log("guest second info inserted", guestId);
    // 234
    const roomIdQuery = "select id from rooms where  room_number=?";

    const [roomIdResult] = await query(roomIdQuery, [roomNumber]);
    const roomId = roomIdResult.id;

    const bookingCode = "BK-" + Math.floor(100000 + Math.random() * 900000);
console.log(bookingCode)
    const addBookingQuery =
      "insert into bookings (booking_code,guest_id,room_id,status,created_at) values (?,?,?,?,?)";
    const bookingIdResult = await query(addBookingQuery, [
      bookingCode,
      guestId,
      roomId,
      bookingStatus,
      new Date(),
    ]);
    // console.log("booking info inserted third time", guestId);
    const bookingId = bookingIdResult.insertId;
    console.log("booking id", bookingId);
    const addBookingDetailsQuery =
      "insert into booking_details (booking_id,check_in,check_out,special_requests) values (?,?,?,?)";
    await query(addBookingDetailsQuery, [bookingId, checkIn, checkOut, notes]);
    const addPaymentQuery =
      "insert into payments (booking_id,total_amount,payment_status,payment_method) values (?,?,?,?)";
    await query(addPaymentQuery, [
      bookingId,
      totalAmount,
      paymentStatus,
      paymentMethod,
    ]);
    console.log("booking info inserted forth ", bookingId);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getGuestService = async () => {
  console.log("get guest id:");
  // const guestID = 37;

  try {
    const getGuestQuery = ` 
    SELECT 
    g.id AS guest_id,
    g.full_name, 
    g.id_number,
    g.phone_number,
    g.gender, 
    g.email,
    g.nationality,
    
 
    COALESCE(
        (SELECT JSON_ARRAYAGG(gd.document_path) 
         FROM guest_documents gd 
         WHERE gd.guest_id = g.id), 
        JSON_ARRAY()
    ) AS document_paths,

    -- id_type እና guests_count
    (SELECT gd.id_type FROM guest_documents gd WHERE gd.guest_id = g.id LIMIT 1) AS id_type,
    (SELECT gd.guests_count FROM guest_documents gd WHERE gd.guest_id = g.id LIMIT 1) AS guests_count,
    
    b.id AS booking_id,
    b.booking_code,
    b.status AS booking_status,
    b.created_at AS booking_created_at,
    
    r.id AS room_id,
    r.room_number,
    rt.size_m2,
    rt.bed_type,
    rt.max_guests,
    rt.price_per_night,
    rt.room_type AS room_type_name,
    
    bd.check_in,
    bd.check_out,
    bd.special_requests AS notes,
    
    p.total_amount,
    p.payment_status,
    p.payment_method,

    (SELECT image_url FROM room_images WHERE room_id = r.id AND is_primary = 1 LIMIT 1) AS room_image

FROM bookings b
LEFT JOIN guests g ON b.guest_id = g.id
LEFT JOIN rooms r ON b.room_id = r.id
LEFT JOIN room_types rt ON r.room_type_id = rt.id
LEFT JOIN booking_details bd ON b.id = bd.booking_id
LEFT JOIN payments p ON b.id = p.booking_id
ORDER BY b.created_at DESC;
    `;

    const result = await query(getGuestQuery);
    console.log("guest info", result);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};
