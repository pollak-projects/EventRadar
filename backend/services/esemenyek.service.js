import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function CreateEvent(esemeny_nev, leiras, helyszin, esemeny_date) {
  await prisma.esemenyek.create({
    data: {
      esemeny_nev: esemeny_nev,
      leiras: leiras,
      helyszin: helyszin,
      esemeny_date: esemeny_date,
      create_date: new Date(),
      updated_date: new Date()
    },
  });
}

export async function GetAllEvent() {
    const users = await prisma.esemenyek.findMany();

    return users;
}

export async function getAllEventById(id) {
  const data = await prisma.esemenyek.findMany({
    where: {
      id: id,
    },
  });
  return data;
}

export async function eventUpdate(id, esemeny_nev, leiras, heylszin, esemeny_date) {
  await prisma.esemenyek.update({
    where: {
        id: id,
    },
    data: {
        esemeny_nev: esemeny_nev,
        leiras: leiras,
        heylszin: heylszin,
        esemeny_date: esemeny_date,
        updated_date: new Date(),
    },
  });
}

export async function eventDelete() {
    await prisma.esemenyek.delete({
      where: {
        id: id,
      },
    });
}

