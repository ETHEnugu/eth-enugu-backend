import { prisma } from "../../utils/prisma.utils";
import { SpeakerApplication } from "./speaker.schema";

export async function getSpeakerApplicationByEmailRepository(email: string) {
  return await prisma.speakerApplication.findUnique({
    where: { email },
    include: {
      roles: {
        orderBy: { role: "asc" },
      },
      expectedArrivalDates: {
        orderBy: { date: "asc" },
      },
    },
  });
}

export async function getSpeakerApplicationByIdRepository(id: string) {
  return await prisma.speakerApplication.findUnique({
    where: { id },
    include: {
      roles: {
        orderBy: { role: "asc" },
      },
      expectedArrivalDates: {
        orderBy: { date: "asc" },
      },
    },
  });
}

export async function getPaginatedSpeakerApplicationsRepository(
  page: number,
  limit: number,
  filters: {
    status?: string;
    sessionType?: string;
    participationType?: string;
  }
) {
  // Build where condition
  const where: any = {};
  if (filters.status) {
    where.status = filters.status;
  }
  if (filters.sessionType) {
    where.sessionType = filters.sessionType;
  }
  if (filters.participationType) {
    where.participationType = filters.participationType;
  }

  const total = await prisma.speakerApplication.count({ where });

  // Calculate pagination
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  // Get paginated applications with related data
  const applications = await prisma.speakerApplication.findMany({
    where,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      roles: {
        orderBy: { role: "asc" },
      },
      expectedArrivalDates: {
        orderBy: { date: "asc" },
      },
    },
  });

  return {
    applications,
    total,
    page,
    limit,
    totalPages,
  };
}

export async function deleteSpeakerApplicationRepository(id: string) {
  // The cascade delete will automatically remove related SpeakerRole and SpeakerArrivalDate records
  return await prisma.speakerApplication.delete({
    where: { id },
  });
}

export async function createSpeakerApplicationRepository(
  data: Omit<SpeakerApplication, "roles" | "expectedArrivalDates">,
  roles: string[],
  expectedArrivalDates: string[]
) {
  const application = await prisma.speakerApplication.create({
    data: {
      ...data,
      roles: {
        create: roles.map((role) => ({ role })),
      },
      expectedArrivalDates: {
        create: expectedArrivalDates.map((dateString) => ({
          date: new Date(dateString),
        })),
      },
    },
    include: {
      roles: {
        orderBy: { role: "asc" },
      },
      expectedArrivalDates: {
        orderBy: { date: "asc" },
      },
    },
  });

  return application;
}
