import { PrismaClient } from "@prisma/client";
import set from "date-fns/set";

const prisma = new PrismaClient();

export async function CreateEvent(
  user_id,
  esemeny_nev,
  leiras,
  helyszin,
  esemeny_date,
  kezdetido,
  vegeido,
  kategoria,
  foszam
) {
  console.log(esemeny_date);
  await prisma.esemenyek.create({
    data: {
      user: user_id,
      esemeny_nev: esemeny_nev,
      leiras: leiras,
      helyszin: helyszin,
      esemeny_date: new Date(esemeny_date),
      create_date: new Date(),
      kezdetido: set(new Date(), {
        hours: String(kezdetido).split(":")[0],
        minutes: String(kezdetido).split(":")[1],
      }),
      vegeido: set(new Date(), {
        hours: String(vegeido).split(":")[0],
        minutes: String(vegeido).split(":")[1],
      }),
      kategoria: kategoria,
      foszam: foszam,
    },
  });
}

export async function GetAllEvent() {
  const users = await prisma.esemenyek.findMany({
    include: {
      Eventcat: true,
    },
  });

  users.forEach((element) => {
    let buffer = Buffer.from(element.Eventcat.image);
    const base64 = buffer.toString("base64");

    const profilkep = "data:image/png" + ";base64," + base64;

    element.Eventcat.image = profilkep;
  });

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

export async function eventUpdate(
  id,
  esemeny_nev,
  leiras,
  helyszin,
  esemeny_date
) {
  await prisma.esemenyek.update({
    where: {
      id: id,
    },
    data: {
      esemeny_nev: esemeny_nev,
      leiras: leiras,
      helyszin: helyszin,
      esemeny_date: new Date(esemeny_date),
      updated_date: new Date(),
      kezdetido: set(new Date(), {
        hours: kezdetido.split(":")[0],
        minutes: kezdetido.split(":")[1],
      }),
      vegeido: set(new Date(), {
        hours: vegeido.split(":")[0],
        minutes: vegeido.split(":")[1],
      }),
      kategoria: kategoria,
    },
  });
}

export async function eventDelete(id) {
  await prisma.esemenyek.delete({
    where: {
      id: id,
    },
  });
}

export async function getEventByCreate(user) {
  const data = await prisma.esemenyek.findMany({
    where: {
      user: user,
    },
    include: {
      Eventcat: true,
    },
  });
  return data;
}
