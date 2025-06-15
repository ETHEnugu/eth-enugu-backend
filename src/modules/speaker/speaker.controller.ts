import { Request, Response } from "express";
import {
  speakerApplicationSchema,
  getApplicationSchema,
  filterApplicationsSchema,
} from "./speaker.schema";
import {
  createSpeakerApplicationRepository,
  deleteSpeakerApplicationRepository,
  getSpeakerApplicationByEmailRepository,
  getSpeakerApplicationByIdRepository,
  getPaginatedSpeakerApplicationsRepository,
} from "./speaker.utils";
import { Controller } from "../../types/index.types";
import { z } from "zod";
import { logger } from "../../utils/logger.utils";

/**
 * Create a new speaker application
 */
export const createSpeakerApplication = async (
  req: Request,
  res: Response
): Controller => {
  try {
    // Validate request body against our schema
    const validatedData = speakerApplicationSchema.parse(req.body);

    // Check if email already exists
    const existingApplication = await getSpeakerApplicationByEmailRepository(
      validatedData.email
    );

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: `You've already submitted a speaker application with this email address`,
      });
    }

    // Extract roles and expectedArrivalDates from validated data
    const { roles, expectedArrivalDates, ...otherData } = validatedData;

    // Create new application with roles and arrival dates
    const newApplication = await createSpeakerApplicationRepository(
      otherData,
      roles,
      expectedArrivalDates
    );

    const response = {
      success: true,
      message: "Your speaker application was submitted successfully",
      data: newApplication,
    };

    return res.status(201).json(response);
  } catch (error) {
    logger.error("Failed to create speaker application:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        error: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create speaker application",
    });
  }
};

/**
 * Get a specific application by ID
 */
export const getSpeakerApplication = async (
  req: Request,
  res: Response
): Controller => {
  try {
    const { id } = getApplicationSchema.parse(req.params);

    const application = await getSpeakerApplicationByIdRepository(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Speaker application not found",
      });
    }

    // Transform the response to include roles and expectedArrivalDates arrays
    const transformedApplication = {
      ...application,
      roles: application.roles?.map((role) => role.role) || [],
      expectedArrivalDates:
        application.expectedArrivalDates?.map((date) =>
          date.date.toISOString()
        ) || [],
    };

    return res.status(200).json({
      success: true,
      message: "Speaker application retrieved successfully",
      data: transformedApplication,
    });
  } catch (error) {
    logger.error("Failed to get speaker application:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        error: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to retrieve speaker application",
    });
  }
};

/**
 * Get all applications with filtering and pagination
 */
export const getAllSpeakerApplications = async (
  req: Request,
  res: Response
): Controller => {
  try {
    // Parse query parameters with defaults
    const filter = filterApplicationsSchema.parse(req.query);

    const paginatedData = await getPaginatedSpeakerApplicationsRepository(
      filter.page,
      filter.limit,
      {
        status: filter.status,
        sessionType: filter.sessionType,
        participationType: filter.participationType,
      }
    );

    // Transform applications to include roles and expectedArrivalDates arrays
    const transformedApplications = paginatedData.applications.map(
      (application) => ({
        ...application,
        roles: application.roles?.map((role) => role.role) || [],
        expectedArrivalDates:
          application.expectedArrivalDates?.map((date) =>
            date.date.toISOString()
          ) || [],
      })
    );

    const response = {
      success: true,
      message: "Speaker applications retrieved successfully",
      data: {
        ...paginatedData,
        applications: transformedApplications,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    logger.error("Failed to get speaker applications:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        error: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to retrieve speaker applications",
    });
  }
};

/**
 * Delete an application
 */
export const deleteSpeakerApplication = async (
  req: Request,
  res: Response
): Controller => {
  try {
    const { id } = getApplicationSchema.parse(req.params);

    const existingApplication = await getSpeakerApplicationByIdRepository(id);

    if (!existingApplication) {
      return res.status(404).json({
        success: false,
        message: "Speaker application not found",
      });
    }

    await deleteSpeakerApplicationRepository(id);

    res.status(200).json({
      success: true,
      message: "Speaker application deleted successfully",
    });
  } catch (error) {
    logger.error("Failed to delete speaker application:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        error: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete speaker application",
    });
  }
};
