import { RequestHandler } from "express";
import { prisma } from "../../app";

export const dashboardOverview: RequestHandler = async (req, res, next) => {
  try {
    const query = await prisma.attendee.findMany();

    res.send({
      message: "",
      data: query,
    });
  } catch (error) {
    next(error);
  }
};
