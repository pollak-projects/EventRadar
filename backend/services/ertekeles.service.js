import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GetAllRating() {
  const users = await prisma.ertekeles.findMany();

  return users;
}

export async function GetRatingById(ertekeles_id) {
  const data = await prisma.ertekeles.findMany({
    where: {
      ertekeles_id: ertekeles_id,
    },
  });
  return data;
}

export async function RatingUpdate(ertekeles_id, esemenyek_id, user_id, message) {
  await prisma.ertekeles.update({
    where: {
      ertekeles_id: ertekeles_id,
    },
    data: {
      esemenyek_id: esemenyek_id,
      user_id: user_id,
      updated_date: new Date(),
    },
  });
}

export async function RatingDelete() {
  await prisma.ertekeles.delete({
    where: {
      ertesites_id: ertesites_id,
    },
  });
}
