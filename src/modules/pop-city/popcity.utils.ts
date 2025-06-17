import { prisma } from "../../utils/prisma.utils";
import { PopupCityRegistration } from "./popcity.schema";

export async function getPopupRegistrationByEmailRepository(email: string) {
  return await prisma.popupCity.findUnique({
    where: { email },
  });
}

export async function getPopupRegistrationByIdRepository(id: string) {
  return await prisma.popupCity.findUnique({
    where: { id },
  });
}

export async function getPaginatedPopupRegistrationsRepository(
  page: number,
  limit: number,
  status?: string
) {
  // Build where condition
  const where: any = {};
  if (status) {
    where.status = status;
  }

  const total = await prisma.popupCity.count({ where });

  // Calculate pagination
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  // Get paginated registrations
  const registrations = await prisma.popupCity.findMany({
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

export async function deletePopupRegistrationRepository(id: string) {
  return await prisma.popupCity.delete({
    where: { id },
  });
}

export async function createPopupRegistrationRepository(
  data: Omit<PopupCityRegistration, "preferredDates">,
  possibleDates: string[]
) {
  const registration = await prisma.popupCity.create({
    data: {
      ...data,
      role: data.role.join(", "),
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
