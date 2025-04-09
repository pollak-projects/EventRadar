import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function listAllGroup() {
  const data = await prisma.groups.findMany({
    include: {
      users: true,
    },
  });

  return data;
}

export async function addGroup(neve) {
  const data = await prisma.groups
    .create({
      data: {
        neve: neve,
      },
    })
    .catch((err) => {
      console.error(err);
      throw new Error();
    });

  return data;
}

export async function deleteGroup(neve) {
  await prisma.groups.delete({
    where: {
      neve: neve,
    },
  });
}

export async function updateGroup(neve, ujnev) {
  await prisma.groups.update({
    where: {
      neve: neve,
    },
    data: {
      neve: ujnev,
    },
  });
}
