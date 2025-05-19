import { prisma } from "../../utils/prisma.utils";
import { ConferenceSummitRegistration } from "./conference.schema";

export async function getConferenceRegistrationByEmailRepository(
  email: string
) {
  return await prisma.conferenceSummit.findUnique({
    where: { email },
  });
}

export async function getConferenceRegistrationByIdRepository(id: string) {
  return await prisma.conferenceSummit.findUnique({
    where: { id },
  });
}

export async function getPaginatedConferenceRegistrationsRepository(
  page: number,
  limit: number,
  status?: string
) {
  // Build where condition
  const where: any = {};
  if (status) {
    where.status = status;
  }

  const total = await prisma.conferenceSummit.count({ where });

  // Calculate pagination
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  // Get paginated registrations
  const registrations = await prisma.conferenceSummit.findMany({
    where,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  return {
    registrations,
    total,
    page,
    limit,
    totalPages,
  };
}

export async function deleteConferenceRegistrationRepository(id: string) {
  return await prisma.conferenceSummit.delete({
    where: { id },
  });
}

export async function createConferenceRegistrationRepository(
  data: ConferenceSummitRegistration
) {
  const registration = await prisma.conferenceSummit.create({
    data,
  });
  return registration;
}
