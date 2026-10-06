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
//
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


export const editRoomService=async(roomId, roomData)=>{
    try {
      const {
        room_type_id,
        room_number,
        price_per_night,
        status,
        total_rooms,
        size_m2,
        bed_type,
        max_guests,
        title,
        short_description,
        full_description,
        feature_ids = [],
        facility_ids = [],
        amenity_ids = [],
        images = []
      } = roomData;

      const updateRoomQuery = `
        UPDATE rooms 
        SET 
          room_type_id = ?, 
          room_number = ?, 
          price_per_night = ?, 
          status = ?, 
          total_rooms = ?, 
          size_m2 = ?, 
          bed_type = ?, 
          max_guests = ?, 
          title = ?, 
          short_description = ?, 
          full_description = ?
        WHERE room_id = ?
      `;

      const [updateResult] = await query(updateRoomQuery, [
        room_type_id || 1,
        room_number,
        price_per_night,
        status,
        total_rooms || 1,
        size_m2,
        bed_type,
        max_guests,
        title || short_description,
        short_description,
        full_description,
        roomId
      ]);

      if (updateResult.affectedRows === 0) {
        throw new Error('Room not found');
      }

      await query('DELETE FROM room_features WHERE room_id = ?', [roomId]);
      await query('DELETE FROM room_facilities WHERE room_id = ?', [roomId]);
      await query('DELETE FROM room_amenities WHERE room_id = ?', [roomId]);

      if (feature_ids.length > 0) {
        const featureValues = feature_ids.map(fId => [roomId, fId]);
        await query(
          'INSERT INTO room_features (room_id, feature_id) VALUES ?',
          [featureValues]
        );
      }

      if (facility_ids.length > 0) {
        const facilityValues = facility_ids.map(fId => [roomId, fId]);
        await query(
          'INSERT INTO room_facilities (room_id, facility_id) VALUES ?',
          [facilityValues]
        );
      }

      if (amenity_ids.length > 0) {
        const amenityValues = amenity_ids.map(aId => [roomId, aId]);
        await query(
          'INSERT INTO room_amenities (room_id, amenity_id) VALUES ?',
          [amenityValues]
        );
      }

      if (images && images.length > 0) {
        await query('DELETE FROM room_images WHERE room_id = ?', [roomId]);

        const imageValues = images.map((img) => [
          roomId,
          typeof img === 'string' ? img : img.image_url,
          img.is_primary ? 1 : 0
        ]);

        await query(
          'INSERT INTO room_images (room_id, image_url, is_primary) VALUES ?',
          [imageValues]
        );
      }

      // await connection.commit();

      return { success: true, message: 'Room updated successfully' };
    } catch (error) {
      // await connection.rollback();
      throw error;
    
  }
};


