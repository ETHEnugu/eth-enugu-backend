import { prisma } from "../../utils/prisma.utils";
import { ConferenceSummitRegistration } from "./conference.schema";

export async function getConferenceRegistrationByEmailRepository(
  email: string
) {
  return await prisma.conferenceSummit.findUnique({
    where: { email },
    include: {
      preferredDates: {
        orderBy: { date: "asc" },
      },
    },
  });
}

export async function getConferenceRegistrationByIdRepository(id: string) {
  return await prisma.conferenceSummit.findUnique({
    where: { id },
    include: {
      preferredDates: {
        orderBy: { date: "asc" },
      },
    },
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

  // Get paginated registrations with preferred dates
  const registrations = await prisma.conferenceSummit.findMany({
    where,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      preferredDates: {
        orderBy: { date: "asc" },
      },
    },
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
  // The cascade delete will automatically remove related ConferenceDate records
  return await prisma.conferenceSummit.delete({
    where: { id },
  });
}

export async function createConferenceRegistrationRepository(
  data: Omit<ConferenceSummitRegistration, "preferredDates">,
  possibleDates: string[]
) {
  const registration = await prisma.conferenceSummit.create({
    data: {
      ...data,
      preferredDates: {
        create: possibleDates.map((dateString) => ({
          date: new Date(dateString),
        })),
      },
    },
    include: {
      preferredDates: {
        orderBy: { date: "asc" },
      },
    },
  });

  return registration;
}
