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
  hossz,
  kategoria,
  foszam
) {
  console.log(esemeny_date);
  return await prisma.esemenyek.create({
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
      hossz: hossz,
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
    include: {
      user_id: true,
    },
  });

  let buffer = Buffer.from(data[0].user_id.profilkep);
  const base64 = buffer.toString("base64");

  const profilkep =
    "data:image/png" + ";base64," + base64.slice(base64.indexOf("base64") + 6);

  data[0].user_id.profilkep = profilkep;
  return data;
}

export async function eventUpdate(
  id,
  esemeny_nev,
  leiras,
  helyszin,
  esemeny_date,
  kezdetido,
  hossz,
  kategoria
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
      hossz: hossz,
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
