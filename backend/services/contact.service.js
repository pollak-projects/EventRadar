import { reviewSender } from "./emailsender.service.js";
import { PrismaClient } from "@prisma/client";
import { encrypt } from "../lib/hash.js";

const prisma = new PrismaClient();

export async function GetReview() {
  const users = await prisma.contact.findMany({
    where: {
        kiirat: 1
    }
  });

  return users;
}


export async function reviewSend(nev, email, uzenet) {
  const asd = await prisma.contact.create({
    data: {
      nev: nev,
      email: email,
      uzenet: uzenet,
        kiirat: 0
    },
  });
  return asd;
}