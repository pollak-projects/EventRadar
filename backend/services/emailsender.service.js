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

export async function registration(email, username) {
  const info = await transporter.sendMail({
    from: '"EventRadar" <eventradar.project@gmail.com>',
    to: email,
    subject: "Sikeres regisztráció",
    text: "EventRadar",
    html:
      '<!DOCTYPE html><html lang="hu"><head><meta charset="UTF-8">' +
      '<title>Üdvözlünk az EventRadar-nál!</title></head><body style="font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 0;">' +
      '<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">' +
      '<div style="padding: 20px; text-align: center;">' +
      "<br>" +
      '<img src="https://imgur.com/a/Nb5NF0j" alt="EventRadar logó" style="max-width: 200px; height: auto;"></div>' +
      '<div style="padding: 20px; color: #333333; font-size: 16px; line-height: 1.6;">' +
      '<h1 style="font-size: 24px; margin-bottom: 16px; color: #e94e1b;">Üdvözlünk az EventRadar közösségében!</h1>' +
      '<p style="margin: 0 0 16px 0;">Kedves ' +
      username +
      "!</p>" +
      '<p style="margin: 0 0 16px 0;">Köszönjük, hogy regisztráltál az EventRadar platformon. Mostantól könnyedén nyomon követheted a legjobb eseményeket, koncerteket és rendezvényeket!</p>' +
      '<p style="margin: 0 0 16px 0;">A profilod aktiválásához kérjük, kattints az alábbi gombra:</p>' +
      '<p style="margin: 20px 0 0 0;">Ha nem te regisztráltál, kérjük hagyd figyelmen kívül ezt az e-mailt!</p>' +
      '<p style="margin: 20px 0 0 0;">Üdvözlettel,<br>Az EventRadar Csapata</p></div>' +
      '<div style="background-color: #f2f2f2; padding: 10px; text-align: center; font-size: 12px; color: #888888;">© 2025 EventRadar. Minden jog fenntartva.</div>' +
      "</div></body></html>",
    // attachments: [
    //   {
    //     filename: "eventradarlogo.png",
    //     content: "http://localhost:5173/eventradarlogo.png",
    //     cid: "eventradarlogo",
    //   },
    // ],
  });

  console.log("Message sent: %s", info.messageId);
}

export async function passwordReset(email, username, newPwd) {
  const info = await transporter.sendMail({
    from: '"EventRadar" <eventradar.project@gmail.com>',
    to: email,
    subject: "Jelszó Visszaállítás",
    text: "EventRadar",
    html:
      '<!DOCTYPE html><html lang="hu"><head><meta charset="UTF-8">' +
      '<title>Jelszó Visszaállítás</title></head><body style="font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 0;">' +
      '<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">' +
      '<div style="padding: 20px; text-align: center;">' +
      "<br>" +
      '<img src="https://i.ibb.co/hRgsvhNY/Eventradar-removebg-preview.png" alt="EventRadar logó" style="max-width: 200px; height: auto;">' +
      "</div>" +
      '<div style="padding: 20px; color: #333333; font-size: 16px; line-height: 1.6;">' +
      '<h1 style="font-size: 24px; margin-bottom: 16px; color: #e94e1b;">Jelszó Visszaállítás</h1>' +
      '<p style="margin: 0 0 16px 0;">Kedves ' +
      username +
      "!</p>" +
      '<p style="margin: 0 0 16px 0;">Kérjük, kattints az alábbi gombra, hogy visszaállíthasd a jelszavad:</p>' +
      '<a href="[JELSZÓ VISSZAÁLLÍTÁS LINK]" style="display: inline-block; background-color: #e94e1b; color: white; padding: 12px 24px; text-align: center; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 20px;">' +
      "Jelszó Visszaállítása" +
      "</a>" +
      '<p style="margin: 0 0 16px 0;">Ha nem te kérted a jelszó visszaállítását, kérjük hagyd figyelmen kívül ezt az e-mailt.</p>' +
      '<p style="margin: 20px 0 0 0;">Üdvözlettel,<br>Az EventRadar Csapata</p>' +
      "</div>" +
      '<div style="background-color: #f2f2f2; padding: 10px; text-align: center; font-size: 12px; color: #888888;">' +
      "© 2025 EventRadar. Minden jog fenntartva." +
      "</div>" +
      "</div></body></html>",
  });

  

  console.log("Message sent: %s", info.messageId);
}

export async function reviewSender(email, username) {
  const info = await transporter.sendMail({
    from: '"EventRadar" <eventradar.project@gmail.com>',
    to: email,
    subject: "Sikeres regisztráció",
    text: "Hello world?",
    html:
      '<!DOCTYPE html><html lang="hu"><head><meta charset="UTF-8">' +
      '<title>Üdvözlünk az EventRadar-nál!</title></head><body style="font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 0;">' +
      '<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">' +
      '<div style="padding: 20px; text-align: center;">' +
      "<br>" +
      '<img src="https://imgur.com/a/Nb5NF0j" alt="EventRadar logó" style="max-width: 200px; height: auto;"></div>' +
      '<div style="padding: 20px; color: #333333; font-size: 16px; line-height: 1.6;">' +
      '<h1 style="font-size: 24px; margin-bottom: 16px; color: #e94e1b;">Üdvözlünk az EventRadar közösségében!</h1>' +
      '<p style="margin: 0 0 16px 0;">Kedves ' +
      username +
      "!</p>" +
      '<p style="margin: 0 0 16px 0;">Köszönjük, hogy regisztráltál az EventRadar platformon. Mostantól könnyedén nyomon követheted a legjobb eseményeket, koncerteket és rendezvényeket!</p>' +
      '<p style="margin: 0 0 16px 0;">A profilod aktiválásához kérjük, kattints az alábbi gombra:</p>' +
      '<p style="margin: 20px 0 0 0;">Ha nem te regisztráltál, kérjük hagyd figyelmen kívül ezt az e-mailt!</p>' +
      '<p style="margin: 20px 0 0 0;">Üdvözlettel,<br>Az EventRadar Csapata</p></div>' +
      '<div style="background-color: #f2f2f2; padding: 10px; text-align: center; font-size: 12px; color: #888888;">© 2025 EventRadar. Minden jog fenntartva.</div>' +
      "</div></body></html>",
    // attachments: [
    //   {
    //     filename: "eventradarlogo.png",
    //     content: "http://localhost:5173/eventradarlogo.png",
    //     cid: "eventradarlogo",
    //   },
    // ],
  });

  console.log("Message sent: %s", info.messageId);
}
