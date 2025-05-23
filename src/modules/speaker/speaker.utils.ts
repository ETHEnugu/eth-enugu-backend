import { prisma } from "../../utils/prisma.utils";
import { SpeakerApplication } from "./speaker.schema";

export async function getSpeakerApplicationByEmailRepository(email: string) {
  return await prisma.speakerApplication.findUnique({
    where: { email },
  });
}

export async function getSpeakerApplicationByIdRepository(id: string) {
  return await prisma.speakerApplication.findUnique({
    where: { id },
  });
}

export async function getPaginatedSpeakerApplicationsRepository(
  page: number,
  limit: number,
  filters: {
    status?: string;
    sessionType?: string;
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

  const total = await prisma.speakerApplication.count({ where });

  // Calculate pagination
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  // Get paginated applications
  const applications = await prisma.speakerApplication.findMany({
    where,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
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
  return await prisma.speakerApplication.delete({
    where: { id },
  });
}

export async function createSpeakerApplicationRepository(
  data: SpeakerApplication
) {
  const application = await prisma.speakerApplication.create({
    data,
  });
  return application;
}
