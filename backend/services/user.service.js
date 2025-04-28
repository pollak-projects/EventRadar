import { PrismaClient } from "@prisma/client";
import { encrypt } from "../lib/hash.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { passwordReset } from "./emailsender.service.js";

const prisma = new PrismaClient();

export async function GetAllUsers() {
  const users = await prisma.users.findMany();

  return users;
}

export async function getUsersById(id) {
  const data = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });

  if (data.profilkep) {
    let buffer = Buffer.from(data.profilkep);
    const base64 = buffer.toString("base64");

    console.log(base64.slice(base64.indexOf("base64")));
    const profilkep =
      "data:image/png" +
      ";base64," +
      base64.slice(base64.indexOf("base64") + 6);

    data.profilkep = profilkep;
  }

  return data;
}

export async function upadtePassword(params) {}

export async function forgotPassword(id) {
  const newPwd = Math.random().toString(36).slice(-8);

  await prisma.users.update({
    where: {
      email: id,
    },
    data: {
      password: newPwd,
    },
  });

  await passwordReset(email, username, newPwd);

  return newPwd;
}

export async function userUpdate(id, username, email, groupsNeve) {
  await prisma.users.update({
    where: {
      id: id,
    },
    data: {
      username: username,
      email: email,
      groupsNeve: groupsNeve,
      updated_date: new Date(),
    },
  });
}

export async function passwordUpdate(
  user_id,
  password,
  newpassword1,
  newPassword2
) {
  const user = await prisma.users.findUnique({
    where: {
      id: user_id,
    },
  });

  if(newpassword1 == newPassword2 && await bcrypt.compare(password, user.password)){
    const cryptedpwd = await encrypt(newPassword2);

    await prisma.users.update({
      where: {
        id: user_id,
      },
      data: {
        password: cryptedpwd,
      },
    });
  }
  else{
    throw new Error("Nem egyezik a két jelszó");
  }
}

export async function userDelete(id) {
  await prisma.users.delete({
    where: {
      id: id,
    },
  });
}

export async function Groups() {
  const groups = await prisma.groups.findMany();

  return groups;
}

export async function imageGetFromDB(kapottTipus) {
  const data = await prisma.users.findUnique({
    where: {
      id: 2,
    },
  });

  if (!data || !data.profilkep) {
    console.error("Nincs kép az adatbázisban vagy az adatok üresek.");
    return null;
  }

  let buffer = Buffer.from(data.profilkep);
  const base64 = buffer.toString("base64");

  console.log(base64.slice(base64.indexOf("base64")));
  const profilkep =
    "data:image/png" + ";base64," + base64.slice(base64.indexOf("base64") + 6);

  return profilkep;
}

export async function imageSaveToDB(image, id) {
  const imageBlob = Buffer.from(image, "base64");
  console.log(imageBlob);
  try {
    const result = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        profilkep: imageBlob,
      },
    });
    return result;
  } catch (error) {
    console.error("Error in imageDBSave: ", error);
  }
}

export async function jelentkezes(user_id, esemenyek_id) {
  await prisma.user_esemenyek.create({
    data: {
      user_id: user_id,
      esemenyek_id: esemenyek_id,
      join_date: new Date(),
    },
  });
}

export async function esemenyUser(id) {
  return await prisma.user_esemenyek.findMany({
    where: {
      esemenyek_id: id,
    },
  });
}

export async function already(user, esemeny) {
  return await prisma.user_esemenyek.findMany({
    where: {
      user_id: user,
      esemenyek_id: esemeny,
    },
  });
}
