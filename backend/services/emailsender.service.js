import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "eventradar.project@gmail.com",
    pass: "zjbh gtqr ymuy udlc",
  },
});

export async function registration(email) {
  const info = await transporter.sendMail({
    from: '"EventRadar" <eventradar.project@gmail.com>', 
    to: "szollosizete2005@gmail.com", 
    subject: "Sikeres regisztráció", 
    text: "Hello world?", 
    html: "<b>Hello world?</b>", 
  });

  console.log("Message sent: %s", info.messageId);
}

export async function passwordReset(email) {
  const info = await transporter.sendMail({
    from: '"EventRadar" <eventradar.project@gmail.com>',
    to: "szollosizete2005@gmail.com",
    subject: "Sikeres regisztráció",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });

  console.log("Message sent: %s", info.messageId);
}

