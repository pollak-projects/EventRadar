import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GetAllNoti() {
  const users = await prisma.ertesites.findMany();

  return users;
}

export async function getNotiById(ertesites_id) {
  const data = await prisma.ertesites.findMany({
    where: {
      ertesites_id: ertesites_id,
    },
  });
  return data;
}

export async function notiUpdate(
  ertesites_id,
  esemenyek_id,
  user_id,
  message,
) {
  await prisma.ertesites.update({
    where: {
      ertesites_id: ertesites_id,
    },
    data: {
      esemenyek_id: esemenyek_id,
      user_id: user_id,
      message: message,
      updated_date: new Date(),
    },
  });
}

export async function notiDelete() {
  await prisma.ertesites.delete({
    where: {
      ertesites_id: ertesites_id,
    },
  });
}
