import { Request, Response } from "express";
import { errorResMsg, successResMsg } from "../utils/lib/response";
import { TeamModel } from "../models/teams.Models";
import { FixtureModel } from "../models/fixtures.Models";
import { AdminModel } from "../models/admin.Models";

interface User {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

const addFixture = async (req: Request, res: Response) => {
  try {
    const { homeTeam, awayTeam, startTime, location } = req.body;
    const user = req.user as User; // Assert req.user as User type

    // Find the admin document by user ID
    const admin = await AdminModel.findById(user.userId);

    // Check if the admin document exists and has the role 'admin'
    if (!admin || admin.role !== "admin") {
      return errorResMsg(res, 400, "You're Not Authorized");
    }

    // Check if all required fields are provided
    if (!homeTeam || !awayTeam || !startTime || !location) {
      return errorResMsg(res, 400, "All fields are required");
    }

    // Check if both home team and away team exist
    const checkExistingHomeTeam = await TeamModel.findOne({ name: homeTeam });
    const checkExistingAwayTeam = await TeamModel.findOne({ name: awayTeam });

    if (!checkExistingHomeTeam || !checkExistingAwayTeam) {
      return errorResMsg(res, 400, "Both home team and away team must exist");
    }

    // Create a new fixture
    const newFixture = new FixtureModel({
      homeTeam,
      awayTeam,
      startTime,
      location,
    });

    // Save the new fixture
    await newFixture.save();

    // Add the new fixture ID to the homeTeam and awayTeam documents
    checkExistingHomeTeam.fixtures.push(newFixture._id);
    checkExistingAwayTeam.fixtures.push(newFixture._id);
    await checkExistingHomeTeam.save();
    await checkExistingAwayTeam.save();

    return successResMsg(res, 201, {
      success: true,
      data: newFixture,
      message: "Fixture created successfully",
    });
  } catch (error) {
    console.error("Error in Adding Fixtures:", error);
    return errorResMsg(res, 500, "Internal server error");
  }
};

const completeFixture = async (req: Request, res: Response) => {
  try {
    const { link } = req.params;
    const user = req.user as User; // Assert req.user as User type

    // Find the admin document by user ID
    const admin = await AdminModel.findById(user.userId);

    // Check if the admin document exists and has the role 'admin'
    if (!admin || admin.role !== "admin") {
      return errorResMsg(res, 400, "You're Not Authorized");
    }

    const fixture = await FixtureModel.findOneAndUpdate(
      { link },
      { status: "completed" },
      { new: true }
    );

    if (!fixture) {
      return errorResMsg(res, 404, "Fixture not found");
    }

    return successResMsg(res, 200, {
      success: true,
      data: fixture,
      message: "Fixture status changed to completed",
    });
  } catch (error) {
    console.error("Error completing fixture:", error);
    return errorResMsg(res, 500, "Internal server error");
  }
};

const editFixtureResult = async (req: Request, res: Response) => {
  try {
    const { link } = req.params;
    const { homeTeamScore, awayTeamScore } = req.body;

    const user = req.user as User; // Assert req.user as User type

    // Find the admin document by user ID
    const admin = await AdminModel.findById(user.userId);

    // Check if the admin document exists and has the role 'admin'
    if (!admin || admin.role !== "admin") {
      return errorResMsg(res, 400, "You're Not Authorized");
    }

    const fixture = await FixtureModel.findOneAndUpdate(
      { link },
      { result: { homeTeamScore, awayTeamScore } },
      { new: true }
    );

    if (!fixture) {
      return errorResMsg(res, 404, "Fixture not found");
    }

    return successResMsg(res, 200, {
      success: true,
      data: fixture,
      message: "Fixture result updated successfully",
    });
  } catch (error) {
    console.error("Error editing fixture result:", error);
    return errorResMsg(res, 500, "Internal server error");
  }
};

const findFixtureByLink = async (req: Request, res: Response) => {
  try {
    const { link } = req.params;

    const newFixture = await FixtureModel.findOne({ link });

    if (!newFixture) {
      return errorResMsg(res, 404, "Fixture not found");
    }

    return successResMsg(res, 200, {
      success: true,
      data: newFixture,
      message: "Fixture found",
    });
  } catch (error) {
    console.error("Error finding fixture by link:", error);
    return errorResMsg(res, 500, "Internal server error");
  }
};

const completedFixtures = async (req: Request, res: Response) => {
  try {
    const completedFixtures = await FixtureModel.find({ status: "completed" });

    return successResMsg(res, 200, {
      success: true,
      data: completedFixtures,
      message: "Completed fixtures retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving completed fixtures:", error);
    return errorResMsg(res, 500, "Internal server error");
  }
};

 const viewPendingFixtures = async (req: Request, res: Response) => {
  try {
      const pendingFixtures = await FixtureModel.find({ status: 'pending' });

      return successResMsg(res, 200, {
          success: true,
          data: pendingFixtures,
          message: "Pending fixtures retrieved successfully",
      });
  } catch (error) {
      console.error("Error retrieving pending fixtures:", error);
      return errorResMsg(res, 500, "Internal server error");
  }
};

const findAllFixtures = async (req: Request, res: Response): Promise<void> => {
  try {
    const fixtures = await FixtureModel.find();

    successResMsg(res, 200, {
      success: true,
      data: fixtures,
      message: "All fixtures retrieved successfully",
    });
  } catch (error) {
    console.error("Error finding all fixtures:", error);
    errorResMsg(res, 500, "Internal server error");
  }
};

const deleteFixture = async (req: Request, res: Response) => {
  try {
    const { link } = req.params;

    const deletedFixture = await FixtureModel.findOneAndDelete({ link });

    if (!deletedFixture) {
      return errorResMsg(res, 404, "Fixture not found");
    }

    return successResMsg(res, 200, {
      success: true,
      data: deletedFixture,
      message: "Fixture deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting fixture:", error);
    return errorResMsg(res, 500, "Internal server error");
  }
};
// Controller to search fixtures by team names
const searchFixturesByTeam = async (req: Request, res: Response) => {
  try {
    const { teamName } = req.query;

    // Search for fixtures where either home team or away team matches the provided team name
    const fixtures = await FixtureModel.find({
      $or: [{ homeTeam: teamName }, { awayTeam: teamName }],
    });

    return successResMsg(res, 200, { fixtures, message: "Fixtures found by team name" });
  } catch (error) {
    console.error("Error searching fixtures by team name:", error);
    return errorResMsg(res, 500, "Internal server error");
  }
};

const searchFixturesByDateRange = async (req: Request, res: Response) => {
  try {
    // Extract query parameters and ensure they are of type string
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;

    // Check if startDate and endDate are provided and convert them to Date objects
    const startDateTime = startDate ? new Date(startDate) : undefined;
    const endDateTime = endDate ? new Date(endDate) : undefined;

    // Search for fixtures within the specified date range
    const fixtures = await FixtureModel.find({
      startTime: {
        $gte: startDateTime, // Use startDateTime if defined
        $lte: endDateTime,   // Use endDateTime if defined
      },
    });

    return successResMsg(res, 200, { fixtures, message: "Fixtures found by date range" });
  } catch (error) {
    console.error("Error searching fixtures by date range:", error);
    return errorResMsg(res, 500, "Internal server error");
  }
};


// Controller to search fixtures by location
const searchFixturesByLocation = async (req: Request, res: Response) => {
  try {
    const { location } = req.query;

    // Search for fixtures based on the provided location
    const fixtures = await FixtureModel.find({ location });

    return successResMsg(res, 200, { fixtures, message: "Fixtures found by location" });
  } catch (error) {
    console.error("Error searching fixtures by location:", error);
    return errorResMsg(res, 500, "Internal server error");
  }
};

// Controller to search fixtures by status
const searchFixturesByStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    // Search for fixtures based on the provided status
    const fixtures = await FixtureModel.find({ status });

    return successResMsg(res, 200, { fixtures, message: "Fixtures found by status" });
  } catch (error) {
    console.error("Error searching fixtures by status:", error);
    return errorResMsg(res, 500, "Internal server error");
  }
};


export {
  addFixture,
  completeFixture,
  editFixtureResult,
  findFixtureByLink,
  findAllFixtures,
  deleteFixture,
  completedFixtures,
  viewPendingFixtures,
  searchFixturesByDateRange,
  searchFixturesByTeam,
  searchFixturesByStatus,
  searchFixturesByLocation
};
