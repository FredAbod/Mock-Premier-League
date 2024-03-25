import { Request, Response } from "express";
import { errorResMsg, successResMsg } from "../utils/lib/response";
import { TeamModel } from "../models/teams.Models";
import cloudinary from "../image/cloudinary";


const addTeam = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        // Check if required fields are provided
        if (!name || !req.file) {
            return errorResMsg(res, 400, "Name and Logo are required");
        }

        // Check if team already exists
        const existingTeam = await TeamModel.findOne({ name });
        if (existingTeam) {
            return errorResMsg(res, 400, "Team already exists");
        }

        // Upload the logo to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Create new team document with uploaded logo URL
        const newTeam = new TeamModel({
            name,
            logo: result.secure_url,
        });

        // Save the new team to the database
        await newTeam.save();

        // Send success response
        return successResMsg(res, 201, {
            success: true,
            user: newTeam,
            message: "Team created successfully",
          });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error adding team:", error);
        return errorResMsg(res, 500, "Internal server error");
    }
};

export { addTeam };
