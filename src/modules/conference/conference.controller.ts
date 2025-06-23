import { Request, Response } from "express";
import {
  conferenceSummitSchema,
  getRegistrationSchema,
  filterRegistrationsSchema,
} from "./conference.schema";
import {
  createConferenceRegistrationRepository,
  deleteConferenceRegistrationRepository,
  getConferenceRegistrationByEmailRepository,
  getConferenceRegistrationByIdRepository,
  getPaginatedConferenceRegistrationsRepository,
} from "./conference.utils";
import { Controller } from "../../types/index.types";
import { z } from "zod";
import { logger } from "../../utils/logger.utils";
import { SendMail } from "../../utils/mail.util";
import conference_submission from "../../template/conference_submission";
import { fromError } from "zod-validation-error";

/**
 * Create a new conference registration
 */
export const createConferenceRegistration = async (
  req: Request,
  res: Response
): Controller => {
  try {
    // Validate request body against our schema
    const validatedData = conferenceSummitSchema.parse(req.body);

    // Check if email already exists
    const existingRegistration =
      await getConferenceRegistrationByEmailRepository(validatedData.email);

    if (existingRegistration) {
      return res.status(409).json({
        success: false,
        message: `Email already registered for the Conference/Summit`,
      });
    }

    // Extract possibleDates from validated data
    const data = validatedData;

    // Create new registration with preferred dates
    const newRegistration = await createConferenceRegistrationRepository(data);

    const response = {
      success: true,
      message: "Your Conference/Summit registration was submitted successfully",
      data: newRegistration,
    };

    SendMail({
      to: newRegistration.email,
      subject: "Successful Registration for the ETH Enugu Conf/Summit '25",
      html: conference_submission(newRegistration.fullName),
    });

    return res.status(201).json(response);
  } catch (error) {
    logger.error("Failed to create conference registration:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: fromError(error).toString().replace("Validation error: ", ""),
        error: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create Conference/Summit registration",
    });
  }
};

/**
 * Get a specific registration by ID
 */
export const getConferenceRegistration = async (
  req: Request,
  res: Response
): Controller => {
  try {
    const { id } = getRegistrationSchema.parse(req.params);

    const registration = await getConferenceRegistrationByIdRepository(id);

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
    logger.error("Failed to get conference registration:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: fromError(error).toString().replace("Validation error: ", ""),
        error: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to retrieve Conference/Summit registration",
    });
  }
};

/**
 * Get all registrations with filtering and pagination
 */
export const getAllConferenceRegistrations = async (
  req: Request,
  res: Response
): Controller => {
  try {
    // Parse query parameters with defaults
    const filter = filterRegistrationsSchema.parse(req.query);

    const paginatedData = await getPaginatedConferenceRegistrationsRepository(
      filter.page,
      filter.limit,
      filter.status
    );

    const response = {
      success: true,
      message: "Registrations retrieved successfully",
      data: {
        paginatedData,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    logger.error("Failed to get conference registrations:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: fromError(error).toString().replace("Validation error: ", ""),
        error: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to retrieve Conference/Summit registrations",
    });
  }
};

/**
 * Delete a registration
 */
export const deleteConferenceRegistration = async (
  req: Request,
  res: Response
): Controller => {
  try {
    const { id } = getRegistrationSchema.parse(req.params);

    const existingRegistration = await getConferenceRegistrationByIdRepository(
      id
    );

    if (!existingRegistration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    await deleteConferenceRegistrationRepository(id);

    res.status(200).json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (error) {
    logger.error("Failed to delete conference registration:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: fromError(error).toString().replace("Validation error: ", ""),
        error: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete Conference/Summit registration",
    });
  }
};
