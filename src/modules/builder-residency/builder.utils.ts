import { prisma } from "../../utils/prisma.utils";
import { BuilderResidencyApplication } from "./builder.schema";

export async function getBuilderResidencyByEmailRepository(email: string) {
  return await prisma.builder.findUnique({
    where: { email },
  });
}

export async function getBuilderResidencyByIdRepository(id: string) {
  return await prisma.builder.findUnique({
    where: { id },
  });
}

export async function getPaginatedBuilderResidencyRepository(
  page: number,
  limit: number
) {
  const total = await prisma.builder.count();

  // Calculate pagination
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  // Get paginated residencies
  const builders = await prisma.builder.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });
  return {
    builders,
    total,
    page,
    limit,
    totalPages,
  };
}

export async function deleteBuilderResidencyRepository(id: string) {
  return await prisma.builder.delete({
    where: { id },
  });
}

export async function createBuilderResidencyRepository(
  data: BuilderResidencyApplication
) {
  const builder = await prisma.builder.create({
    data: { ...data, primaryRole: data.primaryRole.join(", ") },
  });
  return builder;
}
