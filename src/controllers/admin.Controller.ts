import { Request, Response } from "express";
import { AdminModel } from "../models/admin.Models";
import { loginSchema, signUpSchema } from "../utils/validation/validation";
import { errorResMsg, successResMsg } from "../utils/lib/response";
import { passwordCompare, passwordHash } from "../utils/lib/bcrypt";
import { createJwtToken } from "../utils/middleware/isAuthenticated";

// Define the signUp function
const signUp = async (req: Request, res: Response) => {
  try {
    // Validate request body against signUpSchema
    const validationResult = signUpSchema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: validationResult.error.details[0].message });
    }

    // Request body is valid, proceed with sign-up logic
    const { firstName, lastName, email, password } = req.body;
    // Check if email is provided
    if (!email) {
      return errorResMsg(res, 400, "Email is required");
    }

    // Check if the email is already registered
    const existingUser = await AdminModel.findOne({ email });
    if (existingUser) {
      return errorResMsg(res, 400, "Email already registered");
    }
    const hashedPassword = await passwordHash(password);
    const admin = new AdminModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await admin.save();
    // Return success response
    return successResMsg(res, 201, {
      success: true,
      user: admin,
      message: "Admin created successfully",
    });
  } catch (error: any) {
    console.error("Error in signUp:", error);
    return errorResMsg(res, 500, "Internal server error");
  }
};

const login = async (req: Request, res: Response) => {
  try {
    // Validate request body against loginSchema
    const validationResult = loginSchema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: validationResult.error.details[0].message });
    }

    // Request body is valid, proceed with login logic
    const { email, password } = req.body;

    // Check if the user exists
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return errorResMsg(res, 400, "Invalid email or password");
    }

    // Check if the password is correct
    const isPasswordValid = await passwordCompare(password, admin.password);
    if (!isPasswordValid) {
      return errorResMsg(res, 400, "Invalid email or password");
    }

    // Generate JWT token
    const token = createJwtToken({ userId: admin._id, role: admin.role });
    res.cookie("access_token", token);

    // Return success response with token
    return successResMsg(res, 200, {
      message: "User successfully logged in",
      success: true,
      data: {
        userId: admin._id,
        token,
      },
    });
  } catch (error) {
    console.error("Error in login:", error);
    return errorResMsg(res, 500, "Internal server error");
  }
};
// Export the signUp function
export { signUp, login };
