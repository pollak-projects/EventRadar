import bcrypt from "bcryptjs";

export function encrypt(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, Salt) => {
            bcrypt.hash(password, Salt, (err, hash) => {
                resolve(hash)
            });
        });
    });
}