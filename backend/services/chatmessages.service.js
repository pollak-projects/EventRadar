import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllMessages() {
  const messages = await prisma.messages.findMany({
    include: {
      user: true,
    },
  });

  return messages;
}


export async function createMessage(userId, message) {
  const newMessage = await prisma.messages.create({
    data: {
      userId: userId,
      message: message,
      createdAt: new Date(),
    },
  });

  return newMessage;
}


export async function deleteMessage(messageId) {
  await prisma.messages.delete({
    where: {
      id: messageId,
    },
  });
}


export async function getMessagesByUserId(userId) {
  const messages = await prisma.messages.findMany({
    where: {
      userId: userId,
    },
  });

  return messages;
}
