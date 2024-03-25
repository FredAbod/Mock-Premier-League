import { Request, Response } from "express";
import { errorResMsg, successResMsg } from "../utils/lib/response";
import { TeamModel } from "../models/teams.Models";
import cloudinary from "../image/cloudinary";
import { AdminModel } from "../models/admin.Models";

interface User {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}


const addTeam = async (req: Request, res: Response) => {
  try {
    const { name, coach } = req.body; 
    const user = req.user as User; // Assert req.user as User type

    // Find the admin document by user ID
    const admin = await AdminModel.findById(user.userId);

    // Check if the admin document exists and has the role 'admin'
    if (!admin || admin.role !== "admin") {
      return errorResMsg(res, 400, "You're Not Authorized");
    }

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

    // Create new team document with uploaded logo URL and coach
    const newTeam = new TeamModel({
      name,
      logo: result.secure_url,
      coach,
    });

    // Save the new team to the database
    await newTeam.save();

    // Send success response
    return successResMsg(res, 201, {
      success: true,
      team: newTeam,
      message: "Team created successfully",
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error adding team:", error);
    return errorResMsg(res, 500, "Internal server error");
  }
};

const addPlayersToTeam = async (req: Request, res: Response) => {
    try {
        const { players } = req.body;
        const teamId = req.params.id; // Access the team ID directly

        // Find the team by ID
        const team = await TeamModel.findById(teamId);
        if (!team) {
            return errorResMsg(res, 404, "Team not found");
        }

        // Add players to the team
        team.players.push(...players);

        // Save the updated team
        await team.save();

        return successResMsg(res, 200, {
            success: true,
            message: "Players added to the team successfully",
            team: team,
        });
    } catch (error) {
        console.error("Error adding players to team:", error);
        return errorResMsg(res, 500, "Internal server error");
    }
};
const updateTeamDetails = async (req: Request, res: Response) => {
    try {
        const {  name, logo } = req.body;
        const teamId = req.params.id;
        // Find the team by ID
        const team = await TeamModel.findById(teamId);
        if (!team) {
            return errorResMsg(res, 404, "Team not found");
        }

        // Update team details
        if (name) team.name = name;
        if (logo) team.logo = logo;

        // Save the updated team
        await team.save();

        return successResMsg(res, 200, {
            success: true,
            message: "Team details updated successfully",
            team: team,
        });
    } catch (error) {
        console.error("Error updating team details:", error);
        return errorResMsg(res, 500, "Internal server error");
    }
};

const deletePlayerFromTeam = async (req: Request, res: Response) => {
    try {
        const { playerName } = req.body;
        const teamId = req.params.id;

        // Find the team by ID
        const team = await TeamModel.findById(teamId);
        if (!team) {
            return errorResMsg(res, 404, "Team not found");
        }

        // Check if the player exists in the team
        const playerIndex = team.players.indexOf(playerName);
        if (playerIndex === -1) {
            return errorResMsg(res, 404, "Player not found in the team");
        }

        // Remove the player from the team's array
        team.players.splice(playerIndex, 1);

        // Save the updated team
        await team.save();

        return successResMsg(res, 200, {
            success: true,
            message: "Player removed from the team successfully",
            team: team,
        });
    } catch (error) {
        console.error("Error deleting player from team:", error);
        return errorResMsg(res, 500, "Internal server error");
    }
};

const deleteTeam = async (req: Request, res: Response) => {
    try {
        const teamId = req.params.id; // Access the team ID directly

        // Delete the team by ID
        const deletedTeam = await TeamModel.findByIdAndDelete(teamId);
        if (!deletedTeam) {
            return errorResMsg(res, 404, "Team not found");
        }

        return successResMsg(res, 200, {
            success: true,
            message: "Team deleted successfully",
            team: deletedTeam,
        });
    } catch (error) {
        console.error("Error deleting team:", error);
        return errorResMsg(res, 500, "Internal server error");
    }
};



export { addTeam, deleteTeam, addPlayersToTeam, deletePlayerFromTeam, updateTeamDetails };
