import { Request, Response } from "express";
import {
  popupCitySchema,
  getRegistrationSchema,
  filterRegistrationsSchema,
} from "./popcity.schema";
import {
  createPopupRegistrationRepository,
  deletePopupRegistrationRepository,
  getPopupRegistrationByEmailRepository,
  getPopupRegistrationByIdRepository,
  getPaginatedPopupRegistrationsRepository,
} from "./popcity.utils";
import { Controller } from "../../types/index.types";
import { z } from "zod";
import { logger } from "../../utils/logger.utils";
import { SendMail } from "../../utils/mail.util";
import popup_submission from "../../template/popup_submission";

/**
 * Create a new popup city registration
 */
export const createPopupRegistration = async (
  req: Request,
  res: Response
): Controller => {
  try {
    // Validate request body against our schema
    const validatedData = popupCitySchema.parse(req.body);

    // Check if email already exists
    const existingRegistration = await getPopupRegistrationByEmailRepository(
      validatedData.email
    );

    if (existingRegistration) {
      return res.status(409).json({
        success: false,
        message: `Email already registered for the Pop-Up City event`,
      });
    }

    // Extract possibleDates from validated data
    const { preferredDates, ...otherData } = validatedData;

    // Create new registration with preferred dates
    const newRegistration = await createPopupRegistrationRepository(
      otherData,
      preferredDates || []
    );

    SendMail({
      to: newRegistration.email,
      subject: "Application Received for the ETH Enugu '25 Pop-Up City",
      html: popup_submission(newRegistration.fullName),
    });

    const response = {
      success: true,
      message: "Your Pop-Up City registration was submitted successfully",
      data: newRegistration,
    };

    return res.status(201).json(response);
  } catch (error) {
    logger.error("Failed to create popup registration:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        error: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create Pop-Up City registration",
    });
  }
};

/**
 * Get a specific registration by ID
 */
export const getPopupRegistration = async (
  req: Request,
  res: Response
): Controller => {
  try {
    const { id } = getRegistrationSchema.parse(req.params);

    const registration = await getPopupRegistrationByIdRepository(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Registration retrieved successfully",
      data: registration,
    });
  } catch (error) {
    logger.error("Failed to get popup registration:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        error: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to retrieve Pop-Up City registration",
    });
  }
};

/**
 * Get all registrations with filtering and pagination
 */
export const getAllPopupRegistrations = async (
  req: Request,
  res: Response
): Controller => {
  try {
    // Parse query parameters with defaults
    const filter = filterRegistrationsSchema.parse(req.query);

    const paginatedData = await getPaginatedPopupRegistrationsRepository(
      filter.page,
      filter.limit,
      filter.status
    );

    const response = {
      success: true,
      message: "Registrations retrieved successfully",
      data: paginatedData,
    };

    res.status(200).json(response);
  } catch (error) {
    logger.error("Failed to get popup registrations:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        error: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to retrieve Pop-Up City registrations",
    });
  }
};

/**
 * Delete a registration
 */
export const deletePopupRegistration = async (
  req: Request,
  res: Response
): Controller => {
  try {
    const { id } = getRegistrationSchema.parse(req.params);

    const existingRegistration = await getPopupRegistrationByIdRepository(id);

    if (!existingRegistration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    await deletePopupRegistrationRepository(id);

    res.status(200).json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (error) {
    logger.error("Failed to delete popup registration:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        error: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete Pop-Up City registration",
    });
  }
};
