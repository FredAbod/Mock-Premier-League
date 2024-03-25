import { Request, Response } from "express";
import { errorResMsg, successResMsg } from "../utils/lib/response";
import { TeamModel } from "../models/teams.Models";
import { FixtureModel } from "../models/fixtures.Models";

const addFixture = async (req: Request, res: Response) => {
  try {
    const { homeTeam, awayTeam, startTime, location } = req.body;

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

export {
  addFixture,
  completeFixture,
  editFixtureResult,
  findFixtureByLink,
  findAllFixtures,
  deleteFixture
};
