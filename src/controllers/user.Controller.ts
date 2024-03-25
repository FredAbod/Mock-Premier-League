import { Request, Response } from "express";
import { UserModel } from "../models/user.Models"; // Assuming UserModel is the user model
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
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return errorResMsg(res, 400, "Email already registered");
    }
    const hashedPassword = await passwordHash(password);
    const user = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    // Return success response
    return successResMsg(res, 201, {
      success: true,
      user: user,
      message: "User created successfully",
    });
  } catch (error: any) {
    console.error("Error in signUp:", error);
    return errorResMsg(res, 500, "Internal server error");
  }
};



// Define the login function
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
    const user = await UserModel.findOne({ email });
    if (!user) {
      return errorResMsg(res, 400, "Invalid email or password");
    }

    // Check if the password is correct
    const isPasswordValid = await passwordCompare(password, user.password);
    if (!isPasswordValid) {
      return errorResMsg(res, 400, "Invalid email or password");
    }

    // Generate JWT token
    const token = createJwtToken({ userId: user._id, role: user.role });
    res.cookie("access_token", token);

    // Return success response with token
    return successResMsg(res, 200, {
      message: "User successfully logged in",
      success: true,
      data: {
        userId: user._id,
        token,
      },
    });
  } catch (error) {
    console.error("Error in login:", error);
    return errorResMsg(res, 500, "Internal server error");
  }
};

// Export the signUp and login functions
export { signUp, login };
