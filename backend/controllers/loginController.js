import { checkEmailAndPassword,registerCustomerService } from "../services/loginService.js";
import jwt from "jsonwebtoken";
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await checkEmailAndPassword(email, password);
    console.log("JWT_SECRET", process.env.JWT_SECRET);

    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jwt.sign(
      { 
        id: result.user.id, 
        email: result.user.email, 
        role: result.user.role 
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.message
      });
    }
    return res.status(200).json({
      success: true,
      message: result.message,
      user: result.user,
      token:token
    });

  } catch (error) {
    console.error("Error in loginController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later."
    });   
  }
};

export const registerController = async (req, res, next) => {
  try {
    const {  firstName,  lastName, email, password, phoneNumber } = req.body;
    const result = await registerCustomerService({ firstName, lastName, email, password, phoneNumber });
    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.message
      });
    }
 
    return res.status(200).json({
      success: true,
      message: result.message,
      user: result.user
    });
  } catch (error) {
    console.error("Error in registerController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later."
    });
  }
};