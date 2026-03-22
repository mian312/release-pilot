import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const computeStatus = (steps) => {
  if (!Array.isArray(steps)) return "planned";
  const allFalse = steps.every((step) => step === false);
  const allTrue = steps.every((step) => step === true);

  if (allTrue) return "done";
  if (allFalse) return "planned";
  return "ongoing";
};

export const getAllReleases = async () => {
  const releases = await prisma.release.findMany({
    orderBy: { date: "desc" },
  });
  return releases.map((release) => ({
    ...release,
    status: computeStatus(release.steps),
  }));
};

export const createRelease = async (data) => {
  const { name, date, additionalInfo } = data;
  // Initialize steps as 7 false values as per requirement (~7-10)
  const steps = new Array(7).fill(false);
  const release = await prisma.release.create({
    data: {
      name,
      date: new Date(date),
      additionalInfo,
      steps,
    },
  });
  return {
    ...release,
    status: computeStatus(release.steps),
  };
};

export const updateReleaseInfo = async (id, additionalInfo) => {
  const release = await prisma.release.update({
    where: { id: parseInt(id) },
    data: { additionalInfo },
  });
  return {
    ...release,
    status: computeStatus(release.steps),
  };
};

export const updateReleaseSteps = async (id, steps) => {
  const release = await prisma.release.update({
    where: { id: parseInt(id) },
    data: { steps },
  });
  return {
    ...release,
    status: computeStatus(release.steps),
  };
};
