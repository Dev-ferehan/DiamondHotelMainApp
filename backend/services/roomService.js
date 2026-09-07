import query from "../config/db.config.js";
export const checkRoomExit = async (roomNumber) => {
  const roomNameQuery =
    `SELECT * FROM rooms WHERE room_number = ?`;

  const roomNameResult =
    await query(roomNameQuery, [roomNumber]);

  if (roomNameResult.length > 0) {
    return {
      status: 200,
      message: "Room already exists",
    };
  }

  return {
    status: 404,
    message: "Room does not exist",
  };
};
// {
//     "room_type_id": 1,
//     "room_number": "101A",
//     "status": "Available",
//     "price_per_night": 150.00,
//     "size_m2": 35.00,
//     "bed_type": "King Bed",
//     "max_guests": 2,
//     "title": "Deluxe King Room",
// "short_description":"des",
//     "full_description": "Spacious room with modern amenities...",
//     "images": [
//       {
//         "image_url": "https://example.com/images/room-101a-1.jpg",
//         "is_primary": true
//       },
//       {
//         "image_url": "https://example.com/images/room-101a-2.jpg",
//         "is_primary": false
//       }
//     ],
//     "feature_ids": [1, 2],
//     "facility_ids": [1, 2, 3],
//     "amenity_ids": [1, 2]
//   }
export const addRoomService = async (roomData) => {
  try {
    const {
      room_type_id=1,
      room_number,
      total_rooms,
      status,
      price_per_night,
      size_m2,
      bed_type,
      max_guests,
      room_type,
      short_description,
      full_description,
      images = [],
      feature_ids = [],
      facility_ids = [],
      amenity_ids = [],
    } = roomData;
    

    let targetRoomTypeId = room_type_id;
    // 2. Handle room_types (Insert new or update existing)
    if (targetRoomTypeId) {
      const insertRoomQuery = `INSERT INTO room_types (room_type, short_description, full_description, price_per_night, size_m2, bed_type, max_guests)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const roomTypeResult = await query(insertRoomQuery, [
        room_type,
        short_description,
        full_description,
        price_per_night,
        size_m2,
        bed_type,
        max_guests,
      ]);
      targetRoomTypeId = roomTypeResult.insertId;
    }
    console.log("room type------------",targetRoomTypeId)
    // 3. Insert into rooms table
    const InsertRoomQuery = `INSERT INTO rooms (room_type_id, room_number,total_rooms, status)
      VALUES (?, ?, ?, ?)`;
    const roomResult = await query(InsertRoomQuery, [
      targetRoomTypeId,
      room_number,
      total_rooms,
      status,
    ]);

    const roomId = roomResult.insertId;
console.log("room ------------",roomResult)
    // 4. Insert Images
    if (images && images.length > 0) {
      for (const img of images) {
        const InsertRoomImage = `
            INSERT INTO room_images (room_id, image_url, is_primary) 
            VALUES (?, ?, ?)
          `;
        await query(InsertRoomImage, [
          roomId,
          img.image_url,
          img.is_primary ? 1 : 0,
        ]);
      }
    }
    console.log("images ------------")
    // 5. Insert Junction Records (Features, Facilities, Amenities)
    if (feature_ids && feature_ids.length > 0) {
      for (const id of feature_ids) {
        await query(
          `INSERT INTO room_features (room_id, feature_id) VALUES (?,?)`,
          [roomId, id],
        );
      }
    }
    console.log("features ------------")

    if (facility_ids && facility_ids.length > 0) {
      for (const id of facility_ids) {
        await query(
          `INSERT INTO room_facilities (room_id, facility_id) VALUES (?,?)`,
          [roomId, id],
        );
      }
    }
    console.log("facilities ------------")

    if (amenity_ids && amenity_ids.length > 0) {
      for (const id of amenity_ids) {
        await query(
          `INSERT INTO room_amenities (room_id, amenity_id) VALUES (?,?)`,
          [roomId, id],
        );
      }
    }
    console.log("amenities ------------")
    return { status: 200, message: "Room created successfully" };
  } catch (error) {
    return { status: 500, message: "Room creation failed",error };
  }
};

export const getRoomsType = async () => {
  try {
    // get status from rooms table with join on room_types table features, facilities, amenities
    // get room types from room_types table
    const getRoomsTypeQuery = `SELECT 
    r.id AS room_id,
    r.room_number,
    r.total_rooms,
    r.status AS room_status,
    
    rt.id AS room_type_id,
    rt.room_type,
    rt.short_description,
    rt.full_description,
    rt.price_per_night,
    rt.size_m2,
    rt.bed_type,
    rt.max_guests,

  
    GROUP_CONCAT(DISTINCT ri.image_url SEPARATOR ', ') AS images,
 
    GROUP_CONCAT(DISTINCT f.name SEPARATOR ', ') AS features,
    GROUP_CONCAT(DISTINCT fc.name SEPARATOR ', ') AS facilities,
    GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS amenities

FROM rooms r

INNER JOIN room_types rt 
    ON r.room_type_id = rt.id

LEFT JOIN room_images ri 
    ON r.id = ri.room_id

LEFT JOIN room_features rf 
    ON r.id = rf.room_id 
LEFT JOIN features f 
    ON rf.feature_id = f.id

LEFT JOIN room_facilities rfc 
    ON r.id = rfc.room_id
LEFT JOIN facilities fc 
    ON rfc.facility_id = fc.id

LEFT JOIN room_amenities ra 
    ON r.id = ra.room_id
LEFT JOIN amenities a 
    ON ra.amenity_id = a.id

GROUP BY r.id, rt.id;`;
    // const getRoomsTypeQuery = `SELECT * FROM room_types `;
    const roomsTypeResult = await query(getRoomsTypeQuery);
    return {
      status: 200,
      message: "Rooms type fetched successfully",
      rooms: roomsTypeResult,
    };
   
  } catch (error) {
    return {
      status: 500,
      message: "Rooms type fetching failed",
    };
  
  }
};
