import { PrismaClient } from "@prisma/client";
import set from 'date-fns/set';


const prisma = new PrismaClient();

export async function CreateEvent(
  esemeny_nev,
  leiras,
  helyszin,
  esemeny_date,
  kezdetido,
  vegeido,
  kategoria
) {
  console.log(esemeny_date)
  await prisma.esemenyek.create({
    data: {
      user: 2,
      esemeny_nev: esemeny_nev,
      leiras: leiras,
      helyszin: helyszin,
      esemeny_date: new Date(esemeny_date),
      create_date: new Date(),
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

export async function eventUpdate(id, esemeny_nev, leiras, helyszin, esemeny_date) {
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
      kezdetido: set(new Date(), { hours: kezdetido.split(':')[0], minutes : kezdetido.split(':')[1]}), 
      vegeido: set(new Date(), { hours: vegeido.split(':')[0], minutes : vegeido.split(':')[1]}), 
      kategoria: kategoria,
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

