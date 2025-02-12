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

export async function RatingUpdate(ertekeles_id, rating, comment) {
  await prisma.ertekeles.update({
    where: {
      ertekeles_id: ertekeles_id,
    },
    data: {
      comment: comment,
      rating: rating,
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
