import { Request, Response } from "express";
import {
  builderResidencySchema,
  getResidencySchema,
  filterResidencySchema,
} from "./builder.schema";
import {
  createBuilderResidencyRepository,
  deleteBuilderResidencyRepository,
  getBuilderResidencyByEmailRepository,
  getBuilderResidencyByIdRepository,
  getPaginatedBuilderResidencyRepository,
} from "./builder.utils";
import { Controller } from "../../types/index.types";
import { z } from "zod";
import { logger } from "../../utils/logger.utils";

/**
 * Create a new residency application
 */
export const createBuilderResidency = async (
  req: Request,
  res: Response
): Controller => {
  try {
    // Validate request body against our schema
    const validatedData = builderResidencySchema.parse(req.body);

    // Check if email already exists
    const existingResidency = await getBuilderResidencyByEmailRepository(
      validatedData.email
    );

    if (existingResidency) {
      return res.status(409).json({
        success: false,
        message: `Builder with the email address already exists`,
      });
    }

    // Create new residency application
    const newResidency = await createBuilderResidencyRepository(validatedData);

    const response = {
      success: true,
      message: "Residency application submitted successfully",
      data: newResidency,
    };

    return res.status(201).json(response);
  } catch (error) {
    logger.error("Failed to create builder residency:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        error: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create builder residency",
    });
  }
};

/**
 * Get a specific residency application by ID
 */
export const getResidency = async (req: Request, res: Response): Controller => {
  try {
    const { id } = getResidencySchema.parse(req.params);

    const residency = await getBuilderResidencyByIdRepository(id);

    if (!residency) {
      return res.status(404).json({
        success: false,
        message: "Residency application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Residency application retrieved successfully",
      data: residency,
    });
  } catch (error) {
    logger.error("Failed to create upkeep:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        error: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create builder residency",
    });
  }
};

/**
 * Get all residency applications with filtering and pagination
 */
export const getAllResidencies = async (
  req: Request,
  res: Response
): Controller => {
  try {
    // Parse query parameters with defaults
    const filter = filterResidencySchema.parse(req.query);

    const paginatedData = await getPaginatedBuilderResidencyRepository(
      filter.page,
      filter.limit
    );

    const response = {
      success: true,
      message: "Residency applications retrieved successfully",
      data: paginatedData,
    };

    res.status(200).json(response);
  } catch (error) {
    logger.error("Failed to create upkeep:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        error: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create builder residency",
    });
  }
};

/**
 * Delete a residency application
 */
export const deleteResidency = async (
  req: Request,
  res: Response
): Controller => {
  try {
    const { id } = getResidencySchema.parse(req.params);

    const existingResidency = await getBuilderResidencyByIdRepository(id);

    if (!existingResidency) {
      return res.status(404).json({
        success: false,
        message: "Residency application not found",
      });
    }

    await deleteBuilderResidencyRepository(id);

    res.status(200).json({
      success: true,
      message: "Residency application deleted successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        error: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create builder residency",
    });
  }
};
