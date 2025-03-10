import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { encrypt } from "../lib/hash.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function verifyJwt(access_token, refresh_token) {
  const data = await prisma.maindata.findFirst();

  return new Promise((resolve, reject) => {
    jwt.verify(
      access_token,
      data.JWTSecret,
      {
        algorithm: data.JWTAlgorithm,
      },
      async (err, decoded) => {
        console.error(err);

        if (decoded) resolve("OK");

        if (err && err.message === "jwt expired") {
          const ref = await verifyRefreshToken(refresh_token);
          const tokenWithIgnore = await verifyWithIgnoreExpiration(
            access_token
          );

          console.log(tokenWithIgnore);
          console.log(ref);

          if (ref.sub === tokenWithIgnore.sub) {
            resolve(
              createNewToken(
                tokenWithIgnore.sub,
                tokenWithIgnore.username,
                tokenWithIgnore.email,
                tokenWithIgnore.userGroup
              )
            );
          } else {
            reject("Error Refreshing the token");
          }
        } else if (err) reject("Error Refreshing the token", err);
      }
    );
  });
}

async function verifyRefreshToken(refresh_token) {
  const data = await prisma.maindata.findFirst();
  let ret;
  try {
    ret = jwt.verify(refresh_token, data.RefreshTokenSecret, {
      algorithm: data.RefreshTokenAlgorithm,
    });
  } catch (err) {
    ret = null;
  }

  return ret;
}

async function verifyWithIgnoreExpiration(token) {
  const data = await prisma.maindata.findFirst();
  let ret;
  try {
    ret = jwt.verify(token, data.JWTSecret, {
      algorithm: data.JWTAlgorithm,
      ignoreExpiration: true,
    });
  } catch (err) {
    ret = null;
  }

  return ret;
}

async function createNewToken(id, nev, email, groupsNeve) {
  const data = await prisma.maindata.findFirst();

  console.log("Creating token with: ", id, nev, email, groupsNeve);

  return jwt.sign(
    {
      sub: id,
      name: nev,
      email: email,
      userGroup: groupsNeve,
    },
    data.JWTSecret,
    {
      expiresIn: data.JWTExpiration,
      algorithm: data.JWTAlgorithm,
    }
  );
}

export async function register(username, email, password, groupsNeve) {
  const pwdEncrypted = await encrypt(password);
  const asd = await prisma.users.create({
    data: {
      username: username,
      email: email,
      password: pwdEncrypted,
      groupsNeve: groupsNeve,
    },
  });
  return asd
}
export async function login(username, password) {
  const user = await prisma.users
    .findUnique({
      where: {
        username: username,
      },
    })
    .catch((error) => {
      return error.message;
    });

  if (!user) {
    return { message: "Hibás felhasználónév vagy jelszó" };
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return { message: "Hibás felhasználónév vagy jelszó" };
  }

  const data = await prisma.maindata.findFirst();

  if (!data) {
    return { message: "Hiba történt" };
  }

  const token = jwt.sign(
    {
      sub: user.id,
      name: user.nev,
      email: user.email,
      userGroup: user.groupsNeve,
    },
    data.JWTSecret,
    {
      expiresIn: data.JWTExpiration,
      algorithm: data.JWTAlgorithm,
    }
  );

  const refreshToken = jwt.sign(
    {
      sub: user.id,
    },
    data.RefreshTokenSecret,
    {
      expiresIn: data.RefreshTokenExpiration,
      algorithm: data.RefreshTokenAlgorithm,
    }
  );

  return {
    access_token: token,
    refresh_token: refreshToken,
    user_id: user.id,
  };
}

export async function updateMainData(
  JWTAlgorithm,

  JWTExpiration,

  JWTSecret,

  RefreshTokenAlgorithm,

  RefreshTokenExpiration,

  RefreshTokenSecret
) {
  try {
    await prisma.maindata.update({
      where: {
        id: "5a97ea0a-a19f-11ef-95f3-0a0027000007",
      },
      data: {
        JWTAlgorithm: JWTAlgorithm,
        JWTExpiration: Number(JWTExpiration),
        JWTSecret: JWTSecret,
        RefreshTokenAlgorithm: RefreshTokenAlgorithm,
        RefreshTokenExpiration: Number(RefreshTokenExpiration),
        RefreshTokenSecret: RefreshTokenSecret,
      },
    });
    return "az adat sikeresen frissítve";
  } catch (err) {
    return err;
  }
}

export async function listAllTokens() {
  const data = await prisma.maindata.findUnique({
    where: {
      id: "5a97ea0a-a19f-11ef-95f3-0a0027000007",
    },
  });

  return data;
}

export async function createForgotToken(userId) {
  const token = crypto.randomBytes(50).toString("hex");
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1);

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        ForgotToken: token,
        ForgotTokenExpiresAt: expiresAt,
      },
    });
    return token;
  } catch (err) {
    return err;
  }
}

export async function pwdChange(pwd1, pwd2, id) {
  if (pwd1 == pwd2) {
    const data = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: await encrypt(pwd1),
      },
    });
  } else {
    return false;
  }
}
