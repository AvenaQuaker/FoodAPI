import fs from "fs";

// Certificados SSL
const PKey = fs.readFileSync("./HTTPS/key.pem", "utf8");
const Cer = fs.readFileSync("./HTTPS/cert.pem", "utf8");
export const credentials = { key: PKey, cert: Cer };
