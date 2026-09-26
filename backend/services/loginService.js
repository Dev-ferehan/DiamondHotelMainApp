import query from "../config/db.config.js";
import bcrypt from "bcrypt";
export const checkEmailAndPassword = async(email, password) => {

    if (!email || !password) {
      return { success: false, message: "Invalid email/username or password." };
    }

  
    //  Email/Username Format Validation (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(email);
    const isUsername = email.length >= 3;
  
    if (!isEmail && !isUsername) {
      return { success: false, message: "Invalid email/username or password." };
    }
  
    // 4. Password Security Checks 
    if (password.length < 6 || password.length > 8) {
      return { success: false, message: "Password must be between 6 and 8 characters." };
    }



    try {
        const UserQuery = `
          SELECT 
          u.id, 
        u.full_name, 
        u.email, 
        u.password, 
        u.role,
        sp.phone_number,
        sp.address,
        sp.gender
          FROM users u
          LEFT JOIN staff_profiles sp ON u.id = sp.user_id
          WHERE u.email = ?
        `;
    
        const rows = await query(UserQuery, [email]);
        if (rows.length === 0) {
          return { success: false, message: "Invalid email/username or password." };
        }

        const user = rows[0];
    
        const isPasswordMatched = await bcrypt.compare(password, user.password);
    
        if (!isPasswordMatched) {
          return { success: false, message: "password is not matched" };
        }

        return {
          success: true,
          message: "Login successfully",
          user: {
            id: user.id,
            fullName: user.full_name,
            email: user.email,
            role: user.role,
            profile: {
              phoneNumber: user.phone_number || null,
              address: user.address || null,
              gender: user.gender || null
            }
          }
      
        };
    
      } catch (error) {
        console.error("Database Login Error:", error);
        return { success: false, message: "Server error, please try again later." };
      }








  
  };




  
  export const registerCustomerService = async ({ firstName, lastName, email, password, phoneNumber }) => {
    try {
      //  Check if email exists
      const checkEmailQuery = "SELECT id FROM customer WHERE email = ?";
      const existingUsers = await query(checkEmailQuery, [email]);
  
      if (existingUsers.length > 0) {
        return {
          success: false,
          message: "Email is already registered. Please login or use a different email."
        };
      }
  
      // 2. Password  bcrypt Hash
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const insertQuery = `
        INSERT INTO customer (first_name, last_name, email, phone_number, password, role)
        VALUES (?, ?, ?, ?, ?, 'customer')
      `;
  
      const result= await query(insertQuery, [
        firstName,
        lastName,
        email,
        phoneNumber,
        hashedPassword
      ]);
      return {
        success: true,
        message: "registered successfully.",
        user: {
          id: result.insertId,
          firstName,
          lastName,
          email,
          phoneNumber,
          role: "customer"
        }
      };
  
    } catch (error) {
      console.error("something went wrong", error.message);
      throw error;
    }
  };











export const registerUser = async (data) => {
  try {
    const {
      fullName,
      email,
      password,
      phoneNumber,
      address,
      gender,
    } = data;

    const addUserQuery = `
      INSERT INTO users (full_name, email, password, phone_number, address, gender)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const userResult = await query(addUserQuery, [
      fullName,
      email,
      password,
      phoneNumber,
      address,
      gender,
    ]);
    console.log("user result", userResult);
    return userResult;
  } catch (error) {
    console.error("Error in registerUser:", error);
    return { success: false, message: "Internal server error. Please try again later." };
  }
};



