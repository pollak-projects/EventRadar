import { PrismaClient } from "@prisma/client";
import { encrypt } from "../lib/hash.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GetAllUsers() {
  const users = await prisma.users.findMany()

  return users;
}

export async function getUsersById(id) {
  const data = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });
  return data;
}


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

  return newPwd;
}

export async function userUpdate(id, username, email, groupsNeve, password) {
  const cryptedpwd = await encrypt(password)
  await prisma.users.update({
    where: {
      id: id,
    },
    data: {
      username: username,
      email: email,
      password: cryptedpwd,
      groupsNeve: groupsNeve,
      updated_date: new Date()
    },
  });
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

